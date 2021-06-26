import dynamicLinks from '@react-native-firebase/dynamic-links';
import React from 'react';
import { connect } from 'react-redux';
import * as COMPONENT from 'src/components';
import { IReduxState } from 'src/redux/reducers';
import { Auth } from '../auth';

interface IProps {
  userData: any;
  assignedloData: any;
}
const Root = (props: IProps) => {
  console.disableYellowBox = true;
  console.disableYellowBox = true;

  const handleDynamicLink = (link: any) => {
    // Handle dynamic link inside your own application
    // console.log('Links', link);
    if (link !== null && link.url !== '') {
      // console.log(link.url);
    }
    if (link.url === 'https://www.creolestudios.com') {
      // ...navigate to your offers screen
    }
  };

  React.useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  // // useEffect(() => {
  // //   dynamicLinks()
  // //     .getInitialLink()
  // //     .then((link) => {
  // //       if (link !== null && link.url !== '') {
  // //         console.log('Link ', link);
  // //       }
  // //       if (link?.url === 'https://www.creolestudios.com') {
  // //         // ...set initial route as offers screen
  // //       }
  // //     });
  // // }, []);

  // const handleNavigation = (message: any) => {
  //   //handle navigation
  //   // console.log('Comming');
  //   setTimeout(() => {
  //     if (props.userData) {
  //       if (props.userData?.role === 2) {
  //         // navigationRef.current?.navigate('MessageLO');
  //         navigationRef.current?.navigate('MessageScreen', {
  //           screen: 'MessageLO',
  //           params: {
  //             isBack: true,
  //             name: props.assignedloData?.data?.name,
  //           },
  //         });
  //       } else {
  //         navigationRef.current?.navigate('MessageScreen', {
  //           screen: 'ChatLO',
  //           params: {
  //             isBack: true,
  //             name: props.assignedloData?.data?.name,
  //           },
  //         });
  //       }
  //     }
  //   }, 5000);
  // console.log('Handle Navigation', message);
  // };

  //get token
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
  // //Handle Push Notification
  // React.useEffect(() => {
  //   checkPermission();
  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     // console.log('Message handled in the background!', remoteMessage);
  //     // console.log('mes');
  //     handleNavigation(remoteMessage);
  //   });

  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     // console.log(
  //     //   'Notification caused app to open from background state:',
  //     //   remoteMessage,
  //     // );
  //     handleNavigation(remoteMessage);
  //   });

  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         // console.log(
  //         //   'Notification caused app to open from quit state:',
  //         //   remoteMessage,
  //         // );
  //         handleNavigation(remoteMessage);
  //       }
  //     });

  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     // console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     //Handle foreground messages
  //     displayNotification(remoteMessage);
  //   });

  //   return unsubscribe;
  // }, []);

  // //new push notification code
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

  return (
    <>
      <COMPONENT.InfoPopup />
      <Auth />
    </>
  );
};
// export default Root;
const mapStateToProps = (state: IReduxState) =>
  // console.log('Root ===>', state),
  ({
    userData: state.auth.userData,
    access_token: state.auth.access_token,
    assignedloData: state.dashboard_bo.assignedloData,
    // access_token: "",
  });

export default connect(mapStateToProps, {})(Root);
