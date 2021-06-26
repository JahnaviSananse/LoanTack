import notifee from '@notifee/react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import {
  AsyncStorage,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as CONSTANT from 'src/constants/constant';
import { getDocumentDetail, getDocumentList } from 'src/redux/actions/document';
import {
  getChatID,
  getLODashboardList,
  saveDeviceToken,
} from 'src/redux/actions/user';
import { IReduxState } from 'src/redux/reducers';
import { diff_hours, diff_minutes } from 'src/utility/util';
import styles from './styles';

interface IProp {
  userData: any;
  lo_dashboard: any[];
  loading: boolean;
  getLODashboardList: Function;
  saveDeviceToken: Function;
  getChatID: Function;
  chatID: any;
  getDocumentList: Function;
  getDocumentDetail: Function;
}

const DashboardLO = (props: IProp) => {
  const navigation = useNavigation();
  const [selectedOffer, setSelectedOffer] = React.useState<any>({});
  const [modalVisible, setModalVisible] = React.useState(false);
  const [data, setData] = React.useState<any[]>([]);

  const [userItem, setItem] = React.useState<any>();
  // const data = [
  //   {
  //     title: 'Promotions',
  //     desc: 'Discount for the upcoming Thanksgiving occasion.',
  //     time: '1 hour ago',
  //   },
  //   {
  //     title: 'Tip of the Day',
  //     desc: 'You can refer the app to a friend and earn rewards or discounts.',
  //     time: '2 hour ago',
  //   },
  //   {
  //     title: 'Reminders',
  //     desc:
  //       'Your subscription period is about to end. Please subscribe to continue enjoying the system.',
  //     time: '1 week ago',
  //   },
  // ];
  React.useEffect(() => {
    AsyncStorage.setItem(CONSTANT.IS_TOKEN_AVAILABLE, 'yes');
    props.getLODashboardList();
    getToken();
    //lo_dashboard
  }, []);

  React.useEffect(() => {
    if (props.chatID && userItem) {
      navigation.navigate('ChatLO', {
        name: userItem?.name,
        borrower_id: userItem?.userId,
        isBack: true,
        chatId: props.chatID,
      });
      // console.log('Item at Navi', userItem);
    }
  }, [props.chatID]);

  React.useEffect(() => {
    if (props.lo_dashboard) {
      setData(props.lo_dashboard);
    }
  }, [props.lo_dashboard]);

  const handleNavigation = (message: any) => {
    //handle navigation
    console.log('Comming', message);
    let name: any = message?.notification?.title;
    let chatid: any = message?.data?.chatId;
    let uid: number = parseInt(message?.data?.userId);
    let itemID: number = message?.data?.id;
    setItem({ name, userId: uid, chatId: chatid });
    if (message.notification.title.includes('Document')) {
      setTimeout(() => {
        navigation.navigate('Documents');
        setTimeout(() => {
          props.getDocumentDetail(itemID);
          navigation.navigate('DocumentDetailLO', {
            name: message?.data?.name,
          });
        }, 500);
      }, 500);
    } else {
      setTimeout(() => {
        navigation.navigate('Message');
        setTimeout(() => {
          props.getChatID({ borrower_id: uid });
        }, 500);
      }, 500);
    }
  };
  //Handle Push Notification
  React.useEffect(() => {
    checkPermission();
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      // console.log('Message handled in the background!', remoteMessage);
      // console.log('mes');
      handleNavigation(remoteMessage);
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      // console.log(
      //   'Notification caused app to open from background state:',
      //   remoteMessage,
      // );
      handleNavigation(remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage,
          // );
          handleNavigation(remoteMessage);
        }
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      //Handle foreground messages
      displayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  // const getToken = async () => {
  //   messaging()
  //     .getToken()
  //     .then((token: any) => {
  //       console.log('Device Token', token);
  //       // let req = {};
  //       // req.device_token = token;
  //       // req.os = Platform.OS === 'ios' ? 1 : 2;
  //       // props.devicetoken(req);
  //     });
  // };
  //new push notification code
  const requestPermission = async () => {
    messaging()
      .requestPermission()
      .then(() => {
        getToken();
      })
      .catch((error) => {});
  };
  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      // console.log('checkPermission call');
      getToken();
    } else {
      requestPermission();
    }
  };

  const displayNotification = async (message: any) => {
    // console.log('A new FCM message arrived!\n' + JSON.stringify(message));

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    notifee.displayNotification({
      title: message.notification.title,
      body: message.notification.body,
      android: {
        channelId,
        asForegroundService: false,
        // color: AndroidColor.RED,
        // colorized: true,
      },
    });
  };

  const HTMLView = (props: any) => {
    const { htmlString } = props;
    return (
      <HTML
        html={htmlString}
        allowFontScaling={true}
        tagsStyles={{
          br: { margin: 0 },
          p: { margin: 0 },
          em: { margin: 0 },
          u: { margin: 0 },
          strong: { margin: 0 },
        }}
        ignoredTags={['br']}
        classesStyles={{
          'ql-size-huge': {
            fontSize: 30,
          },
          'ql-size-small': {
            fontSize: 10,
          },
          'ql-size-large': {
            fontSize: 20,
          },
        }}
      />
    );
  };

  // const handleNavigation = (message: any) => {
  //   //handle navigation
  //   console.log('Comming', message);
  //   if (message.notification.title.includes('Document')) {
  //     setTimeout(() => {
  //       // if (props.userData?.role === 2) {
  //       //   navigationRef.current?.navigate('MessageLO');
  //       // } else {
  //       navigationRef.current?.navigate('Documents');
  //       // }
  //     }, 500);
  //   } else {
  //     setTimeout(() => {
  //       // if (props.userData?.role === 2) {
  //       //   navigationRef.current?.navigate('MessageLO');
  //       // } else {
  //       navigationRef.current?.navigate('Message');
  //       // }
  //     }, 500);
  //   }
  //   // console.log('Handle Navigation', message);
  // };

  //Handle Push Notification
  React.useEffect(() => {
    checkPermission();
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      // console.log('Message handled in the background!', remoteMessage);
      // console.log('mes');
      handleNavigation(remoteMessage);
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      // console.log(
      //   'Notification caused app to open from background state:',
      //   remoteMessage,
      // );
      handleNavigation(remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage,
          // );
          handleNavigation(remoteMessage);
        }
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      //Handle foreground messages
      displayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  //new push notification code
  // const requestPermission = async () => {
  //   messaging()
  //     .requestPermission()
  //     .then(() => {
  //       getToken();
  //     })
  //     .catch((error) => {});
  // };
  // const checkPermission = async () => {
  //   const enabled = await messaging().hasPermission();
  //   if (enabled) {
  //     // console.log('checkPermission call');
  //     getToken();
  //   } else {
  //     requestPermission();
  //   }
  // };

  // const displayNotification = async (message: any) => {
  //   // console.log('A new FCM message arrived!\n' + JSON.stringify(message));

  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //   });
  //   notifee.displayNotification({
  //     title: message.notification.title,
  //     body: message.notification.body,
  //     android: {
  //       channelId,
  //       asForegroundService: false,
  //       // color: AndroidColor.RED,
  //       // colorized: true,
  //     },
  //   });
  // };

  const getToken = async () => {
    messaging()
      .getToken()
      .then((token: any) => {
        console.log('Device Token', token);
        props.saveDeviceToken({ device_token: token, platform: Platform.OS });
        // let req = {};
        // req.device_token = token;
        // req.os = Platform.OS === 'ios' ? 1 : 2;
        // props.devicetoken(req);
      });
  };

  const renderItem = (item: any) => {
    let today = new Date();
    let fDate = dayjs(today).format('DD/MM/YYYY');
    let fNDate = dayjs(item.created_at).format('DD/MM/YYYY');
    let displayDate: any = fNDate;
    var toUTC = new Date(item.created_at);

    if (fNDate === fDate && diff_hours(today, toUTC) === 0) {
      let min = diff_minutes(today, toUTC) > 0 ? diff_minutes(today, toUTC) : 1;
      if (min > 1) {
        displayDate = min + ' minutes ago';
      } else {
        displayDate = min + ' minute ago';
      }
    } else if (fNDate === fDate && diff_hours(today, toUTC) > 0) {
      displayDate = diff_hours(today, toUTC) + ' hours ago';
    } else {
      displayDate = dayjs(item.created_at).format('MMM DD, YYYY');
    }
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedOffer(item);
          setModalVisible(true);
        }}
        style={styles.cellContainer}
      >
        <Text style={styles.cellTitle}>{item.message_title}</Text>
        {/* <Text style={styles.cellDesc}>{item.message_body}</Text> */}
        <View style={styles.cellDesc}>
          <HTMLView htmlString={item.message_body} />
        </View>
        <Text style={styles.cellTime}>
          {/* {moment.utc(item.created_at).format('HH') + ' hours ago'} */}
          {displayDate}
        </Text>
      </TouchableOpacity>
    );
  };

  function renderPopup() {
    return (
      <View style={styles.popupView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeContainer}
              >
                <Image
                  source={IMAGES.IC_CLOSE}
                  resizeMode={'contain'}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>
                {selectedOffer.message_title}
              </Text>
              {/* <Text style={styles.modalDesc}>{selectedOffer.message_body}</Text> */}
              <View style={styles.modalDesc}>
                <HTMLView htmlString={selectedOffer.message_body} />
              </View>
              {/* <View style={styles.modalSep} /> */}
              {/* <Text style={styles.useCodeText}>Use code</Text>
              <Text style={styles.codeText}>ThanksGiving30</Text>
              <Text style={styles.codeDesc}>
                to enjoy flat 30% discount for upcoming month’s subscription.
              </Text> */}
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  const onShare = async (link: string) => {
    try {
      const result = await Share.share({
        title: 'App link',
        message: `Please install this app and stay safe , AppLink :${link}`,
        // message: `Please install this app and stay safe`,
        url: link,
      });
      console.log('Linking', result);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //console.log(error.message);
    }
  };

  async function buildLink() {
    const link = await dynamicLinks().buildShortLink({
      link: `https://www.creolestudios.com/${props.userData?.id}`,
      // domainUriPrefix is created in your Firebase console
      domainUriPrefix: 'https://loantack.page.link',
      // optional setup which updates Firebase analytics campaign
      // "banner". This also needs setting up before hand
      analytics: {
        campaign: 'banner',
      },
      android: { packageName: 'com.loantack' },
      ios: { bundleId: 'com.enfuse.loantack' },
    });
    if (link) {
      onShare(link);
    }
    return link;
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAwareL}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={'Dashboard'}
          rightImg={IMAGES.IC_NOTIFICATION}
          rightClick={() =>
            navigation.navigate('NotificationLO', { isBack: true })
          }
        />
        {renderPopup()}

        <View style={styles.dataContainer}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.containStyle}
            renderItem={({ item }) => renderItem(item)}
            ListEmptyComponent={() => (
              <View>
                <Text>No New Messages</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.buttonContainer}>
          <COMPONENT.Button
            title={'REFER A FRIEND'}
            type={'fill'}
            onPress={() => {
              // buildLink();
              onShare(props.userData?.link);
            }}
          />
        </View>
      </SafeAreaView>
      <COMPONENT.Loader isLoading={props.loading} />
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  userData: state.auth.userData,
  lo_dashboard: state.user.lo_dashboard,
  loading: state.user.loading,
  chatID: state.user.chatID,
});

export default connect(mapStateToProps, {
  getLODashboardList,
  saveDeviceToken,
  getChatID,
  getDocumentList,
  getDocumentDetail,
})(DashboardLO);
