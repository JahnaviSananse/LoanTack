import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Image from 'src/components/Image';
import * as COLORS from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';
import {
  setCutomLink,
  setGuest,
  setScanRedirect,
} from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import AffordabilityBO from 'src/screens/app/AffordabilityBO';
import AffordabilityResult from 'src/screens/app/AffordabilityResult';
import Amortization from 'src/screens/app/Amortization';
import BioBO from 'src/screens/app/BioBO';
import CalculatorBO from 'src/screens/app/CalculatorBO';
import CallbackBO from 'src/screens/app/CallbackBO';
import ChangePasswordLO from 'src/screens/app/ChangePasswordLO';
import ChatLO from 'src/screens/app/ChatLO';
import ChecklistBO from 'src/screens/app/ChecklistBO';
import ConventionalPurchaseBO from 'src/screens/app/ConventionalPurchaseBO';
import ConventionalRefinanceBO from 'src/screens/app/ConventionalRefinanceBO';
import DashboardBO from 'src/screens/app/DashboardBO';
import DisclaimerBO from 'src/screens/app/DisclaimerBO';
import EditMenuBO from 'src/screens/app/EditMenuBO';
import FHAPurchaseBO from 'src/screens/app/FHAPurchaseBO';
import FHARefinanceBO from 'src/screens/app/FHARefinanceBO';
import GlossaryBO from 'src/screens/app/GlossaryBO';
import GuideBO from 'src/screens/app/GuideBO';
import JumboPurchaseBO from 'src/screens/app/JumboPurchaseBO';
import JumboRefinanceBO from 'src/screens/app/JumboRefinanceBO';
import LearningCenterBO from 'src/screens/app/LearningCenterBO';
import LoanProgramsBO from 'src/screens/app/LoanProgramsBO';
import MessageLO from 'src/screens/app/MessageLO';
import NotificationLO from 'src/screens/app/NotificationLO';
import PrivacyPolicyBO from 'src/screens/app/PrivacyPolicyBO';
import PurchaseBO from 'src/screens/app/PurchaseBO';
import RefinanceBO from 'src/screens/app/RefinanceBO';
import RefinanceResult from 'src/screens/app/RefinanceResult';
import ResultBO from 'src/screens/app/ResultBO';
import ResultDetailBO from 'src/screens/app/ResultDetailBO';
import SavedCalculationBO from 'src/screens/app/SavedCalculationBO';
import ScanDocumentBO from 'src/screens/app/ScanDocumentBO';
import ScanedDocumentBO from 'src/screens/app/ScanedDocumentBO';
import SelectLO from 'src/screens/app/SelectLO';
import SettingBO from 'src/screens/app/SettingBO';
import ShouldIRefinanceBO from 'src/screens/app/ShouldIRefinanceBO';
import UploadedDocumentBO from 'src/screens/app/UploadedDocumentBO';
import USDAPurchaseBO from 'src/screens/app/USDAPurchaseBO';
import USDARefinanceBO from 'src/screens/app/USDARefinanceBO';
import UserDetailBO from 'src/screens/app/UserDetailBO';
import VAPurchaseBO from 'src/screens/app/VAPurchaseBO';
import VARefinanceBO from 'src/screens/app/VARefinanceBO';
import Webview from 'src/screens/app/Webview';
import Login from 'src/screens/auth/Login';
import LearningCenterDetailBO from '../LearningCenterDetailBO';
import LoanProgramsDetailBO from '../LoanProgramsDetailBO';
import ScanDocumentGetStartBO from '../ScanDocumentGetStartBO';
import styles from './styles';

let customLink = '';

