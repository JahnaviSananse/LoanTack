import React from 'react';
import {
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import * as IMAGES from 'src/assets/images'
import * as COMPONENT from 'src/components'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Image from 'src/components/Image';


const SettingLO = () => {
  const navigation = useNavigation()
  const data = [
    { name: "Change Password", redirect: "ChangePasswordLO" },
    { name: "User Details", redirect: "UserDetailBO" },
    // { name: "Log-out", redirect: "Login" },
    { name: "Disclaimer", redirect: "DisclaimerBO" },
    { name: "Privacy Policy", redirect: "PrivacyPolicyBO" },
  ]
  React.useEffect(() => {

  }, [])

  const renderItem = (item: any) => {
    return (
      <View>
        <TouchableOpacity onPress={() => {
          navigation.navigate(item.redirect);
        }}
          style={styles.cellContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
        </TouchableOpacity>
        <View style={styles.separetor} />
      </View>
    )
  }
  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.keyboardAware}>
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={"Settings"}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
        />
        <View style={styles.flatlistContainer}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView >
  );
};

export default SettingLO;

