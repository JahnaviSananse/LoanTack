// import * as icon from 'icons';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
// import { HelplineButton, NavigationBar, Textfield } from 'atoms';
import moment from 'moment';
import React from 'react';
import {
  Alert,
  Animated,
  AsyncStorage,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import * as COLOR from 'src/constants/colors';
import {GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import * as IMAGE from 'src/assets/images';
import {Header} from 'src/components';
import * as CONSTANT from 'src/constants/constant';
import styles from './style';

//--------------- Other button----------------//

const ModalButton = (props: any) => {
  return (
    <TouchableOpacity
      style={styles.reportButtonStyle}
      onPress={props.onButtonPress}
      activeOpacity={0.8}>
      {props.isImage ? (
        <FastImage
          source={IMAGE.IC_BACK}
          style={{marginRight: 10, height: 30, width: 30}}
        />
      ) : null}
      <Text style={styles.reportButtonTitleStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const EmojiButtonView = (props: any) => {
  return (
    <TouchableOpacity
      style={{
        height: '100%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={props.onEmojiPress}>
      <FastImage
        source={props.image}
        style={{height: '130%', width: '130%'}}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );
};

const ChatMessages = (props: any) => {
  const navigation = useNavigation();
  //const userData = navigation.getParam('userData', 'Other');
  const {containerStyle} = styles;
  const height = CONSTANT.SCREEN_HEIGHT * 2;

  const [chatId, setChatId] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [displayData, setDisplayData] = React.useState<any[]>();
  const [isSenderOnline, setIsSenderOnline] = React.useState(false);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [isTextfieldDisable, setisTextfieldDisable] = React.useState(true);
  const [modalY, setmodalY] = React.useState(
    new Animated.Value(-CONSTANT.SCREEN_HEIGHT),
  );
  const [closeY, setcloseY] = React.useState(new Animated.Value(height));
  const [isReportOpen, setisReportOpen] = React.useState(false);
  const [messages, setmessages] = React.useState([]);
  const [loadEarlier, setloadEarlier] = React.useState(true);
  const [typingText, settypingText] = React.useState('');
  const [isLoadingEarlier, setisLoadingEarlier] = React.useState(false);
  const [modalVisible, setmodalVisible] = React.useState(false);
  const [renameModalVisible, setrenameModalVisible] = React.useState(false);
  const [isHappySelected, setisHappySelected] = React.useState(false);
  const [isAngrySelected, setisAngrySelected] = React.useState(false);
  const [isSadSelected, setisSadSelected] = React.useState(false);
  const [patientName, setpatientName] = React.useState('');

  var _isMounted: boolean = false;
  var _isAlright: any = null;

  React.useEffect(() => {
    try {
      AsyncStorage.getItem(CONSTANT.USER_DATA).then((response: any) => {
        let resObject = JSON.parse(response);
        let id = resObject.patient_id;

        setUserId(id);
        setUnreadCountZero();
        onOnlineStatus(true);
        var amOnline = database().ref('.info/connected');
        var userOnlinePath = database().ref(
          `chatList/${chatId}/onlineMembers/${id}`,
        );
        var userConenctionPath = database().ref(`typingStatus/${chatId}/${id}`);
        amOnline.on('value', function (snapshot: any) {
          if (snapshot.val()) {
            // userOnlinePath.onDisconnect().set(false);
            userConenctionPath.onDisconnect().set(null);
          }
        });

        setTimeout(() => {
          //   this.updateTimeStamp();
          onAddedConnectionData();
          getchatList();
          renderOnlineStatus();
        }, 30);
      });
    } catch (error) {
      //alert(error);
      console.log('Error', error);
    }
  }, []);

  React.useEffect(() => {
    _isMounted = true;
    setmessages(require('./data/messages.js'));
  }, []);

  function updateMessageCount() {
    var userOnlinePath = `totalMessageCount/${userId}/${chatId}`;
    database()
      .ref(userOnlinePath)
      .transaction((currentLike: any) => {
        return currentLike + 1;
      })
      .then(() => console.log('then'));
  }

  function updateTimeStamp() {
    let usrId = userId;
    let activeUserObject: any = {};
    activeUserObject[userId] = moment().unix();
    let activeUsersPath = `activeUsers/`;
    database()
      .ref(activeUsersPath)
      .update(activeUserObject, (error: any) => {});
  }

  function setUnreadCountZero() {
    var userOnlinePath = `userConnection/${userId}`;
    let obj: any = {};
    obj[chatId] = 0;

    database().ref(userOnlinePath).update(obj);
  }

  function onOnlineStatus(isOnline: boolean) {
    var userOnlinePath = `chatList/${chatId}/onlineMembers`;
    let obj: any = {};
    obj[userId] = isOnline;

    database().ref(userOnlinePath).update(obj);
  }

  function onAddedConnectionData() {
    var userConenctionPath = `userConnection/${userId}`;

    database()
      .ref(userConenctionPath)
      .on('child_removed', (snap: any) => {});
  }

  function renderOnlineStatus() {
    let onlineStatusPath = `chatList/${chatId}/onlineMembers`;
    database()
      .ref(onlineStatusPath)
      .on('value', (snap: any) => {
        if (snap.exists()) {
          let senderUserId = Object.keys(snap.val()).filter(
            (value) => value != userId,
          );
          let status = snap.val()[senderUserId[0]];
          setIsSenderOnline(status);
        }
      });
  }

  function getchatList() {
    var chatListPath = `chatList/${chatId}`;

    database().setPersistenceEnabled(true);
    database().ref(chatListPath).keepSynced(true);

    database()
      .ref(chatListPath)
      .on('value', (snap: any) => {
        // var finalArray = this.state.data;
        if (snap.exists()) {
          let stringifyObject = JSON.stringify(snap);
          let obj = JSON.parse(stringifyObject);
          obj.key = snap.key;
          let dData: any[] = displayData?.filter(
            (value: any) => value.key !== snap.key,
          );
          dData.push(obj);
          setDisplayData(dData);
          //   this.setState({
          //     isActivityPast: obj.isActivityPast ? obj.isActivityPast : false,
          //     displayData,
          //   });
          //   this.renderHeader();

          setTimeout(() => {
            if (isFirstTime !== true) {
              // this.onReceiveMessage()
              //this.getCountinueChild();
              setIsFirstTime(true);
            }
          }, 30);

          // if (this.state.isFirstTime !== true) {
          //     // this.onReceiveMessage()
          //     this.getCountinueChild()
          //     this.setState({
          //         isFirstTime: true
          //     })
          // } else {
          //     if (this.state.messages.length > 0) {
          //         this.setState({
          //             isFirstTime: true
          //         })
          //     }
          // }

          // setTimeout(() => {
          //     this.onReceiveMessage()
          // }, 1000);
        }
      });
  }

  function renderTransparentView() {
    return isReportOpen ? (
      <View
        style={{
          overflow: 'visible',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'red',
        }}></View>
    ) : null;
  }
  function onOpenPress() {
    Keyboard.dismiss();
    // Animated.timing(modalY, {
    //     duration: 500,
    //     toValue: 0
    // }).start();
    // Animated.timing(closeY, {
    //     duration: 500,
    //     toValue: ((CONSTANT.SCREEN_HEIGHT * 0.32) + 80) + ((CONSTANT.SCREEN_HEIGHT - ((CONSTANT.SCREEN_HEIGHT * 0.32) + 80))) / 2 - 40//453
    // }).start();
  }

  function onClosePress() {
    // Animated.timing(modalY, {
    //     duration: 300,
    //     toValue: -CONSTANT.SCREEN_HEIGHT
    // }).start(setisReportOpen(false));
    // Animated.timing(closeY, {
    //     duration: 500,
    //     toValue: this.height
    // }).start();
  }

  function onReportPatientPress() {
    onClosePress();
    props.navigation.navigate('Report');
  }

  function onRenamePatientPress() {
    onClosePress();
    //this.setRenameModalVisible(true)
  }

  function onPatientHealthReportPress() {
    onClosePress();
    props.navigation.navigate('HealthReport');
  }

  function onPatientInfoPress() {
    onClosePress();
    props.navigation.navigate('PatientProfile');
  }

  function renderReportPopup() {
    return (
      <Animated.View
        style={[styles.modal, {transform: [{translateY: modalY}]}]}>
        <View style={styles.reportModalContainerStyle}>
          {/* <ModalButton onButtonPress={() => { this.onCancelPress() }} title={title.TITLE_CANCEL} /> */}
          <ModalButton
            isImage
            onButtonPress={() => {
              onReportPatientPress();
            }}
            title={'title.TITLE_REPORT_PATIENT'}
          />
          <ModalButton
            onButtonPress={() => {
              onRenamePatientPress();
            }}
            title={'title.TITLE_RENAME_PATIENT'}
          />
          <ModalButton
            onButtonPress={() => {
              onPatientHealthReportPress();
            }}
            title={'title.TITLE_PATIENT_HEALTH_REPORT'}
          />
          <ModalButton
            onButtonPress={() => {
              onPatientInfoPress();
            }}
            title={'title.TITLE_PATIENT_INFO'}
          />
        </View>
      </Animated.View>
    );
  }
  function renderCloseWithAnimation() {
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 50,
            width: 50,
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 25,
          },
          {transform: [{translateY: closeY}]},
        ]}>
        <TouchableOpacity
          style={{height: '100%', width: '100%', padding: 4}}
          onPress={() => {
            onClosePress();
          }}>
          <FastImage
            source={IMAGE.IC_BACK}
            style={{
              height: '100%',
              width: '100%',
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          {/* <FastImage source={icon.IC_CROSS_MENU}
                        style={{
                            height: '100%', width: '100%',
                        }}
                        resizeMode={FastImage.resizeMode.contain} /> */}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  //---------------- Button Actions ---------------//

  function onBackPress() {
    Keyboard.dismiss();
    props.navigation.goBack();
  }

  function onOptionPress() {
    // this.setModalVisible(!this.state.modalVisible);
    setisReportOpen(true);
    onOpenPress();
  }

  function onCancelPress() {
    // this.setModalVisible(!this.state.modalVisible);
    onClosePress();
  }

  function onCancelHelplinePress() {
    setmodalVisible(!modalVisible);
  }

  function onRenameCancelPress() {
    setRenameModalVisible(false);
  }

  function onReportCounsellorPress() {
    onClosePress();
    setmodalVisible(false);
    props.navigation.navigate('Report');
  }

  function onSubmitPress() {
    setmodalVisible(!modalVisible);
  }

  function setRenameModalVisible(visible: boolean) {
    setrenameModalVisible(visible);
  }

  //---------------- Report -----------------//

  function renderHelpLineButton() {
    return (
      <View>
        <Text>HelplineButton</Text>
      </View>
      // <HelplineButton onPress={() => {
      //     //callNumber('tel:1800 000 0000')
      // }} />
    );
  }

  function renderEmergencyModal() {
    return modalVisible ? (
      <View
        style={{
          backgroundColor: 'green',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
            {renderHelpLineButton()}
            <ModalButton
              onButtonPress={() => {
                onCancelHelplinePress();
              }}
              title={'CANCEL'}
            />
          </View>
        </Modal>
      </View>
    ) : null;
  }

  function renderRenameModal() {
    return renameModalVisible ? (
      <View
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={renameModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: CONSTANT.SCREEN_HEIGHT < 600 ? 130 : 75,
            }}>
            <View
              style={{
                height: 100,
                width: '90%',
                backgroundColor: 'white',
                marginBottom: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                style={{width: '100%'}}
                //isBlack
                placeholder={'Patient Name'}
                //text={patientName}
                value={patientName}
                onChange={(value: any) => {
                  setpatientName(value);
                }}
              />
            </View>
            <ModalButton
              onButtonPress={() => {
                if (patientName != '') {
                  setRenameModalVisible(false);
                } else {
                  Alert.alert('Please enter Patient name');
                }
              }}
              title={'RENAME'}
            />
            <ModalButton
              onButtonPress={() => {
                onRenameCancelPress();
              }}
              title={'CANCEL'}
            />
          </View>
        </Modal>
      </View>
    ) : null;
  }

  function renderEmergencyButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.emergencyButtonContainerStyle}
        onPress={() => {
          //callNumber('tel:1800 000 0000')
          setmodalVisible(!modalVisible);
        }}>
        <FastImage
          source={IMAGE.IC_BLACK_MAIL}
          resizeMode={FastImage.resizeMode.contain}
          style={{height: 25, width: 25}}
        />
        {/* <FastImage source={icon.IC_HELPLINE} resizeMode={FastImage.resizeMode.contain} style={{ height: 25, width: 25 }} /> */}
      </TouchableOpacity>
    );
  }

  //--------------- chat Messages ----------------//

  function onSend(messages = []) {
    // if (messages.text) {
    // this.setState((previousState) => {
    //     return {
    //         messages: GiftedChat.append(previousState.messages, messages),
    //     };
    // });
    // for demo purpose
    answerDemo(messages);
  }

  function answerDemo(messages: any) {
    if (messages.length > 0) {
      if (messages[0].image || messages[0].location || !_isAlright) {
        settypingText('React Native is typing');
      }
    }

    setTimeout(() => {
      if (_isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            onReceive('Nice picture!');
          } else if (messages[0].location) {
            onReceive('My favorite place');
          } else {
            if (!_isAlright) {
              _isAlright = true;
              onReceive('Alright');
            }
          }
        }
      }

      settypingText('');
    }, 1000);
  }

  function onReceive(text: string) {
    // this.setState((previousState) => {
    //     return {
    //         messages: GiftedChat.append(previousState.messages, {
    //             _id: Math.round(Math.random() * 1000000),
    //             text: text,
    //             createdAt: new Date(),
    //             user: {
    //                 _id: 2,
    //                 name: 'React Native',
    //                 // avatar: 'https://facebook.github.io/react/img/logo_og.png',
    //             },
    //         }),
    //     };
    // });
  }

  function renderSend(props: any) {
    return (
      <Send {...props} disabled={isTextfieldDisable}>
        <View style={{marginRight: 5}}>
          <FastImage
            source={IMAGE.IC_SEARCH}
            style={{height: 35, width: 35}}
            resizeMode={FastImage.resizeMode.contain}
          />
          {/* <FastImage source={icon.IC_SEND} style={{ height: 35, width: 35 }} resizeMode={FastImage.resizeMode.contain} /> */}
        </View>
      </Send>
    );
  }

  function renderBubble(props: any) {
    let isCurrentUser = props.currentMessage.user._id == 1 ? true : false;
    // alert(JSON.stringify(props.messages.sent))
    return (
      <View
        style={{
          flex: 1,
          marginLeft: isCurrentUser ? 0 : -8,
          marginRight: isCurrentUser ? -8 : 0,
        }}>
        <View
          style={{
            alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
            marginBottom: 5,
            alignContent: 'center',
          }}>
          {isCurrentUser ? (
            <View
              style={{
                flex: 1,
                marginRight: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  backgroundColor: props.currentMessage.sent
                    ? 'green'
                    : 'orange',
                  height: 8,
                  width: 8,
                  borderRadius: 4,
                  marginRight: 5,
                }}
              />
              <Text style={styles.messageTimeTitleStyle}>
                {moment(props.currentMessage.createdAt).format('HH:MM:SS')}
              </Text>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginLeft: 15,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text style={styles.messageTimeTitleStyle}>
                {moment(props.currentMessage.createdAt).format('HH:MM:SS')}
              </Text>
              <View
                style={{
                  backgroundColor: props.currentMessage.sent
                    ? 'green'
                    : 'orange',
                  height: 8,
                  width: 8,
                  borderRadius: 4,
                  marginLeft: 5,
                }}
              />
            </View>
          )}
        </View>
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: isCurrentUser ? 'red' : 'green',
            borderRadius: 12,
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
            marginRight: 15,
          }}>
          {isCurrentUser ? null : (
            <FastImage
              source={{
                uri:
                  'https://developers.google.com/web/images/contributors/philipwalton.jpg',
              }}
              style={styles.messageProfileImageStyle}
            />
          )}
          <Text style={styles.messageTitleStyle}>
            {props.currentMessage.text}
          </Text>
        </View>
      </View>
    );
  }

  function renderInputToolbar(props: any) {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#b992cf',
          paddingTop: 5,
          paddingBottom: 5,
          alignItems: 'flex-end',
        }}
      />
    );
  }

  return (
    <View style={containerStyle}>
      {/* <NavigationBar
                    title={"userData.userName"}
                    leftImage={icon.IC_BACK}
                    rightImage={icon.IC_REPORT_OPTION}
                    onClosePress={onOptionPress}
                    onBackPress={() => {
                        onBackPress()
                    }}
                /> */}
      <Header title={'Chat Message'} />
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1, // sent messages should have same user._id
        }}
        // renderLeftButton={
        //     renderEmergencyButton()
        // }
        onInputTextChanged={(text) =>
          text.length > 0
            ? setisTextfieldDisable(false)
            : setisTextfieldDisable(true)
        }
        // textInputProps={
        //     style = {
        //         paddingVertical: 0,
        //         borderRadius: 25,
        //         paddingLeft: 12,
        //         paddingRight: 12,
        //         paddingTop: 10,
        //         paddingBottom: 8,
        //         overflow: 'hidden',
        //         marginLeft: 53,
        //         marginRight: 5,
        //     }}
        alwaysShowSend={true}
        renderBubble={renderBubble}
        //renderAvatar={null}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
      />
      {renderTransparentView()}
      {renderReportPopup()}
      {renderCloseWithAnimation()}
      {renderEmergencyModal()}
      {renderRenameModal()}
    </View>
  );
};

export default ChatMessages;