const settingStack = createStackNavigator();
export const settingScreen = () => {
  return (
    <settingStack.Navigator initialRouteName="SettingBO" headerMode={'none'}>
      <settingStack.Screen name="SettingBO" component={SettingBO} />
      <settingStack.Screen
        name="ChangePasswordLO"
        component={ChangePasswordLO}
      />
      <settingStack.Screen name="EditMenuBO" component={EditMenuBO} />
      <settingStack.Screen name="UserDetailBO" component={UserDetailBO} />
      <settingStack.Screen name="DisclaimerBO" component={DisclaimerBO} />
      <settingStack.Screen name="PrivacyPolicyBO" component={PrivacyPolicyBO} />
      <settingStack.Screen name="Login" component={Login} />
      {/* stack screens */}
      <settingStack.Screen
        name="CalculatorScreen"
        component={CalculatorScreen}
      />
      <settingStack.Screen name="ScanScreen" component={ScanScreen} />
      <settingStack.Screen
        name="UploadedDocumentScreen"
        component={UploadedDocumentScreen}
      />
      <settingStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <settingStack.Screen
        name="SavedCalculationScreen"
        component={SavedCalculationScreen}
      />
    </settingStack.Navigator>
  );
};

const CallbackStack = createStackNavigator();
export const CallbackScreen = () => {
  return (
    <CallbackStack.Navigator initialRouteName="CallbackBO" headerMode={'none'}>
      <CallbackStack.Screen name="CallbackBO" component={CallbackBO} />
      <CallbackStack.Screen name="EditMenuBO" component={EditMenuBO} />
      <CallbackStack.Screen name="SettingBO" component={SettingBO} />
      <CallbackStack.Screen
        name="ChangePasswordLO"
        component={ChangePasswordLO}
      />
      <CallbackStack.Screen name="UserDetailBO" component={UserDetailBO} />
      <CallbackStack.Screen name="DisclaimerBO" component={DisclaimerBO} />
      <CallbackStack.Screen
        name="PrivacyPolicyBO"
        component={PrivacyPolicyBO}
      />
      {/* stack screens */}
      <CallbackStack.Screen
        name="CalculatorScreen"
        component={CalculatorScreen}
      />
      <CallbackStack.Screen name="ScanScreen" component={ScanScreen} />
      <CallbackStack.Screen
        name="UploadedDocumentScreen"
        component={UploadedDocumentScreen}
      />
      <CallbackStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <CallbackStack.Screen name="settingScreen" component={settingScreen} />
      <CallbackStack.Screen
        name="SavedCalculationScreen"
        component={SavedCalculationScreen}
      />
      <CallbackStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
      />
    </CallbackStack.Navigator>
  );
};

const ChecklistStack = createStackNavigator();
export const ChecklistScreen = () => {
  return (
    <ChecklistStack.Navigator
      initialRouteName="ChecklistBO"
      headerMode={'none'}
    >
      <ChecklistStack.Screen name="ChecklistBO" component={ChecklistBO} />
      <ChecklistStack.Screen name="EditMenuBO" component={EditMenuBO} />
      <ChecklistStack.Screen name="SettingBO" component={SettingBO} />
      <ChecklistStack.Screen
        name="ChangePasswordLO"
        component={ChangePasswordLO}
      />
      <ChecklistStack.Screen name="UserDetailBO" component={UserDetailBO} />
      <ChecklistStack.Screen name="DisclaimerBO" component={DisclaimerBO} />
      <ChecklistStack.Screen
        name="PrivacyPolicyBO"
        component={PrivacyPolicyBO}
      />
      {/* stack screens */}
      <ChecklistStack.Screen
        name="CalculatorScreen"
        component={CalculatorScreen}
      />
      <ChecklistStack.Screen name="ScanScreen" component={ScanScreen} />
      <ChecklistStack.Screen
        name="UploadedDocumentScreen"
        component={UploadedDocumentScreen}
      />
      <ChecklistStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <ChecklistStack.Screen name="settingScreen" component={settingScreen} />
      <ChecklistStack.Screen
        name="SavedCalculationScreen"
        component={SavedCalculationScreen}
      />
    </ChecklistStack.Navigator>
  );
};

