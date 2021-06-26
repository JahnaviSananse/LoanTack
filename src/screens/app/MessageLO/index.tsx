import database from '@react-native-firebase/database';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  AsyncStorage,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as CONSTANT from 'src/constants/constant';
import { resetReadData, setReadData } from 'src/redux/actions/message';
import { getChatID } from 'src/redux/actions/user';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';
var CryptoJS = require('crypto-js');
const commentDateFormate = 'YYYY-MM-DD HH:mm:ss';
var SECRET_KEY = 'ppOtCEH2s0OaQgyg2bfgI9sHyAFBcy9supbnLpj1';

interface IMessageInterface {
  readData: any[];
  setReadData: Function;
  userData: any;
  chatID: any;
  getChatID: Function;
}
const MessageLO = (props: IMessageInterface) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [unreadCountAry, setUnreadCountAry] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentChatId, setCurrentChatId] = useState('');
  const [isMessageList, setIsMessageList] = useState(false);
  const [userId, setUserId] = React.useState('');
  const [isChatLoad, setIsChatLoad] = useState(true);
  const [firebaseId, setFirebaseId] = useState('');
  const [userItem, setItem] = React.useState();
  let FID = '';
  let UID = '';
  let dData: any = [];
  let chatListPath = 'chatList';
  const param: any = useRoute().params;

  React.useEffect(() => {
    getDefaultValue();
    findUsersID();
  }, []);

  React.useEffect(() => {
    if (props.chatID && userItem) {
      navigation.navigate('ChatLO', {
        name: userItem.name,
        borrower_id: userItem.userId,
        isBack: true,
        chatId: props.chatID,
      });
      console.log('Item at Navi', userItem);
    }
  }, [props.chatID]);

  function getUserData() {
    try {
      AsyncStorage.getItem(CONSTANT.USER_DATA).then((response: any) => {
        let resObject = JSON.parse(response);
        setUserId(resObject.data.user.id);
        UID = resObject.data.user.id;
        onAddedConnectionData();
        if (response) {
          var amOnline = database().ref('.info/connected');
          var userRef = database().ref(
            'users/' + resObject.data.user.id + '/status',
          );
          amOnline.on('value', function (snapshot: any) {
            if (snapshot.val()) {
              userRef.onDisconnect().set(false);
              userRef.set(true);
            }
          });
        }
        setIsChatLoad(false);
        setTimeout(() => {
          // this.onGetTotalUnread();
          //console.log('onAdded Comint');
        }, 500);
      });
    } catch (error) {
      Alert.alert(error);
    }
  }

  function getDefaultValue() {
    try {
      AsyncStorage.getItem(CONSTANT.USER_DATA).then((response: any) => {
        let resObject = JSON.parse(response);
        setUserId(resObject?.data?.user?.id);
        UID = resObject.data.user.id;
      });
    } catch (error) {}
  }

  function findUsersID() {
    database()
      .ref('users')
      .on('value', (snap: any) => {
        console.log('User path', snap.val(), database());
        if (snap.exists() === true) {
          Object.values(snap.val()).map((i: any) => {
            if (i.userId === UID) {
              FID = i.userId;
              setFirebaseId(i.userId);
              getUserData();
            }
          });
        }
      });
  }

  const retrieveUnreadCount = (uid: string, chatId: string) => {
    let userConenctionPath = `userConnection/${props.userData.id}/${chatId}`;
    console.log('userConenctionPath: ', userConenctionPath);
    database()
      .ref(userConenctionPath)
      .on('value', (snap: any) => {
        let isExist = snap.exists();
        if (isExist === false) {
          return;
        }
        let obj = {
          chatId: snap.key,
          count: snap.val(),
        };
        props.setReadData(obj);
      });
  };
  function onAddedConnectionData() {
    //utility.recordEvent(`onAddedConnectionData`, '');
    var userConenctionPath = `userConnection/${FID}`;
    //console.log('On Add Connection', userConenctionPath);
    database()
      .ref(userConenctionPath)
      .on('child_added', (snap: any) => {
        let isExist = snap.exists();
        if (isExist === false) {
          return;
        }
        var finalArray: any = data;
        let obj: any = {};
        let obValue = snap.key;
        //console.log('Obj Vakye', Object.keys(snap.val())[0], snap.key);
        obj.key = snap.key;
        obj.value = snap.val();
        finalArray.push(obj);

        // let unreadCount = 0;
        // if (Object.keys(snap).length > 0) {
        //     var finalArray = [];
        //     snap.forEach((child) => {
        //         unreadCount = unreadCount + child.val();
        //     });
        // }

        setData(finalArray);
        // Here we need to monitor chatList node based on key.
        // console.log('efore', FID);
        getchatList(obValue);
      });

    database()
      .ref(userConenctionPath)
      .on('child_removed', (snap: any) => {
        let isExist = snap.exists();
        if (isExist === false) {
          return;
        }

        var currentObject = JSON.stringify(snap);
        var finalArray = data;
        // Removed the data from list
        var tdata: any = finalArray.filter((obj: any) => obj.key !== snap.key);

        // Removed the display data
        var displayDataNew = displayData.filter(
          (obj: any) => obj.key !== snap.key,
        );

        setTimeout(() => {
          setData(tdata);
          // setDisplayData(displayDataNew);
        }, 300);
      });

    database()
      .ref(userConenctionPath)
      .on('child_changed', (snap: any) => {
        let isExist = snap.exists();
        if (isExist === false) {
          return;
        }
        var currentObject = JSON.stringify(snap);
        var finalArray: any = data;
        var jdata: any = finalArray.filter((obj: any) => obj.key !== snap.key);

        let obj: any = {};
        obj.key = snap.key;
        obj.value = snap.val();
        jdata.push(obj);

        setData(jdata);
      });

    setTimeout(() => {
      setShowAlert(true);
      //this.state.showAlert = true;
    }, 5000);
  }

  function getchatList(chatId: string) {
    chatListPath = `chatList/${chatId}`;

    //utility.recordEvent(`ChatList: getchatList${chatListPath}`, '');
    // console.log('Chatlist', FID, chatListPath);

    database()
      .ref(chatListPath)
      .on('value', (snap: any) => {
        //console.log('Chat Snap', snap);
        let isExist = snap.exists();
        if (isExist === false) {
          return;
        }
        // var finalArray = this.state.data;
        let stringifyObject = JSON.stringify(snap);

        let obj = JSON.parse(stringifyObject);
        obj.key = snap.key;

        // console.log('Obj', obj);
        var fDisplayData: any = displayData.filter(
          (value: any) => value.key !== snap.key,
        );
        let messageObject: any = {};
        let userName = '';
        let message = '';

        if (
          showAlert &&
          currentChatId !== snap.key &&
          isMessageList === false
        ) {
          // Call Alert method to display message.
          // this.dropDownAction('show', 'title', 'message', obj)
          if (obj.lastMessage) {
            let unreadCount = 0;
            var data: any = data.filter((obj: any) => obj.key === snap.key);
            if (data && data[0].value) {
              unreadCount = data[0].value;
            }

            if (unreadCount === 0) {
              return;
            }

            let lastMessage = obj.lastMessage;

            if (lastMessage.userId !== FID) {
              var bytes = CryptoJS.AES.decrypt(lastMessage.text, SECRET_KEY);
              message = bytes.toString(CryptoJS.enc.Utf8);

              if (obj.chatTypeId === 1) {
                // One to One
                let allMem = obj.allMembers;
                if (allMem[lastMessage.userId]) {
                  userName = allMem[lastMessage.userId].firstName;
                }
              } else {
                userName = 'Unknown';
                if (obj.name) {
                  userName = obj.name;
                }

                let allMem = obj.allMembers;

                let name = '';
                if (lastMessage.userId === userId) {
                  name = 'You';
                } else {
                  if (allMem[lastMessage.userId]) {
                    name = allMem[lastMessage.userId].firstName;
                  }
                }
                message = name + ' ' + message;
              }
              messageObject.mainData = obj;
              messageObject.title = userName;
              messageObject.message = message;
              messageObject.chatId = chatId;
              // DeviceEventEmitter.emit('showMessage', { messageObject });  pending
            }
          }
        }

        let text = '';
        if (obj.lastMessage) {
          let lastMessage = obj.lastMessage;
          var bytes = CryptoJS.AES.decrypt(lastMessage.text, SECRET_KEY);
          text = bytes.toString(CryptoJS.enc.Utf8);
        }
        obj.message = text;
        // obj.usernameUpdate = name

        let allMem = obj.allMembers ? obj.allMembers : {};
        // let onlineMem = obj.onlineMembers;

        // console.log('AMm MEnne', allMem);
        //setDisplayData(allMem);
        //console.log('allMem', allMem, UID);
        let userKey: any = Object.values(allMem).filter(
          (value: any) => value.userId !== UID,
        );
        userKey[0].chatId = chatId;

        //if member status is true then and then add into array
        // console.log('Userkey', userKey);
        let senderUserId = userKey[0];
        let onlineMem = obj.onlineMembers[senderUserId];
        let newArr = Object.keys(obj.onlineMembers);
        newArr.map((i: string) => {
          if (userKey[0].userId == i) {
            userKey[0].isOnline = obj.onlineMembers[i];
          }
        });

        // let lastMessage = obj.lastMessage;
        // let lastMessageTime = moment(lastMessage.createdAt).format(
        //   'DD-MM-YYYY HH:MM:ss',
        // );
        // let lastOnlineStatus = moment(obj.updated_at).format(
        //   'DD-MM-YYYY HH:MM:ss',
        // );

        // let date1 = new Date(lastOnlineStatus);
        // let date2 = new Date(lastMessageTime);
        // console.log('DDDD', date2, date1);
        // function getDifferenceInDays() {
        //   const diffInMs = Math.round(date2 - date1);
        //   return diffInMs / (1000 * 60 * 60 * 24);
        // }

        // function getDifferenceInHours() {
        //   const diffInMs = Math.round(date2 - date1);
        //   return diffInMs / (1000 * 60 * 60);
        // }

        // function getDifferenceInMinutes() {
        //   const diffInMs = Math.round(date2 - date1);
        //   return diffInMs / (1000 * 60);
        // }

        // function getDifferenceInSeconds() {
        //   const diffInMs = Math.round(date2 - date1);
        //   return diffInMs / 1000;
        // }

        // console.log(
        //   'TT',
        //   getDifferenceInDays(),
        //   getDifferenceInHours(),
        //   getDifferenceInMinutes(),
        //   getDifferenceInSeconds(),
        // );

        if (obj.memberStatus[senderUserId]) {
          fDisplayData.push(obj);
        }

        // if (dData.length > 0) {
        //   let filtered = dData.filter(
        //     (f: any) => f.userId !== null && f.userId !== userKey[0].userId,
        //   );
        //   console.log('Filter', filtered);
        //   dData.push(filtered);
        // } else {
        //   console.log('Habhai haa', dData);
        //   if (userKey[0] !== null) {
        //     dData.push(userKey[0]);
        //   }
        // }

        // console.log('Final USere', userKey[0]);

        setTimeout(() => {
          retrieveUnreadCount(userKey[0].userId, chatId);
        }, 1000);
        let findData = false;
        dData.map((item: any) => {
          if (item.userId === userKey[0].userId) {
            // item = JSON.parse(JSON.stringify(userKey[0]));
            item.name = userKey[0].name;
            findData = true;
          }
        });
        if (findData === false) {
          dData.push(userKey[0]);
        }

        let pp = dData.filter(
          (ele: any, ind: number) =>
            ind ===
            dData.findIndex(
              (elem: any) =>
                elem.userId === ele.userId && elem.userId === ele.userId,
            ),
        );
        setDisplayData(dData);
      });
  }

  const checkUnreadCount = (key: string) => {
    let fData = props.readData.filter((item: any) => item.chatId === key);
    console.log('Cht Unread', fData);
    if (fData.length > 0 && fData[0].count > 0) {
      return true;
    }
    return false;
  };
  const renderItem = (item: any) => {
    // console.log('Item', item);
    let isUnread = checkUnreadCount(item.chatId);
    //item.isOnline
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setItem(item);
            props.getChatID({ borrower_id: item.userId });

            // navigation.navigate('ChatLO', {
            //   name: item.name,
            //   borrower_id: item.userId,
            //   isBack: true,
            //   chatId: item.chatId,
            // });
          }}
          style={styles.cellContainer}
        >
          <View style={styles.avatarContainer}>
            <Image source={IMAGES.IC_PLACEHOLDER} style={styles.avatar} />
            {isUnread && <View style={styles.messagePoint} />}
          </View>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </TouchableOpacity>
        <View style={styles.separetor} />
      </View>
    );
  };

  // console.log('displayData', displayData);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={'Direct Message'}
          rightImg={IMAGES.IC_NOTIFICATION}
          rightClick={() =>
            navigation.navigate('NotificationLO', { isBack: true })
          }
        />
        <View style={styles.flatListContainer}>
          <FlatList
            data={displayData}
            showsVerticalScrollIndicator={false}
            extraData={dData || props.readData}
            keyExtractor={(item: any) => item.userId}
            renderItem={({ item }) => {
              return renderItem(item);
            }}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SelectLO', { data: displayData })
            }
            style={styles.FloatButton}
          >
            <Image source={IMAGES.IC_MESSAGE_ADD} style={styles.floatAdd} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* <COMPONENT.Loader isLoading={isChatLoad} /> */}
    </KeyboardAvoidingView>
  );
};

// export default MessageLO;

const mapStateToProps = (state: IReduxState) => ({
  readData: state.message.readChannelData,
  userData: state.auth.userData,
  chatID: state.user.chatID,
});

export default connect(mapStateToProps, {
  setReadData,
  resetReadData,
  getChatID,
})(MessageLO);
