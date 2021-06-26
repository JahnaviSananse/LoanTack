import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Profile from 'src/screens/app/Profile';
import ViewOffer from 'src/screens/app/ViewOffer';
import { MoreStackParams } from './moreStack';

const Stack = createStackNavigator<MoreStackParams>();

export const MoreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="ViewOffer" component={ViewOffer} />
  </Stack.Navigator>
);