const SavedCalStack = createStackNavigator();
export const SavedCalculationScreen = () => {
  return (
    <SavedCalStack.Navigator
      initialRouteName="SavedCalculationBO"
      headerMode={'none'}
    >
      <SavedCalStack.Screen
        name="SavedCalculationBO"
        component={SavedCalculationBO}
      />
      <SavedCalStack.Screen name="EditMenuBO" component={EditMenuBO} />
      <SavedCalStack.Screen
        name="UploadedDocumentBO"
        component={UploadedDocumentBO}
      />
      <SavedCalStack.Screen name="SettingBO" component={SettingBO} />
      <SavedCalStack.Screen
        name="ChangePasswordLO"
        component={ChangePasswordLO}
      />
      <SavedCalStack.Screen name="UserDetailBO" component={UserDetailBO} />
      <SavedCalStack.Screen name="DisclaimerBO" component={DisclaimerBO} />
      <SavedCalStack.Screen
        name="PrivacyPolicyBO"
        component={PrivacyPolicyBO}
      />

      {/* stack screens */}
      <SavedCalStack.Screen
        name="CalculatorScreen"
        component={CalculatorScreen}
      />
      <SavedCalStack.Screen name="ScanScreen" component={ScanScreen} />
      <SavedCalStack.Screen
        name="UploadedDocumentScreen"
        component={UploadedDocumentScreen}
      />
      <SavedCalStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <SavedCalStack.Screen name="settingScreen" component={settingScreen} />
    </SavedCalStack.Navigator>
  );
};

const NotificationStack = createStackNavigator();
export const NotificationScreen = () => {
  return (
    <NotificationStack.Navigator
      initialRouteName="NotificationLO"
      headerMode={'none'}
    >
      <NotificationStack.Screen
        name="NotificationLO"
        component={NotificationLO}
      />
      <NotificationStack.Screen name="EditMenuBO" component={EditMenuBO} />
      <NotificationStack.Screen name="SettingBO" component={SettingBO} />
      <NotificationStack.Screen
        name="ChangePasswordLO"
        component={ChangePasswordLO}
      />
      <NotificationStack.Screen name="UserDetailBO" component={UserDetailBO} />
      <NotificationStack.Screen name="DisclaimerBO" component={DisclaimerBO} />
      <NotificationStack.Screen
        name="PrivacyPolicyBO"
        component={PrivacyPolicyBO}
      />
      {/* stack screens */}
      <NotificationStack.Screen
        name="CalculatorScreen"
        component={CalculatorScreen}
      />
      <NotificationStack.Screen name="ScanScreen" component={ScanScreen} />
      <NotificationStack.Screen
        name="UploadedDocumentScreen"
        component={UploadedDocumentScreen}
      />
      <NotificationStack.Screen
        name="settingScreen"
        component={settingScreen}
      />
      <NotificationStack.Screen
        name="SavedCalculationScreen"
        component={SavedCalculationScreen}
      />
    </NotificationStack.Navigator>
  );
};

const MessageStack = createStackNavigator();
export const MessageScreen = (chatId?: string) => {
  return (
    <MessageStack.Navigator initialRouteName="ChatLO" headerMode={'none'}>
      {/* <MessageStack.Screen name="ChatMessages" component={ChatMessages} /> */}
      <MessageStack.Screen
        name="ChatLO"
        component={ChatLO}
        initialParams={{ chatId }}
      />
      <MessageStack.Screen name="MessageLO" component={MessageLO} />
      <MessageStack.Screen name="SelectLO" component={SelectLO} />
      <MessageStack.Screen name="EditMenuBO" component={EditMenuBO} />
      <MessageStack.Screen name="SettingBO" component={SettingBO} />
      <MessageStack.Screen
        name="ChangePasswordLO"
        component={ChangePasswordLO}
      />
      <MessageStack.Screen name="UserDetailBO" component={UserDetailBO} />
      <MessageStack.Screen name="DisclaimerBO" component={DisclaimerBO} />
      <MessageStack.Screen name="PrivacyPolicyBO" component={PrivacyPolicyBO} />
      {/* stack screens */}
      <MessageStack.Screen
        name="CalculatorScreen"
        component={CalculatorScreen}
      />
      <MessageStack.Screen name="ScanScreen" component={ScanScreen} />
      <MessageStack.Screen
        name="UploadedDocumentScreen"
        component={UploadedDocumentScreen}
      />
      <MessageStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <MessageStack.Screen name="settingScreen" component={settingScreen} />
      <MessageStack.Screen
        name="SavedCalculationScreen"
        component={SavedCalculationScreen}
      />
    </MessageStack.Navigator>
  );
};

