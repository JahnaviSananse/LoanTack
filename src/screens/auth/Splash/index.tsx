import dynamicLinks from '@react-native-firebase/dynamic-links';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  // AppState,
  AsyncStorage,
  Dimensions,
  Modal,
  // Platform,
  // PushNotificationIOS,
  Text,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import RNRestart from 'react-native-restart';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import Image from 'src/components/Image';
import * as CONSTANT from 'src/constants/constant';
import { setLoginData } from 'src/redux/actions/auth';
import {
  getColorScheme,
  getDashboardList,
  getMainList,
} from 'src/redux/actions/dashboard_bo';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';

const progressCustomStyles = {
  backgroundColor: '#F48020',
  borderColor: 'black',
};
interface ISplashProps {
  getMainList: Function;
  getDashboardList: Function;
  getColorScheme: Function;
  setLoginData: Function;
  colorScheme: any;
}
const Splash = (props: ISplashProps) => {
  const navigation = useNavigation();
  const [progressWithOnComplete, setprogressWithOnComplete] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [red, setRedirect] = React.useState('');
  // const [dLink, setDLink] = React.useState('');

  // useEffect(() => {
  //   AppState.addEventListener('change', _handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener('change', _handleAppStateChange);
  //   };
  // }, []);

  // const _handleAppStateChange = (nextAppState: any) => {
  //   if (
  //     (Platform.OS === 'ios' && nextAppState === 'active') ||
  //     nextAppState === 'background'
  //   ) {
  //     PushNotificationIOS.setApplicationIconBadgeNumber(0);
  //   }
  // };
  // React.useEffect(() => {
  //   if (props.colorScheme) {
  //     nav();
  //   }
  // }, [props.colorScheme]);

  // function nav() {
  //   navigation.reset({
  //     routes: [{ name: red }],
  //     param: { isFirst: true },
  //   });
  // }
  React.useEffect(() => {
    AsyncStorage.setItem(CONSTANT.IS_GUEST, 'false');
    let data = AsyncStorage.getItem(CONSTANT.USER_DATA);
    let isFirstTime = AsyncStorage.getItem(CONSTANT.IS_FIRST_TIME);
    let isAvailable = 'no';
    AsyncStorage.getItem(CONSTANT.IS_DEEPLINK_DONE)
      .then((res: any) => {
        console.log('IS Done', res);
        if (res !== 'true') {
          console.log('INsode');
          checkDynamicLinkID();
        }
      })
      .catch(() => {
        // AsyncStorage.setItem(CONSTANT.IS_DEEPLINK_DONE, 'false')
        checkDynamicLinkID();
      });

    AsyncStorage.getItem(CONSTANT.IS_TOKEN_AVAILABLE).then((response: any) => {
      isAvailable = response;
      console.log('Is Available', isAvailable, response);
    });
    setTimeout(() => {
      if (data) {
        console.log('DAta', true);

        data.then(function (result) {
          console.log('Result data', result, isAvailable);
          if (result) {
            console.log('Result ', true);
            let response = JSON.parse(result);
            let role = response.data.user.role;
            setRedirect(role === 2 ? 'LoanTackTabs' : 'LoanTackTabsBO');
            let emailVerified = response.data.email_verified;

            if (emailVerified && isAvailable === 'yes') {
              let redirect = role === 2 ? 'LoanTackTabs' : 'LoanTackTabsBO';
              if (role === 2) {
                navigation.reset({
                  routes: [{ name: 'LoanTackTabs' }],
                  param: { isFirst: true },
                });
                props.setLoginData(response);
              } else {
                props.getMainList();
                props.getColorScheme('LoanTackTabsBO');

                props.setLoginData(response);
                props.getDashboardList();
              }
              // props.getColorScheme();
              // let redirect = role === 2 ? 'LoanTackTabs' : 'LoanTackTabsBO';
              // setRedirect(redirect);
              setTimeout(() => {
                // props.getMainList();
                // props.getDashboardList();
                // navigation.reset({
                //   routes: [{ name: redirect }],
                //   param: { isFirst: true },
                // });
              }, 500);
            } else {
              navigation.reset({
                routes: [{ name: 'Login' }],
              });
            }
          } else {
            if (isFirstTime) {
              isFirstTime.then(function (result) {
                if (result === null) {
                  navigation.reset({
                    routes: [{ name: 'WalkthroughBO' }],
                  });
                } else {
                  navigation.reset({
                    routes: [{ name: 'Login' }],
                  });
                }
              });
            } else {
              navigation.reset({
                routes: [{ name: 'WalkthroughBO' }],
              });
            }
          }
        });
      } else {
        if (isFirstTime) {
          isFirstTime.then(function (result) {
            if (result) {
              navigation.reset({
                routes: [{ name: 'Login' }],
              });
            }
          });
        } else {
          navigation.reset({
            routes: [{ name: 'WalkthroughBO' }],
          });
        }
      }
    }, 2000);
    checkUpdate();
  }, []);

  const checkDynamicLinkID = () => {
    AsyncStorage.getItem(CONSTANT.DEEPLINK_ID)
      .then((res: any) => {
        console.log('Deep ID Splash', res);
        if (res === null || res === '') {
          getDynamicLink();
        }
      })
      .catch(() => {
        getDynamicLink();
      });
  };
  const getDynamicLink = () => {
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        if (link !== null && link.url !== '') {
          console.log('Deep ID Main Splash', link);
          let loID: any = link.url.split('/').pop();
          AsyncStorage.setItem(CONSTANT.DEEPLINK_URL, link.url);
          AsyncStorage.setItem(CONSTANT.DEEPLINK_ID, loID);
          AsyncStorage.setItem(CONSTANT.IS_DEEPLINK_DONE, 'false');
          // props.referDeepLink({
          //   referred_by: parseInt(loID),
          //   referred_to: parseInt(props.userData?.id),
          //   meta_data: {
          //     data: 'extra-data',
          //   },
          // });
        } else {
          console.log('D Link null', link);
          AsyncStorage.setItem(CONSTANT.DEEPLINK_URL, '');
          AsyncStorage.setItem(CONSTANT.DEEPLINK_ID, '');
          AsyncStorage.setItem(CONSTANT.IS_DEEPLINK_DONE, 'false');
        }
      })
      .catch((e) => {
        console.log('Catch D Link', e);
        AsyncStorage.setItem(CONSTANT.DEEPLINK_URL, '');
        AsyncStorage.setItem(CONSTANT.DEEPLINK_ID, '');
        AsyncStorage.setItem(CONSTANT.IS_DEEPLINK_DONE, 'false');
      });
  };

  const renderModal = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.box}>
            <Text style={styles.downloadText}>Downloading</Text>
            <View style={styles.progressContainer}>
              <ProgressBarAnimated
                {...progressCustomStyles}
                width={Dimensions.get('screen').width * 0.8}
                value={progressWithOnComplete}
                onComplete={() => {
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const checkUpdate = () => {
    CodePush.sync(
      { updateDialog: true },
      (status) => {
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            setModalVisible(true);
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            RNRestart.Restart();
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        let total = totalBytes;
        let received = receivedBytes;
        let percentage = (received / total) * 100;
        setprogressWithOnComplete(percentage);
      },
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.splashContainer}>
        <Image
          resizeMode={'stretch'}
          source={IMAGES.IC_SPLASH}
          style={styles.splash}
        />
      </View>
      <View style={styles.logoContainer}>
        <Image
          resizeMode={'contain'}
          source={IMAGES.IC_LOGO}
          style={styles.logo}
        />
      </View>
      {renderModal()}
    </View>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  colorScheme: state.dashboard_bo.colorScheme,
});

export default connect(mapStateToProps, {
  getMainList,
  getDashboardList,
  getColorScheme,
  setLoginData,
})(Splash);
