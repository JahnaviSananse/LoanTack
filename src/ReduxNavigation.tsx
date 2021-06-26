import React from 'react';
import { BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import {connect} from 'react-redux';
// import AppNavigator from '../src/appRouteConfig';
import {
  setJSExceptionHandler,
  getJSExceptionHandler,
} from 'react-native-exception-handler';
// import { createReduxContainer } from 'react-navigation-redux-helpers';

// const App = createReduxContainer(AppNavigator);

const reporter = (error: any) => {
  // Logic for reporting to devs
  // Example : Log issues to github issues using github apis.
  console.log(error); // sample
};
const errorHandler = (e: any, isFatal: any) => {
  if (isFatal) {
    reporter(e);
    Alert.alert(
      'Unexpected error occurred',
      `
          Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}
   
          We have reported this to our team ! Please close the app and start again!
          `,
      [
        {
          text: 'Close',
          onPress: () => { },
        },
      ],
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

setJSExceptionHandler(errorHandler, true);

interface IProps {
  dispatch: any;
}

const ReduxNavigation = (props: IProps) => {
  console.disableYellowBox = true;
  const navigation = useNavigation();

  // const onBackPress = () => {
  //     const { dispatch } = props;
  //     if (nav.index === 0) {
  //         Alert.alert(
  //             'Exit App',
  //             'Exiting the application?', [{
  //                 text: 'Cancel',
  //                 onPress: () => console.log('Cancel Pressed'),
  //                 style: 'cancel'
  //             }, {
  //                 text: 'OK',
  //                 onPress: () => BackHandler.exitApp()
  //             },], {
  //             cancelable: false
  //         }
  //         )
  //         return true;
  //     } else {
  //         dispatch(navigation.goBack());
  //         return true;
  //     }
  // };
};

export default ReduxNavigation;
