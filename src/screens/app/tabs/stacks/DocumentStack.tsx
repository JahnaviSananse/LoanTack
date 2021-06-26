import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DocumentLO from 'src/screens/app/DocumentLO'
import DocumentDetailLO from 'src/screens/app/DocumentDetailLO'
import NotificationLO from 'src/screens/app/NotificationLO'

const Stack = createStackNavigator();

export const DocumentStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DocumentLO" component={DocumentLO} />
    <Stack.Screen name="DocumentDetailLO" component={DocumentDetailLO} />
    <Stack.Screen name="NotificationLO" component={NotificationLO} />
  </Stack.Navigator>
);