const GuildStack = createStackNavigator();
const GuildScreen = () => {
  return (
    <GuildStack.Navigator initialRouteName="GuideBO" headerMode={'none'}>
      <GuildStack.Screen name="GuideBO" component={GuideBO} />
      <GuildStack.Screen name="EditMenuBO" component={EditMenuBO} />
      <GuildStack.Screen name="LearningCenterBO" component={LearningCenterBO} />
      <GuildStack.Screen name="LoanProgramsBO" component={LoanProgramsBO} />
      <GuildStack.Screen
        name="LearningCenterDetailBO"
        component={LearningCenterDetailBO}
      />
      <GuildStack.Screen
        name="LoanProgramsDetailBO"
        component={LoanProgramsDetailBO}
      />
      <GuildStack.Screen name="GlossaryBO" component={GlossaryBO} />
      <GuildStack.Screen name="SettingBO" component={SettingBO} />
      <GuildStack.Screen name="ChangePasswordLO" component={ChangePasswordLO} />
      <GuildStack.Screen name="UserDetailBO" component={UserDetailBO} />
      <GuildStack.Screen name="DisclaimerBO" component={DisclaimerBO} />
      <GuildStack.Screen name="PrivacyPolicyBO" component={PrivacyPolicyBO} />
      <GuildStack.Screen
        name="FHAPurchaseBO"
        component={FHAPurchaseBO}
        options={{ gestureEnabled: false }}
      />
      <GuildStack.Screen
        name="ConventionalPurchaseBO"
        component={ConventionalPurchaseBO}
      />
      <GuildStack.Screen name="JumboPurchaseBO" component={JumboPurchaseBO} />
      <GuildStack.Screen name="USDAPurchaseBO" component={USDAPurchaseBO} />
      <GuildStack.Screen name="VAPurchaseBO" component={VAPurchaseBO} />
      {/* <GuildStack.Screen name="ChecklistBO" component={ChecklistBO} /> */}
      {/* stack screens */}
      <GuildStack.Screen name="CalculatorScreen" component={CalculatorScreen} />
      <GuildStack.Screen name="ScanScreen" component={ScanScreen} />
      <GuildStack.Screen
        name="UploadedDocumentScreen"
        component={UploadedDocumentScreen}
      />
      <GuildStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <GuildStack.Screen name="settingScreen" component={settingScreen} />
      <GuildStack.Screen
        name="SavedCalculationScreen"
        component={SavedCalculationScreen}
      />
      <GuildStack.Screen name="ChecklistScreen" component={ChecklistScreen} />
    </GuildStack.Navigator>
  );
};
const uploadStack = createStackNavigator();
const UploadedDocumentScreen = () => {
  return (
    <uploadStack.Navigator
      initialRouteName="UploadedDocumentBO"
      headerMode={'none'}
    >
      <uploadStack.Screen
        name="UploadedDocumentBO"
        component={UploadedDocumentBO}
      />
      <uploadStack.Screen name="EditMenuBO" component={EditMenuBO} />
      <uploadStack.Screen name="SettingBO" component={SettingBO} />
      <uploadStack.Screen
        name="ChangePasswordLO"
        component={ChangePasswordLO}
      />
      <uploadStack.Screen name="UserDetailBO" component={UserDetailBO} />
      <uploadStack.Screen name="DisclaimerBO" component={DisclaimerBO} />
      <uploadStack.Screen name="PrivacyPolicyBO" component={PrivacyPolicyBO} />
      {/* stack screens */}
      <uploadStack.Screen
        name="CalculatorScreen"
        component={CalculatorScreen}
      />
      <uploadStack.Screen name="ScanScreen" component={ScanScreen} />
      <uploadStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <uploadStack.Screen name="settingScreen" component={settingScreen} />
      <uploadStack.Screen
        name="SavedCalculationScreen"
        component={SavedCalculationScreen}
      />
    </uploadStack.Navigator>
  );
};
const ScanStack = createStackNavigator();
const ScanScreen = () => {
  return (
    <ScanStack.Navigator
      initialRouteName="ScanDocumentGetStartBO"
      headerMode={'none'}
    >
      <ScanStack.Screen
        name="ScanDocumentGetStartBO"
        component={ScanDocumentGetStartBO}
      />
      <ScanStack.Screen name="ScanDocumentBO" component={ScanDocumentBO} />
      <ScanStack.Screen name="EditMenuBO" component={EditMenuBO} />
      <ScanStack.Screen name="ScanedDocumentBO" component={ScanedDocumentBO} />
      <ScanStack.Screen name="SettingBO" component={SettingBO} />
      <ScanStack.Screen name="ChangePasswordLO" component={ChangePasswordLO} />
      <ScanStack.Screen name="UserDetailBO" component={UserDetailBO} />
      <ScanStack.Screen name="DisclaimerBO" component={DisclaimerBO} />
      <ScanStack.Screen name="PrivacyPolicyBO" component={PrivacyPolicyBO} />
      {/* stack screens */}
      <ScanStack.Screen name="CalculatorScreen" component={CalculatorScreen} />
      <ScanStack.Screen
        name="UploadedDocumentScreen"
        component={UploadedDocumentScreen}
      />
      <ScanStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <ScanStack.Screen name="settingScreen" component={settingScreen} />
      <ScanStack.Screen
        name="SavedCalculationScreen"
        component={SavedCalculationScreen}
      />
      <ScanStack.Screen name="MessageScreen" component={MessageScreen} />
      <ScanStack.Screen name="DashboardScreen" component={DashboardScreen} />
    </ScanStack.Navigator>
  );
};

