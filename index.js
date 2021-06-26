// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

/**
 * @format
 */
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import { AppRegistry, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { store } from 'src/redux/index';
import App from './App';
import { name as appName } from './app.json';

// Register background handler
/* eslint-disable no-unused-vars */
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // console.log('Message handled in the background!', remoteMessage);
  // console.log('csf');
});
/* eslint-enable no-unused-vars */

const firebaseConfig = {
  apiKey: 'AIzaSyDzjatqIVAsmeTZ33GtytCQ4_2IyqxeL5s',
  databaseURL: 'https://loantack.firebaseio.com',
};

let LoanTack = () => {
  useEffect(() => {
    // firebase.initializeApp(firebaseConfig);
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
  }, []);
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => LoanTack);
YellowBox.ignoreWarnings([
  'Warning: Async Storage has been extracted from react-native core',
]);
