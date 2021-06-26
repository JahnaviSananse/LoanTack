import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import { toggleSettingOption } from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import * as utility from 'src/utility/util';
import styles from './styles';

interface IScanBOProps {
  toggleSettingOption: any;
  showOptions: boolean;
  infoMessages: any;
}
const ScanBO = (props: IScanBOProps) => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  React.useEffect(() => {}, []);
  const renderDetail = () => {
    return (
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Email Verification Required</Text>
        <Text style={styles.desc}>
          In order to scan and submit documents you must first verify your email
          address. Please provide a valid email to continue.
        </Text>
      </View>
    );
  };

  const handleContinue = () => {
    let message = '';
    let isValidate = false;
    if (email.trim() === '') {
      message = 'Please enter email';
    } else if (!utility.isValidEmail(email.trim())) {
      message = 'Please enter valid email';
    } else {
      isValidate = true;
    }
    if (!isValidate) {
      // utility.showAlert('LoanTack', message);
      <COMPONENT.Popup desciption={message} type={'failure'} visible={true} />;
    } else {
      navigation.navigate('ScanStatusBO');
    }
  };

  // console.log('I', props.infoMessages);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Scan'}
          infoMessage={props.infoMessages ? props.infoMessages.scan_info : ''}
          leftImg={IMAGES.IC_HEADER_SETTING}
          leftClick={() => props.toggleSettingOption(!props.showOptions)}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        <ScrollView contentContainerStyle={styles.contentStyle}>
          {renderDetail()}
          <View style={styles.formContainer}>
            <COMPONENT.TextField
              maxLength={50}
              value={email}
              keyboardType={'email-address'}
              title={'Email Address'}
              placeholder={'abc@xyz.com'}
              secureTextEntry={false}
              onChangeText={(email: string) => {
                setEmail(email);
              }}
            />
            <COMPONENT.Button
              title={'CONTINUE'}
              type={'fill'}
              onPress={() => handleContinue()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = (state: IReduxState) => ({
  showOptions: state.common.showOptions,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  toggleSettingOption,
})(ScanBO);
