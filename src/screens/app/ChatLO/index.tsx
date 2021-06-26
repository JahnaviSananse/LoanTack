import database from '@react-native-firebase/database';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {
  Alert,
  AsyncStorage,
  BackHandler,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';
import { setCurrentDate } from 'src/redux/actions/common';
import {
  clearChatDocumentData,
  clearChatIDData,
  getChatID,
  saveChatDocument,
} from 'src/redux/actions/user';
import { IReduxState } from 'src/redux/reducers';
import Bubble from './Bubble';
import styles from './styles';
var CryptoJS = require('crypto-js');
const commentDateFormate = 'YYYY-MM-DD HH:mm:ss';
var SECRET_KEY = 'ppOtCEH2s0OaQgyg2bfgI9sHyAFBcy9supbnLpj1';

interface ChatLOProps {
  getChatID: Function;
  userData: any;
  chatID: string;
  fileUri: string;
  saveChatDocument: Function;
  clearChatDocumentData: Function;
  assignedloData: any;
  chatID_failure_message: string;
  setCurrentDate: Function;
  clearChatIDData: Function;
  // currentDate: string;
}

// let currentDate = '';
const ChatLO = (props: ChatLOProps) => {
  const navigation = useNavigation();

  const params: any = useRoute().params;
  const [msgAry, setMsgAry] = React.useState([]);
  // const [dData, setDData] = React.useState([]);
  const [finalArray, setFinalArray] = React.useState([]);
  const [msg, setMsg] = React.useState('');
  const [userID, setUserId] = React.useState('');
  const [optionVisible, setOptionVisible] = React.useState(false);
  const [name, setName] = React.useState('');
  const [canGoBack, setCanGoBack] = React.useState(false);
  const [displayData, setDisplayData] = React.useState<any[]>([]);
  // const [isFirstTime, setIsFirstTime] = React.useState(false);
  const [isContinueReceived, setContinueReceived] = React.useState(true);
  // const [isChatLoaded, setIsChatLoaded] = React.useState(false);
  const [chatId, setChatId] = React.useState();
  // const [isSenderOnlinem, setIsSenderOnline] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [uploadData, setUploadData] = React.useState<any>({});
  const [title, setTitle] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [isImageVisible, setIsImageVisible] = React.useState(false);

  const [isToday, setIsToday] = React.useState(false);
  const currentChatId = params?.chatId ? params?.chatId : '';
  // const [isFirstTime, setIsFirstTime] = React.useState(true);
  let isFirstTime = true;
  var mainList = [];
  // const [products, setProducts] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', clearData);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', clearData);
    };
  });

  React.useEffect(() => {
    setChatId(params.chatId);
    if (
      props.userData?.role !== 2 &&
      (props.chatID === '' ||
        props.chatID === undefined ||
        props.chatID === null)
    ) {
      props.getChatID();
      // props.getChatID({ borrower_id: params?.borrower_id });
    }
    setTimeout(() => {
      setUnreadCountZero();
    }, 100);
    setTitle(props.assignedloData?.data?.name);
  }, []);

  React.useEffect(() => {
    if (params) {
      if (params.name !== undefined) {
        setName(params.name);
      } else {
        setName('');
      }
      if (params.isBack !== undefined) {
        setCanGoBack(true);
      }
      if (params.chatId) {
        // props.getChatID({ borrower_id: params?.borrower_id });
      } else {
        props.getChatID();
      }
    } else {
      setName('');
    }
    console.log('PArams', params);
  }, [params]);

  React.useEffect(() => {
    if (props.chatID_failure_message !== '') {
      Alert.alert('LoanTack', 'Chat ID is Empty');
    }
  }, [props.chatID_failure_message]);

  React.useEffect(() => {
    if (!isContinueReceived) {
      getCountinueChild();
    }
  }, [isContinueReceived]);
  React.useEffect(() => {
    if (userID) {
      onOnlineStatus(true);
      setUnreadCountZero();
      var amOnline = database().ref('info/connected');
      var userOnlinePath = database().ref(
        `chatList/${props.chatID}/onlineMembers/${props.userData.id}`,
      );
      var userConenctionPath = database().ref(
        `typingStatus/${props.chatID}/${props.userData.id}`,
      );
      amOnline.on('value', function (snapshot: any) {
        if (snapshot.val()) {
          userOnlinePath.onDisconnect().set(false);
          userConenctionPath.onDisconnect().set(null);
        }
      });

      setTimeout(() => {
        updateTimeStamp();
        onAddedConnectionData();
        getchatList();
        renderOnlineStatus();

        setLoading(false);
      }, 30);
    }
  }, [userID]);

  const updateId = (id: string) => {
    setUserId(id);
  };
  React.useEffect(() => {
    if (props.chatID) {
      try {
        AsyncStorage.getItem(CONSTANT.USER_DATA).then((response: any) => {
          let resObject = JSON.parse(response);
          //console.log('Response', resObject);
          let id = resObject?.data?.user?.id;
          updateId(id);
        });
      } catch (error) {
        //alert(error);
        // console.log('Error Main', error);
      }
    }
  }, [props.chatID]);

  React.useEffect(() => {
    if (props.fileUri !== '') {
      if (uploadData.type === 'application/pdf') {
        newOnSend(uploadData.name, 2, props.fileUri);
      } else {
        newOnSend(uploadData.name, 1, props.fileUri);
      }
    }
  }, [props.fileUri]);

  const clearData = () => {
    // if (props.userData) {
    //   var userOnlinePath = `userConnection/${props.userData?.id}`;
    //   let obj = {} as any;
    //   obj[props.chatID] = 0;
    //   database().ref(userOnlinePath).update(obj);
    // }

    onOnlineStatus(false);
  };

  function updateTimeStamp() {
    // let usrId = userID;
    let activeUserObject: any = {};
    activeUserObject[userID] = moment().unix();
    let activeUsersPath = `activeUsers/`;
    database()
      .ref(activeUsersPath)
      .update(activeUserObject, () => {});
  }

  function setUnreadCountZero() {
    console.log('props.userData.id: ', props.userData.id);
    console.log('props.chatID: ', chatId);
    console.log('props: ', props);
    if (chatId && props.userData.id) {
      var userOnlinePath = `userConnection/${props.userData.id}`;
      let obj: any = {};
      obj[chatId] = 0;
      database().ref(userOnlinePath).update(obj);
    }
  }

  function onOnlineStatus(isOnline: boolean) {
    var userOnlinePath = 'chatList/' + props.chatID + '/onlineMembers';
    let obj: any = {};

    console.log('On Update User check ', props.userData);
    obj[props.userData.id] = isOnline;
    console.log('ONLine Status', userOnlinePath);
    console.log('ONLine Object', obj);
    if (currentChatId) {
      database().ref(userOnlinePath).update(obj);
    }
  }

  function onAddedConnectionData() {
    var userConenctionPath = `userConnection/${props.userData.id}`;
    database()
      .ref(userConenctionPath)
      .on('child_removed', () => {});
  }

  function renderOnlineStatus() {
    let onlineStatusPath = 'chatList/' + chatId + '/onlineMembers';
    database()
      .ref(onlineStatusPath)
      .on('value', (snap: any) => {
        if (snap.exists()) {
          // let senderUserId = Object.keys(snap.val()).filter(
          //   (value) => value !== userID,
          // );
          // let status = snap.val()[senderUserId[0]];
          // setIsSenderOnline(status);
        } else {
          setLoading(false);
        }
      });
  }

  function getchatList() {
    var chatListPath = `chatList/${props.chatID}`;

    database().setPersistenceEnabled(true);
    database().ref(chatListPath).keepSynced(true);
    console.log('Chat Path', chatListPath);
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

          setDisplayData(displayData.concat(dData));
          //setMsgAry(dData);
          console.log('Chat List ', displayData);
          setTimeout(() => {
            if (isContinueReceived) {
              // onReceiveMessage();
              //getCountinueChild();
            }
            setContinueReceived(false);
            // setIsFirstTime(true);
          }, 500);
        } else {
          setLoading(false);
        }
      });
  }

  function getCountinueChild() {
    var converstionData = `converstionData/${props.chatID}`;
    // // console.log('cont8nue called', converstionData, props.chatID);
    database().setPersistenceEnabled(true);
    database().ref(converstionData).keepSynced(true);

    let data: any = msgAry;
    database()
      .ref(converstionData)
      .once('value', (snap: any) => {
        // console.log('ContinueChild');
        if (snap.exists()) {
          //console.log('CCall', snap);
          snap.forEach((dic: any) => {
            //console.log('Dic', dic);
            var key = dic.key;
            // arrKeys.map((keyName) => {
            let stringifyObject = JSON.stringify(dic.val());
            let obj = JSON.parse(stringifyObject);
            obj.key = key;
            var local_date = moment
              .utc(obj.createdAt)
              .local()
              .format(commentDateFormate);

            var plaintext = '';
            let isSystem = false;
            if (obj.isSystemMessage) {
              plaintext = obj.text;
              isSystem = true;
            } else {
              var bytes = CryptoJS.AES.decrypt(obj.text, SECRET_KEY);
              plaintext = bytes.toString(CryptoJS.enc.Utf8);
            }

            // Create an object in same formate as Gifted chat need
            let messageObject: any = {};
            messageObject['_id'] = obj.key;
            messageObject['text'] = plaintext;
            messageObject['createdAt'] = local_date;
            if (obj.type) {
              messageObject['type'] = obj.type;
              messageObject['url'] = obj.url;
            }

            let userName = '';

            let userData: any = {};
            userData['_id'] = obj.senderId;
            userData['name'] = userName;
            //userData['avatar'] = userPic;

            messageObject['user'] = userData;
            messageObject['system'] = isSystem;
            var strDate = moment
              .utc(obj.createdAt)
              .local()
              .format('DD-MM-YYYY');
            messageObject['date'] = strDate;
            let arrFiltered = msgAry.filter(
              (item: any) => item._id === obj.key,
            );

            data.push(messageObject);
            // console.log('Filtered Array', arrFiltered);
            if (arrFiltered.length === 0) {
              setMsgAry(data);
              mainList = data;
              setLoading(false);
            }
          });

          if (data) {
            data = data.reverse();

            setTimeout(() => {
              setMsgAry(data);
              mainList = data;
              setLoading(false);
            }, 300);
            scrollToEnd();
          }
        } else {
          setLoading(false);
        }
      })
      .then(() => {
        onReceiveMessage();
        // this.setState({
        //   isChatLoaded: false,
        // });
        // setIsChatLoaded(false);
      });
  }

  function reverseData(messageObject: any) {
    if (isFirstTime && msgAry.length === 0) {
      isFirstTime = false;
      msgAry.unshift(messageObject);
      setMsgAry(msgAry);
      mainList.push(messageObject);
    } else if (isFirstTime) {
      isFirstTime = false;
      // console.log('Before Push', messageObject, msgAry);
      // if (msgAry.length > 0) {
      //   msgAry.unshift(messageObject);
      //   setMsgAry(msgAry);
      //   mainList.push(messageObject);
      // } else {
      //   let temp: any = [messageObject];
      //   // temp.push(messageObject);
      //   setMsgAry(temp);
      //   mainList.push(messageObject);
      // }
    } else {
      msgAry.unshift(messageObject);
      setMsgAry(msgAry);
      mainList.push(messageObject);
    }
  }

  // console.log('Out  Is First Time', isFirstTime, mainList, msgAry);
  //on receive
  function onReceiveMessage() {
    var converstionData = `converstionData/${props.chatID}`;
    console.log('On Recieve called');
    database()
      .ref(converstionData)
      .limitToLast(1)
      .on('child_added', (snap: any) => {
        if (snap.exists()) {
          // var finalArray = this.state.data;
          setMsgAry([]);
          mainList = [];
          let stringifyObject = JSON.stringify(snap);
          let obj = JSON.parse(stringifyObject);
          obj.key = snap.key;
          var local_date = moment
            .utc(obj.createdAt)
            .local()
            .format(commentDateFormate);

          var plaintext = '';
          let isSystem = false;
          if (obj.isSystemMessage) {
            plaintext = obj.text;
            isSystem = true;
          } else {
            var bytes = CryptoJS.AES.decrypt(obj.text, SECRET_KEY);
            plaintext = bytes.toString(CryptoJS.enc.Utf8);
          }

          // Create an object in same formate as Gifted chat need
          let messageObject: any = {};
          messageObject['_id'] = obj.key;
          messageObject['text'] = plaintext;
          messageObject['createdAt'] = local_date;
          if (obj.type) {
            messageObject['type'] = obj.type;
            messageObject['url'] = obj.url;
          }
          let userName = '';
          let userData: any = {};
          userData['_id'] = obj.senderId;
          userData['name'] = userName;
          //userData['avatar'] = userPic;

          messageObject['user'] = userData;
          messageObject['system'] = isSystem;
          var strDate = moment.utc(obj.createdAt).local().format('DD-MM-YYYY');
          messageObject['date'] = strDate;

          reverseData(messageObject);
          // let userPic = '';
          // let item = displayData[0];

          // let allMem = item.allMembers;
          // let userKey = Object.keys(allMem).filter(
          //   (value) => value === obj.senderId,
          // );

          // console.log('I', item);
          // if (Object.keys(userKey).length > 0) {
          //   let senderUserId = userKey[0];
          //   if (allMem[senderUserId].firstName) {
          //     userName =
          //       allMem[senderUserId].firstName +
          //       ' ' +
          //       allMem[senderUserId].lastName;
          //   }
          //   if (allMem[senderUserId].profilePic) {
          //     userPic = allMem[senderUserId].profilePic;
          //   }
          // }

          // var tmp = msgAry;

          // var arrFiltered = tmp.filter((item: any) => item._id === obj.ksetey);
          // if (arrFiltered.length === 0) {
          //   console.log('Filtered Array On Recieve', msgAry, tmp);
          //   let data: any = [];
          //   if (msgAry.length > 0) {
          //     data = msgAry;
          //   }

          //   // data;
          //   // data.concat(messageObject);
          //   console.log('Upload Data', uploadData);
          //   // let newArray: any[] = data;
          //   setMsgAry(data);
          //   if (Object.keys(messageObject).length > 0) {
          //     data = Object.values(msgAry).filter(
          //       (i: any) => i._id !== messageObject._id,
          //     );
          //   }
          //   // data.unshift(messageObject);
          //   data.splice(0, 0, messageObject);
          //   console.log('message_items', data, messageObject);

          //   // data = data.reverse();
          //   // setTimeout(() => {
          //   // setDData(data);
          //   setMsgAry(data);

          //   setTimeout(() => {
          //     console.log('Allocated', msgAry);
          //   }, 1500);
          //   setLoading(false);
          //   // setIsLoading(false);
          //   // }, 1500);

          //   setTimeout(() => {
          //     // if (this.refs.scrollView) {
          //     //   this.refs.scrollView.scrollToEnd({animated: true});
          //     // }Pending
          //   }, 50);
          // }
        } else {
          setLoading(false);
          // this.setState({
          //   welcomeAvailable: true,
          // });// removed
        }
      });
  }

  function scrollToEnd() {}

  function updateMessageCount() {
    var userOnlinePath = `totalMessageCount/${props.userData?.id}/${props.chatID}`;
    database()
      .ref(userOnlinePath)
      .transaction((currentLike: number) => {
        return currentLike + 1;
      })
      .then(() => {});
  }

  function newOnSend(textNew: string, type?: number, url?: string) {
    var ciphertext = CryptoJS.AES.encrypt(textNew, SECRET_KEY);
    let text = ciphertext.toString();

    var createdDate = moment.utc(new Date()).format(commentDateFormate);

    // Update the unread counter, it will incrment the counter by one for those user who are not online.
    let item = displayData[0];

    console.log('ONlone ', item.onlineMembers, item, displayData[0]);
    let onlineMember = item.onlineMembers;
    // alert(JSON.stringify(onlineMember))
    Object.keys(onlineMember).map((value) => {
      // alert(JSON.stringify(value))
      if (onlineMember[value] === false) {
        if (value !== undefined) {
          var userOnlinePath = `userConnection/${value}/${props.chatID}`;

          console.log('USerONline ', userOnlinePath);
          database()
            .ref(userOnlinePath)
            .transaction((currentLike: number) => {
              return currentLike + 1;
            })
            .then(() => {});
        }
      }
    });
    updateMessageCount();

    let messageObject = {
      text: text,
      senderId: props.userData?.id,
      type: type ? type : 0,
      createdAt: createdDate,
      url: url ? url : '',
    };
    let chatListObject = {
      text: text,
      userId: userID,
      type: type ? type : 0,
      createdAt: createdDate,
    };

    console.log('ON Sen ', chatListObject, messageObject);
    updateTimeStamp();
    setUploadData(messageObject);
    setTimeout(() => {
      // Insert date into converstinData.

      var converstionDataPath = `converstionData/${props.chatID}`;

      database()
        .ref(converstionDataPath)
        .push(messageObject, () => {});

      // Update the lastMessage in chatList
      let updateChatListInfo: any = {};
      updateChatListInfo[
        `chatList/${props.chatID}/lastMessage`
      ] = chatListObject;
      updateChatListInfo[`chatList/${props.chatID}/updateAt`] = moment().unix();

      console.log('Updated', updateChatListInfo);
      database()
        .ref()
        .update(updateChatListInfo, function () {});
      setUnreadCountZero();

      //clear data
      // setUploadData({});
      props.clearChatDocumentData();
      setLoading(false);
    }, 30);
  }

  const chooseDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      let fObj = {
        name: res.name,
        uri: res.uri,
        type: 'application/pdf',
      };
      // let obj: any = {
      //   type: 0,
      //   createdAt: new Date(),
      //   user_id: userID,
      //   pdf: res.uri,
      //   filename: res.name,
      // };
      setUploadData(fObj);
      setLoading(true);
      props.saveChatDocument(fObj);
      setOptionVisible(false);
      // newOnSend(res.name.trim(), 2);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const chooseImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    }).then((images: any) => {
      let obj: any = {
        createdAt: new Date(),
        user_id: userID,
        image: images.path,
        filename: images.path.substring(images.path.lastIndexOf('/') + 1),
      };
      let fObj = {
        name: images.path.substring(images.path.lastIndexOf('/') + 1),
        uri: images.path,
        type: images.mime,
      };
      setUploadData(fObj);
      setLoading(true);
      props.saveChatDocument(fObj);
      // newOnSend(images.filename.trim(), 1);
      setOptionVisible(false);
    });
  };
  const renderChatFooter = () => {
    let ATTACHMENT = optionVisible
      ? IMAGES.IC_ATTACHMENT_ACTIVE
      : IMAGES.IC_ATTACHMENT_INACTIVE;
    return (
      <View>
        {optionVisible && (
          <View style={styles.optionBox}>
            <TouchableOpacity
              onPress={() => chooseImage()}
              style={styles.buttonCotainer}
            >
              <Image
                source={IMAGES.IC_ADD_IMAGE}
                style={styles.optionIcons}
                resizeMode={'contain'}
              />
              <Text style={styles.optionText}>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => chooseDoc()}
              style={styles.buttonCotainer}
            >
              <Image
                source={IMAGES.IC_ADD_DOC}
                style={styles.optionIcons}
                resizeMode={'contain'}
              />
              <Text style={styles.optionText}>Document</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.bottomContainer}>
          <View style={styles.textFieldContainer}>
            <TextInput
              style={[
                styles.textFieldStyle,
                { fontStyle: msg.length === 0 ? 'italic' : 'normal' },
              ]}
              value={msg}
              placeholder={'Type Here'}
              onChangeText={(text) => setMsg(text)}
              keyboardType={'default'}
            />
            <TouchableOpacity
              style={styles.attachmentContainer}
              onPress={() => setOptionVisible(!optionVisible)}
            >
              <Image
                source={ATTACHMENT}
                style={styles.iconAttachment}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.sendContainer,
              {
                backgroundColor: COLOR.getTheme(),
              },
            ]}
            onPress={() => {
              if (msg.trim() !== '') {
                newOnSend(msg.trim());
              }
              setMsg('');
            }}
          >
            <Image
              source={IMAGES.IC_SEND}
              resizeMode={'contain'}
              style={styles.iconSend}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <COMPONENT.Header
        title={props.userData?.role === 2 ? name : title}
        leftImg={canGoBack && IMAGES.IC_BACK}
        leftClick={() => {
          // alert('Chjaty', props.chatID);

          // onOnlineStatus(false);
          console.log('First ', props);
          if (canGoBack) {
            if (props.userData.role === 2) {
              navigation.navigate('MessageLO');
            } else {
              navigation.goBack();
            }
          }

          clearData();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'android' ? -500 : CONSTANT.IS_IPHONEX ? 40 : 20
        }
        style={styles.keyboardAware}
      >
        <View style={styles.mainContainer}>
          {
            <FlatList
              data={msgAry.length > 0 ? msgAry : []}
              inverted
              style={styles.flatStyle}
              extraData={msgAry}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item, index }) => {
                let isDisplay = false;
                if (index === msgAry.length - 1) {
                  isDisplay = true;
                } else {
                  if (msgAry[index + 1]) {
                    let nextData = msgAry[index + 1] as any;
                    let currentDate = moment(item.createdAt).format(
                      'DD/MM/YYYY',
                    );
                    let oldDate = moment(nextData.createdAt).format(
                      'DD/MM/YYYY',
                    );
                    isDisplay = currentDate !== oldDate;
                  }
                }
                // let isDisplay = index === msgAry.length - 1;
                // let currentDate = '';
                // let isDisplay = false;
                // let today = moment().format('DD-MM-YYYY');
                // console.log('Today', isToday, today, msgAry[index].date);
                // if (!isToday && today === msgAry[index].date) {
                //   setIsToday(true);
                //   isDisplay = true;
                // }
                // if (
                //   index > 0 &&
                //   msgAry[index].date !== msgAry[index - 1].date
                // ) {
                //   console.log('MS', msgAry[index].date, msgAry[index - 1].date);
                //   isDisplay = true;
                // } else if (msgAry.length - 1 === index) {
                //   // isToday = true;
                //   isDisplay = true;
                // } else {
                //   isDisplay = true;
                // }
                // else if (!isToday && today === msgAry[index].date) {
                //   isDisplay = true;
                //   isToday = true;
                // }
                // if (index === msgAry.length - 1) {
                //   // isDisplay = true;
                //   // currentDate = itemdate;
                // } else if (currentDate !== item.date) {
                //   isDisplay = true;
                //   props.setCurrentDate(item.date);
                // }

                // if (index > 0 && index < msgAry.length - 1) {
                //   // isDisplay = currentDate !== oldDate;
                //   let preData = msgAry[index + 1] as any;
                //   let currentDate = moment(item.createdAt).format('DD/MM/YYYY');
                //   let oldDate = moment(preData.createdAt).format('DD/MM/YYYY');
                //   isDisplay = currentDate !== oldDate;
                //   console.log('Inside TIme', currentDate, oldDate);
                // }
                // console.log('Message TIme', item.date);
                return (
                  <Bubble
                    item={item}
                    index={index}
                    // msgArry={msgAry}
                    userID={parseInt(userID)}
                    showDate={isDisplay}
                    onSelectImage={(val: string) => {
                      setImageUrl(val);
                      setIsImageVisible(true);
                    }}
                  />
                );
              }}
            />
          }
          <View style={styles.footerContainer}>{renderChatFooter()}</View>
        </View>
      </KeyboardAvoidingView>
      <COMPONENT.ImagePreview
        url={imageUrl}
        onClose={() => setIsImageVisible(false)}
        isModalVisible={isImageVisible}
      />
      <COMPONENT.Loader isLoading={loading} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  userData: state.auth.userData,
  chatID: state.user.chatID,
  fileUri: state.user.fileUri,
  assignedloData: state.dashboard_bo.assignedloData,
  chatID_failure_message: state.user.chatID_failure_message,
  // currentDate: state.common.currentDate,
});

export default connect(mapStateToProps, {
  getChatID,
  saveChatDocument,
  clearChatDocumentData,
  clearChatIDData,
  setCurrentDate,
})(ChatLO);
