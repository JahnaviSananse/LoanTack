import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import * as COLOR from 'src/constants/colors';
import { logout_user } from 'src/redux/actions/auth';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';

interface ISettingProps {
  logout_user: Function;
}
const SettingLO = (props: ISettingProps) => {
  const navigation = useNavigation();
  const data = [
    { name: 'Profile Settings', redirect: 'ProfileLO' },
    { name: 'Change Password', redirect: 'ChangePasswordLO' },
    { name: 'Notifications Settings', redirect: 'NotificationSettingLO' },
    { name: 'Log-out', redirect: 'Login' },
  ];
  React.useEffect(() => {}, []);

  const LogoutAlert = () => {
    Alert.alert('LoanTack', 'Are you sure want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          COLOR.setDefaultTheme();
          console.log('Colors', 'setted');
          props.logout_user();
        },
      },
    ]);
  };
  const renderItem = (item: any) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (item.name === 'Log-out') {
              LogoutAlert();
            } else {
              navigation.navigate(item.redirect);
            }
          }}
          style={styles.cellContainer}
        >
          <Text style={styles.nameText}>{item.name}</Text>
        </TouchableOpacity>
        <View style={styles.separetor} />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={'Settings'}
          rightImg={IMAGES.IC_NOTIFICATION}
          rightClick={() =>
            navigation.navigate('NotificationLO', { isBack: true })
          }
        />
        <View style={styles.flatlistContainer}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = (state: IReduxState) => ({});

export default connect(mapStateToProps, {
  logout_user,
})(SettingLO);