const CalStack = createStackNavigator();
const CalculatorScreen = () => {
  return (
    <CalStack.Navigator
      initialRouteName="CalculatorBO"
      headerMode={'none'}
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <CalStack.Screen name="CalculatorBO" component={CalculatorBO} />
      <CalStack.Screen name="EditMenuBO" component={EditMenuBO} />
      <CalStack.Screen
        name="ShouldIRefinanceBO"
        component={ShouldIRefinanceBO}
      />
      <CalStack.Screen name="RefinanceResult" component={RefinanceResult} />
      <CalStack.Screen name="AffordabilityBO" component={AffordabilityBO} />
      <CalStack.Screen
        name="AffordabilityResult"
        component={AffordabilityResult}
      />
      <CalStack.Screen name="PurchaseBO" component={PurchaseBO} />
      <CalStack.Screen name="RefinanceBO" component={RefinanceBO} />
      <CalStack.Screen name="FHARefinanceBO" component={FHARefinanceBO} />
      <CalStack.Screen
        name="ConventionalRefinanceBO"
        component={ConventionalRefinanceBO}
      />
      <CalStack.Screen name="JumboRefinanceBO" component={JumboRefinanceBO} />
      <CalStack.Screen name="USDARefinanceBO" component={USDARefinanceBO} />
      <CalStack.Screen name="VARefinanceBO" component={VARefinanceBO} />
      <CalStack.Screen
        name="FHAPurchaseBO"
        component={FHAPurchaseBO}
        options={{ gestureEnabled: false }}
      />
      <CalStack.Screen
        name="ConventionalPurchaseBO"
        component={ConventionalPurchaseBO}
      />
      <CalStack.Screen name="JumboPurchaseBO" component={JumboPurchaseBO} />
      <CalStack.Screen name="USDAPurchaseBO" component={USDAPurchaseBO} />
      <CalStack.Screen name="VAPurchaseBO" component={VAPurchaseBO} />
      <CalStack.Screen name="SettingBO" component={SettingBO} />
      <CalStack.Screen name="ChangePasswordLO" component={ChangePasswordLO} />
      <CalStack.Screen name="UserDetailBO" component={UserDetailBO} />
      <CalStack.Screen name="DisclaimerBO" component={DisclaimerBO} />
      <CalStack.Screen name="PrivacyPolicyBO" component={PrivacyPolicyBO} />
      <CalStack.Screen name="ResultBO" component={ResultBO} />
      <CalStack.Screen name="Amortization" component={Amortization} />
      <CalStack.Screen name="ResultDetailBO" component={ResultDetailBO} />
      {/* stack screens */}
      <CalStack.Screen name="ScanScreen" component={ScanScreen} />
      <CalStack.Screen
        name="UploadedDocumentScreen"
        component={UploadedDocumentScreen}
      />
      <CalStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <CalStack.Screen name="settingScreen" component={settingScreen} />
      <CalStack.Screen
        name="SavedCalculationScreen"
        component={SavedCalculationScreen}
      />
    </CalStack.Navigator>
  );
};

