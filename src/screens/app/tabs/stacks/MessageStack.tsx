import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChatLO from 'src/screens/app/ChatLO';
import MessageLO from 'src/screens/app/MessageLO';
import NotificationLO from 'src/screens/app/NotificationLO';
import SelectLO from 'src/screens/app/SelectLO';

const Stack = createStackNavigator();

export const MessageStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Home'}>
      <Stack.Screen name="MessageLO" component={MessageLO} />
      <Stack.Screen name="ChatLO" component={ChatLO} />
      <Stack.Screen name="SelectLO" component={SelectLO} />
      <Stack.Screen name="NotificationLO" component={NotificationLO} />
    </Stack.Navigator>
  );
};
