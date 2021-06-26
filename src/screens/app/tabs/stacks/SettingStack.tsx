import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SettingLO from 'src/screens/app/SettingLO'
import ProfileLO from 'src/screens/app/ProfileLO'
import ChangePasswordLO from 'src/screens/app/ChangePasswordLO'
import NotificationSettingLO from 'src/screens/app/NotificationSettingLO'
import NotificationLO from 'src/screens/app/NotificationLO'
import ConventionalPurchase from 'src/screens/app/ConventionalPurchase'

const Stack = createStackNavigator();

export const SettingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SettingLO" component={SettingLO} />
    <Stack.Screen name="ProfileLO" component={ProfileLO} />
    <Stack.Screen name="ChangePasswordLO" component={ChangePasswordLO} />
    <Stack.Screen name="NotificationSettingLO" component={NotificationSettingLO} />
    <Stack.Screen name="NotificationLO" component={NotificationLO} />
    <Stack.Screen name="ConventionalPurchase" component={ConventionalPurchase} />
  </Stack.Navigator>
);