const DashboardStack = createStackNavigator();
const DashboardScreen = () => {
  return (
    <DashboardStack.Navigator
      initialRouteName="DashboardBO"
      headerMode={'none'}
    >
      <DashboardStack.Screen name="DashboardBO" component={DashboardBO} />
      <DashboardStack.Screen name="BioBO" component={BioBO} />
      <DashboardStack.Screen name="EditMenuBO" component={EditMenuBO} />
      <DashboardStack.Screen name="Webview" component={Webview} />
      {/* stack screens */}
      <DashboardStack.Screen
        name="CalculatorScreen"
        component={CalculatorScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      {/* <DashboardStack.Screen
        name="ScanDocumentGetStartBO"
        component={ScanDocumentGetStartBO}
      />
      <DashboardStack.Screen name="ScanDocumentBO" component={ScanDocumentBO} /> */}
      <DashboardStack.Screen name="MessageScreen" component={MessageScreen} />
      <DashboardStack.Screen name="ScanScreen" component={ScanScreen} />
      <DashboardStack.Screen
        name="UploadedDocumentScreen"
        component={UploadedDocumentScreen}
      />
      <DashboardStack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <DashboardStack.Screen name="settingScreen" component={settingScreen} />
      <DashboardStack.Screen
        name="SavedCalculationScreen"
        component={SavedCalculationScreen}
      />
      {/* <ScanStack.Screen name="MessageScreen" component={MessageScreen} /> */}
      <ScanStack.Screen name="GuildScreen" component={GuildScreen} />
      <ScanStack.Screen name="CallbackScreen" component={CallbackScreen} />
      <ScanStack.Screen name="ChecklistScreen" component={ChecklistScreen} />
    </DashboardStack.Navigator>
  );
};

const webStack = createStackNavigator();
export const WebviewScreen = (title: string) => {
  return (
    <webStack.Navigator initialRouteName="ChatLO" headerMode={'none'}>
      <webStack.Screen
        name="ChatLO"
        component={Webview}
        initialParams={{ url: customLink, title: title }}
      />
    </webStack.Navigator>
  );
};
interface ITabProps {
  allTabs: any;
  setScanRedirect: Function;
  mainlistData: any;
  setCutomLink: Function;
  assignedloData: any;
  userData: any;
  chatID: string;
  setGuest: Function;
}
const GuestTabs = (props: ITabProps) => {
  const navigation = useNavigation();

  const [tabs, setTabs] = React.useState([
    {
      icon: {
        gray: 'http://139.59.65.130:5000/upload/menu_icons/gray/guide.png',
        green: 'http://139.59.65.130:5000/upload/menu_icons/green/guide.png',
        white: 'http://139.59.65.130:5000/upload/menu_icons/white/guide.png',
      },
      id: 'GUIDE',
      name: 'Guide',
      sequence: 5,
      type: 1,
    },
    {
      icon: {
        gray: 'http://139.59.65.130:5000/upload/menu_icons/gray/calculator.png',
        green:
          'http://139.59.65.130:5000/upload/menu_icons/green/calculator.png',
        white:
          'http://139.59.65.130:5000/upload/menu_icons/white/calculator.png',
      },
      id: 'CALCULATOR',
      name: 'Calculator',
      sequence: 3,
      type: 1,
    },
    {
      icon: {
        // gray: 'http://139.59.65.130:5000/upload/menu_icons/gray/calculator.png',
        // green:
        //   'http://139.59.65.130:5000/upload/menu_icons/green/calculator.png',
        // white:
        //   'http://139.59.65.130:5000/upload/menu_icons/white/calculator.png',
      },
      id: 'CALCULATOR',
      name: '',
      sequence: 3,
      type: 1,
    },
    {
      icon: {
        // gray: 'http://139.59.65.130:5000/upload/menu_icons/gray/calculator.png',
        // green:
        //   'http://139.59.65.130:5000/upload/menu_icons/green/calculator.png',
        // white:
        //   'http://139.59.65.130:5000/upload/menu_icons/white/calculator.png',
      },
      id: 'CALCULATOR',
      name: '',
      sequence: 3,
      type: 1,
    },
  ]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedTabName, setSelectedTabName] = React.useState('Guide');
  const tabWidth = CONSTANT.SCREEN_WIDTH / tabs.length;
  let RBSheetRef: any = React.useRef();

  useEffect(() => {
    props.setGuest(true);
  }, []);

  const renderComponent = (name: string) => {
    switch (name) {
      case 'Calculator':
        props.setScanRedirect('CalculatorBO');
        return CalculatorScreen();
      // break;
      case 'Guide':
        props.setScanRedirect('GuideBO');
        return GuildScreen();
      // break;
      default:
        return WebviewScreen(name);
    }
  };

  let isDashboard =
    navigation.dangerouslyGetState().routes[0].state?.index > 0 &&
    props.mainlistData;
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <SafeAreaView style={styles.container}>
        {renderComponent(selectedTabName)}
        {isOpen && (
          <TouchableOpacity
            onPress={() => {
              RBSheetRef.current?.hide();
              setIsOpen(false);
            }}
            style={styles.transparentView}
          ></TouchableOpacity>
        )}
        {isDashboard ? null : (
          <View>
            {tabs.length > 0 && (
              <View
                style={[
                  styles.tabContainer,
                  {
                    height: Object.keys(tabs).length > 4 ? 65 : 80,
                    paddingBottom: 10,
                    backgroundColor: COLORS.getTabContainerColor(),
                  },
                  Object.values(tabs).length < 5 && styles.hiddenSheet,
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.singalTab,
                    { width: tabs[0] && tabs[0].name ? tabWidth : 0 },
                  ]}
                  onPress={() => {
                    // closeSheet();
                    setSelectedTabName(tabs[0] && tabs[0].name);
                  }}
                >
                  <Image
                    source={{
                      uri: tabs[0] && tabs[0].icon.white,
                    }}
                    style={styles.tabIcon}
                    resizeMode={'contain'}
                    tintColor={
                      tabs[0] && tabs[0].name === selectedTabName
                        ? COLORS.getTheme()
                        : COLORS.getSecondaryFontColor()
                    }
                  />
                  <Text
                    style={[
                      styles.tabTitle,
                      {
                        color:
                          tabs[0] && tabs[0].name === selectedTabName
                            ? COLORS.getTheme()
                            : COLORS.getSecondaryFontColor(),
                      },
                    ]}
                  >
                    {tabs[0] && tabs[0].name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // disabled={tabs[1] && tabs[1].name ? false : true}
                  style={[
                    styles.singalTab,
                    {
                      width: tabs[1] && tabs[1].name ? tabWidth : 0,
                      // marginEnd: 20,
                    },
                  ]}
                  onPress={() => {
                    // closeSheet();
                    setSelectedTabName(tabs[1] && tabs[1].name);
                  }}
                >
                  <Image
                    source={{
                      uri: tabs[1] && tabs[1].icon.white,
                    }}
                    style={styles.tabIcon}
                    resizeMode={'contain'}
                    tintColor={
                      tabs[1] && tabs[1].name === selectedTabName
                        ? COLORS.getTheme()
                        : COLORS.getSecondaryFontColor()
                    }
                  />
                  <Text
                    style={[
                      styles.tabTitle,
                      {
                        color:
                          tabs[1] && tabs[1].name === selectedTabName
                            ? COLORS.getTheme()
                            : COLORS.getSecondaryFontColor(),
                      },
                    ]}
                  >
                    {tabs[1] && tabs[1].name}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled
                  // disabled={tabs[2] && tabs[2].name ? false : true}
                  style={[styles.singalTab, { width: tabs[2] ? tabWidth : 0 }]}
                  onPress={() => {
                    // closeSheet();
                    setSelectedTabName(tabs[2] && tabs[2].name);
                  }}
                >
                  <Image
                    source={{
                      uri: tabs[2] && tabs[2].icon.white,
                    }}
                    style={styles.tabIcon}
                    resizeMode={'contain'}
                    tintColor={
                      tabs[2] && tabs[2].name === selectedTabName
                        ? COLORS.getTheme()
                        : COLORS.getSecondaryFontColor()
                    }
                  />
                  <Text
                    style={[
                      styles.tabTitle,
                      {
                        color:
                          tabs[2] && tabs[2].name === selectedTabName
                            ? COLORS.getTheme()
                            : COLORS.getSecondaryFontColor(),
                      },
                    ]}
                  >
                    {tabs[2] && tabs[2].name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled
                  // disabled={tabs[3] && tabs[3].name ? false : true}
                  style={[styles.singalTab, { width: tabs[3] ? tabWidth : 0 }]}
                  // style={[styles.singalTab, { flex: tabs[3] && tabs[3].name ? 1 : 0 }]}
                  onPress={() => {
                    // closeSheet();
                    setSelectedTabName(tabs[3] && tabs[3].name);
                  }}
                >
                  <Image
                    source={{
                      uri: tabs[3] && tabs[3].icon.white,
                    }}
                    style={styles.tabIcon}
                    resizeMode={'contain'}
                    tintColor={
                      tabs[3] && tabs[3].name === selectedTabName
                        ? COLORS.getTheme()
                        : COLORS.getSecondaryFontColor()
                    }
                  />
                  <Text
                    style={[
                      styles.tabTitle,
                      {
                        color:
                          tabs[3] && tabs[3].name === selectedTabName
                            ? COLORS.getTheme()
                            : COLORS.getSecondaryFontColor(),
                      },
                    ]}
                  >
                    {tabs[3] && tabs[3].name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  allTabs: state.common.tabs,
  mainlistData: state.dashboard_bo.mainlistData,
  userData: state.auth.userData,
  assignedloData: state.dashboard_bo.assignedloData,
  chatID: state.user.chatID,
});

export default connect(mapStateToProps, {
  setScanRedirect,
  setCutomLink,
  setGuest,
})(GuestTabs);
