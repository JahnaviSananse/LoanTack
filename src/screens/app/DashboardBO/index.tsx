/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  AsyncStorage,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HTML from 'react-native-render-html';
import Share from 'react-native-share';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as COLORS from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';
import { getInfoMessage } from 'src/redux/actions/auth';
import { setScanRedirect, toggleSettingOption } from 'src/redux/actions/common';
import {
  clearAssignData,
  getAssignedLO,
  getColorScheme,
  getLOOfficers,
} from 'src/redux/actions/dashboard_bo';
import {
  clearChatDocumentData,
  clearChatIDData,
  getChatID,
  referDeepLink,
  saveDeviceToken,
} from 'src/redux/actions/user';
import { IReduxState } from 'src/redux/reducers';
import CELL from './cell';
import styles from './styles';

const menuArray = [
  'Dashboard',
  'Calculator',
  'Scan',
  'Guide',
  'Documents',
  'DM',
  'Notifications',
  'Calculations',
  'Checklist',
  'Callback',
];
interface IDashboardLOProps {
  toggleSettingOption: any;
  showOptions: boolean;
  setScanRedirect: Function;
  userData: any;
  getLOOfficers: Function;
  getAssignedLO: Function;
  clearAssignData: Function;
  assignedloData: any;
  loading: boolean;
  dashboardList: any;
  getColorScheme: Function;
  colorScheme: any;
  referDeepLink: Function;
  clearChatDocumentData: Function;
  saveDeviceToken: Function;
  getChatID: Function;
  chatID: any;
  clearChatIDData: Function;
  getInfoMessage: Function;
  infoMessages: any;
  infoMessageError: string;
}
const DashboardLO = (props: IDashboardLOProps) => {
  const { colorScheme } = props;
  const navigation = useNavigation();
  const [isAvailable, setIsAvailable] = React.useState(false);
  const [openReadMore, setOpenReadMore] = React.useState(false);
  const [dashboardList, setDashboardList] = React.useState([]);
  const [dLink, setDLink] = React.useState('');
  const [name, setName] = React.useState('');
  const [infoMessage, setInfoMessage] = React.useState('');

  React.useEffect(() => {
    props.getInfoMessage();
    props.getAssignedLO();
    props.clearChatDocumentData();
    AsyncStorage.setItem(CONSTANT.IS_TOKEN_AVAILABLE, 'yes');
    getToken();
  }, []);

  React.useEffect(() => {
    if (props.infoMessages) {
      setInfoMessage(props.infoMessages?.dashboard_info);
    }
  }, [props.infoMessages]);

  React.useEffect(() => {
    if (props.chatID && name !== '') {
      navigation.navigate('MessageScreen', {
        screen: 'ChatLO',
        params: {
          isBack: true,
          name: name,
          chatId: props.chatID,
        },
      });
      setName('');
      props.clearChatIDData();
      // rr
    }
  }, [props.chatID]);

  React.useEffect(() => {
    AsyncStorage.getItem(CONSTANT.IS_DEEPLINK_DONE).then((res: any) => {
      console.log('IS DEEP LINK DASHBOARD', res);
      if (res && res === 'false') {
        getDeeplinkID();
        getDeeplinkUrl();
      }
    });
    // dynamicLinks()
    //   .getInitialLink()
    //   .then((link) => {
    //     if (link !== null && link.url !== '') {
    //       console.log('Link ', link);
    //       let loID: any = link.url.split('/').pop();
    //       setDLink(link.url);
    //       props.referDeepLink({
    //         referred_by: parseInt(loID),
    //         referred_to: parseInt(props.userData?.id),
    //         meta_data: {
    //           data: 'extra-data',
    //         },
    //       });
    //     }
    //   });
  }, []);

  const getDeeplinkUrl = () => {
    AsyncStorage.getItem(CONSTANT.DEEPLINK_URL).then((res: any) => {
      console.log('DEEP LINK URL DASHBOARD', res);
      if (res && res !== '') {
        setDLink(res);
      }
    });
  };

  const getDeeplinkID = () => {
    AsyncStorage.getItem(CONSTANT.DEEPLINK_ID).then((res: any) => {
      console.log('DEEP LINK ID DASHBOARD', res);
      if (res && res !== '') {
        props.referDeepLink({
          referred_by: parseInt(res),
          referred_to: parseInt(props.userData?.id),
          meta_data: {
            data: 'extra-data',
          },
        });
        AsyncStorage.setItem(CONSTANT.IS_DEEPLINK_DONE, 'true');
      }
    });
  };

  React.useEffect(() => {
    if (colorScheme) {
      COLORS.setTheme(
        colorScheme.dark_color,
        colorScheme.light_color,
        colorScheme.secondary_color,
        colorScheme.secondary_color_font,
      );
    }
  }, [colorScheme]);

  React.useEffect(() => {
    AsyncStorage.getItem(CONSTANT.USER_DATA).then((value: any) => {
      let data = JSON.parse(value);
      console.log('User Local Data', data);
      if (data.data.user.parent_id) {
        setIsAvailable(true);
      } else {
        if (props.assignedloData && props.assignedloData?.data?.id) {
          console.log('assign lo', props.assignedloData);
          setIsAvailable(true);
        } else {
          setIsAvailable(false);
        }
      }
    });
    if (isAvailable) {
      //props.getAssignedLO();
      //console.log('AssignedLO_data', props.assignedloData);
    }

    if (props.dashboardList) {
      let filterData: any = Object.values(props.dashboardList).filter(
        (fvalue: any) => fvalue.name !== 'Dashboard',
      );
      //filterData = filterData.filter((fvalue: any) => fvalue.type !== 2); // remove this who custom links
      setDashboardList(filterData);
    }
  }, [
    props.getAssignedLO,
    props.assignedloData,
    isAvailable,
    props.dashboardList,
  ]);

  const handleNavigation = (message: any) => {
    //handle navigation
    console.log('Comming', message);
    setTimeout(() => {
      // if (props.userData?.role === 2) {
      //   navigationRef.current?.navigate('MessageLO');
      // } else {
      // navigationRef.current?.navigate('ChatLO');
      navigation.navigate('MessageScreen', {
        screen: 'ChatLO',
        params: {
          isBack: true,
          name: name,
          chatId: props.chatID,
        },
      });
      // }
    }, 2000);
    // console.log('Handle Navigation', message);
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
    console.log('Message', message);
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

  function ShareFile() {
    let tLink = props.assignedloData?.data
      ? props.assignedloData.data.link
      : dLink;
    const shareOptions = {
      title: 'Share via',
      url: tLink,
      message: 'LoanTack App Link ' + tLink,
    };
    Share.open(shareOptions)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        err && console.log(err);
      });
  }

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.cellContainer}
        onPress={() => {
          console.log('Menu');
          if (menuArray.includes(item.name)) {
            redirectToScreen(item.name);
          } else {
            redirectToScreen(item.link, item.name);
          }
        }}
      >
        <Image
          source={{ uri: item.icon.green }}
          style={styles.cellImage}
          resizeMode={'contain'}
          tintColor={COLORS.getTheme()}
        />
        <Text style={styles.cellTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const redirectToScreen = (name: string, title?: string) => {
    switch (name) {
      case 'Dashboard':
        navigation.navigate('DashboardBO');
        break;
      case 'Calculator':
        navigation.navigate('CalculatorScreen', {
          screen: 'CalculatorBO',
          params: { isBack: true },
        });
        break;
      case 'Scan':
        props.setScanRedirect('ScanDocumentBO');
        //navigation.navigate('ScanDocumentGetStartBO', {isBack: true});
        navigation.navigate('ScanScreen', {
          screen: 'ScanDocumentGetStartBO',
          params: { isBack: true },
        });
        break;
      case 'Guide':
        navigation.navigate('GuildScreen', {
          screen: 'GuideBO',
          params: { isBack: true },
        });
        break;
      case 'Documents':
        props.setScanRedirect('UploadedDocumentBO');
        navigation.navigate('UploadedDocumentScreen', {
          screen: 'UploadedDocumentBO',
          params: { isBack: true },
        });
        break;
      case 'DM':
        navigation.navigate('MessageScreen', {
          screen: 'ChatLO',
          params: {
            isBack: true,
            name: props.assignedloData?.data?.name,
            chatId: props.chatID,
          },
        });
        break;
      case 'Notifications':
        navigation.navigate('NotificationScreen', {
          screen: 'NotificationLO',
          params: { isBack: true },
        });
        break;
      case 'Calculations':
        navigation.navigate('SavedCalculationScreen', {
          screen: 'SavedCalculationBO',
          params: { isBack: true },
        });
        break;
      case 'Checklist':
        navigation.navigate('ChecklistScreen', {
          screen: 'ChecklistBO',
          params: { isBack: true },
        });
        break;
      case 'Callback':
        navigation.navigate('CallbackScreen', {
          screen: 'CallbackBO',
          params: { isBack: true },
        });
        break;
      default:
        // navigation.navigate('Webview', {
        //   isBack: true,
        //   url: name,
        //   title: title,
        // });
        Linking.openURL(name);
    }
  };
  const renderIntro = (detail: any) => {
    return (
      <View style={styles.introContainer}>
        <View
          style={openReadMore ? styles.htmlContainer : styles.htmlContainer2}
        >
          <HTML
            html={detail}
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
        </View>
        {detail.length > 50 && (
          <View style={styles.readmoreContainer}>
            <TouchableOpacity
              style={styles.readMoreButton}
              onPress={() => {
                setOpenReadMore(!openReadMore);
              }}
            >
              <Text
                style={[
                  styles.readMoreText,
                  {
                    color: COLORS.getTheme(),
                  },
                ]}
              >
                {openReadMore ? 'READ LESS' : 'READ MORE'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  const readMorePopup = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={false}
        onRequestClose={() => {
          setOpenReadMore(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.readmoremodalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpenReadMore(false)}
            >
              <Image
                style={styles.image}
                resizeMode={'contain'}
                source={IMAGES.IC_CLOSE}
              />
            </TouchableOpacity>
            <ScrollView style={styles.htmlmodalContainer}>
              <HTML
                html={
                  Object.entries(props.assignedloData).length
                    ? props.assignedloData.data.welcome_text
                    : ''
                }
                //allowedStyles={true}
                allowFontScaling={true}
                //allowFontScaling={true}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };
  const renderOfficer = () => {
    let data =
      Object.keys(props.assignedloData).length > 0
        ? [props.assignedloData.data]
        : [];
    //console.log(props.assignedloData);
    return (
      <View>
        <FlatList
          scrollEnabled={false}
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containStyle}
          renderItem={({ item }) => (
            <CELL
              item={item}
              onPressMessage={(val) => {
                setName(val);
                props.getChatID();
              }}
            />
          )}
        />
        {Object.entries(props.assignedloData).length
          ? props.assignedloData.data.welcome_text != null
            ? renderIntro(props.assignedloData.data.welcome_text)
            : null
          : null}
      </View>
    );
  };
  const selectOfficer = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.selectOfficeContainer}
          onPress={() => {
            props.getLOOfficers();
            navigation.navigate('MessageScreen', {
              screen: 'SelectLO',
              params: { isBack: true },
            });
            props.clearAssignData();
          }}
        >
          <Text style={styles.loanOfficeText}>Select Loan Officer</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAwareL}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Dashboard'}
          infoMessage={infoMessage}
          leftImg={IMAGES.IC_HEADER_SETTING}
          leftClick={() => props.toggleSettingOption(!props.showOptions)}
          // rightTwoClick={() => ShareFile()}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        <ScrollView>
          {isAvailable ? renderOfficer() : selectOfficer()}
          <View style={styles.optionContainer}>
            <FlatList
              scrollEnabled={false}
              data={dashboardList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.containStyle}
              renderItem={({ item }) => renderItem(item)}
            />
          </View>
        </ScrollView>

        <COMPONENT.Loader isLoading={props.loading} />
        {readMorePopup()}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  showOptions: state.common.showOptions,
  userData: state.auth.userData,
  assignedloData: state.dashboard_bo.assignedloData,
  loading: state.dashboard_bo.loading,
  dashboardList: state.dashboard_bo.dashboardList,
  colorScheme: state.dashboard_bo.colorScheme,
  chatID: state.user.chatID,
  infoMessages: state.auth.infoMessages,
  infoMessageError: state.auth.infoMessageError,
});

export default connect(mapStateToProps, {
  toggleSettingOption,
  setScanRedirect,
  getLOOfficers,
  getAssignedLO,
  clearAssignData,
  getColorScheme,
  referDeepLink,
  clearChatDocumentData,
  saveDeviceToken,
  getChatID,
  clearChatIDData,
  getInfoMessage,
})(DashboardLO);
