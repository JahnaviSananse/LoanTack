import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import Image from 'src/components/Image';

import React, { useEffect } from 'react';
import * as IMAGES from 'src/assets/images';
import * as CONSTANT from 'src/constants/constant';
import DashboardLO from 'src/screens/app/DashboardLO';
import DocumentLO from 'src/screens/app/DocumentLO';
import DocumentDetailLO from 'src/screens/app/DocumentDetailLO';
import NotificationLO from 'src/screens/app/NotificationLO';
import MessageLO from 'src/screens/app/MessageLO';
import ChatLO from 'src/screens/app/ChatLO';
import SelectLO from 'src/screens/app/SelectLO';
import SettingLO from 'src/screens/app/SettingLO';
import ProfileLO from 'src/screens/app/ProfileLO';
import ChangePasswordLO from 'src/screens/app/ChangePasswordLO';
import NotificationSettingLO from 'src/screens/app/NotificationSettingLO';
import ConventionalPurchaseBO from 'src/screens/app/ConventionalPurchaseBO';
import Webview from 'src/screens/app/Webview';

function getTabBarVisible(route) {
  if (route.state && route.state.index > 0) {
    return false;
  } else {
    return true;
  }
}

const SettingStack = createStackNavigator();
function SettingComponent() {
  return (
    <SettingStack.Navigator
      initialRouteName="SettingLO"
      screenOptions={{
        headerShown: false,
      }}
      headerMode={'screen'}
    >
      <SettingStack.Screen
        name="SettingLO"
        component={SettingLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'SettingLO',
          };
        }}
      />
      <SettingStack.Screen
        name="ProfileLO"
        component={ProfileLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'ProfileLO',
          };
        }}
      />
      <SettingStack.Screen
        name="ChangePasswordLO"
        component={ChangePasswordLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'ChangePasswordLO',
          };
        }}
      />
      <SettingStack.Screen
        name="NotificationSettingLO"
        component={NotificationSettingLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'NotificationSettingLO',
          };
        }}
      />
      <SettingStack.Screen
        name="NotificationLO"
        component={NotificationLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'NotificationLO',
          };
        }}
      />
      <SettingStack.Screen
        name="ConventionalPurchase"
        component={ConventionalPurchaseBO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'Conventional Purchase',
          };
        }}
      />
    </SettingStack.Navigator>
  );
}

const MessageStack = createStackNavigator();
function MessageComponent() {
  return (
    <MessageStack.Navigator
      initialRouteName="MessageLO"
      screenOptions={{
        headerShown: false,
      }}
      headerMode={'screen'}
    >
      <MessageStack.Screen
        name="MessageLO"
        component={MessageLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'MessageLO',
          };
        }}
      />
      <MessageStack.Screen
        name="ChatLO"
        component={ChatLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'ChatLO',
          };
        }}
      />
      <MessageStack.Screen
        name="SelectLO"
        component={SelectLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'SelectLO',
          };
        }}
      />
      <MessageStack.Screen
        name="NotificationLO"
        component={NotificationLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'NotificationLO',
          };
        }}
      />
    </MessageStack.Navigator>
  );
}

const DashboardStack = createStackNavigator();
function DashboardComponent() {
  return (
    <DashboardStack.Navigator
      initialRouteName="DashboardLO"
      screenOptions={{
        headerShown: false,
      }}
      headerMode={'screen'}
    >
      <DashboardStack.Screen
        name="Profile"
        component={DashboardLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'Dashboard',
          };
        }}
      />
      <DashboardStack.Screen
        name="NotificationLO"
        component={NotificationLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'NotificationLO',
          };
        }}
      />
    </DashboardStack.Navigator>
  );
}

const DocumentStack = createStackNavigator();
function DocumentComponent() {
  return (
    <DocumentStack.Navigator
      initialRouteName="Document"
      screenOptions={{
        headerShown: false,
      }}
      headerMode={'screen'}
    >
      <DocumentStack.Screen
        name="DocumentLO"
        component={DocumentLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'DocumentLO',
          };
        }}
      />
      <DocumentStack.Screen
        name="DocumentDetailLO"
        component={DocumentDetailLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'DocumentDetailLO',
          };
        }}
      />
      <DocumentStack.Screen
        name="NotificationLO"
        component={NotificationLO}
        options={({ route }) => {
          return {
            headerBackTitle: '',
            headerTitle: 'NotificationLO',
          };
        }}
      />
    </DocumentStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export const App = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#4FB263',
        inactiveTintColor: '#8D8E90',
        style: {
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          height: CONSTANT.IS_IPHONEX ? 100 : 70,
          backgroundColor: '#1F2428',
        },
        labelPosition: 'below-icon',
        labelStyle: {
          fontFamily: 'Arial',
          fontWeight: 'bold',
          fontSize: 12,
          // paddingTop: 5,
          paddingBottom: 8,
          textAlign: 'center',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardComponent}
        options={({ route }) => ({
          tabBarLabel: 'Dashboard',
          tabBarVisible: getTabBarVisible(route),
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={
                focused
                  ? IMAGES.IC_TAB_DASHBOARD_SELECTED
                  : IMAGES.IC_TAB_DASHBOARD
              }
              resizeMode={'contain'}
              style={{ height: 25, width: 25 }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Message"
        component={MessageComponent}
        options={({ route }) => ({
          tabBarLabel: 'Message',
          tabBarVisible: getTabBarVisible(route),
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={
                focused ? IMAGES.IC_TAB_MESSAGE_SELECTED : IMAGES.IC_TAB_MESSAGE
              }
              resizeMode={'contain'}
              style={{ height: 25, width: 25 }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Documents"
        component={DocumentComponent}
        options={({ route }) => ({
          tabBarLabel: 'Documents',
          tabBarVisible: getTabBarVisible(route),
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={
                focused
                  ? IMAGES.IC_TAB_DOCUMENT_SELECTED
                  : IMAGES.IC_TAB_DOCUMENT
              }
              resizeMode={'contain'}
              style={{ height: 25, width: 25 }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingComponent}
        options={({ route }) => ({
          tabBarLabel: 'Settings',
          tabBarVisible: getTabBarVisible(route),
          tabBarIcon: ({ color, size, focused }) => (
            <Image
              source={
                focused ? IMAGES.IC_TAB_SETTING_SELECTED : IMAGES.IC_TAB_SETTING
              }
              resizeMode={'contain'}
              style={{ height: 25, width: 25 }}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
