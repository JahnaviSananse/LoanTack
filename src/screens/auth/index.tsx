import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { navigationRef } from 'src/routes/router';
import BOTabs from 'src/screens/app/BOTabs';
import GuestTabs from '../app/GuestTabs';
import { App } from '../app/tabs/index';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import ResetPassword from './ResetPassword';
import Signup from './Signup';
import Splash from './Splash';
import VerificationCode from './VerificationCode';
import WalkthroughBO from './WalkthroughBO';
import WalkthroughLO from './WalkthroughLO';

const Stack = createStackNavigator();

function StackScreen() {
  return (
    <Stack.Navigator initialRouteName="Splash" headerMode={'none'}>
      {/* <Stack.Screen name="EditMenuBO" component={EditMenuBO} /> */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="WalkthroughBO" component={WalkthroughBO} />
      <Stack.Screen name="WalkthroughLO" component={WalkthroughLO} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="LoanTackTabsBO" component={BOTabs} />
      <Stack.Screen name="GuestTabs" component={GuestTabs} />
      <Stack.Screen name="LoanTackTabs" component={App} />
    </Stack.Navigator>
  );
}

export const Auth = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={StackScreen}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
);

export const LoanTackTabs = () => (
  <NavigationContainer ref={navigationRef}>{/* <App /> */}</NavigationContainer>
);
