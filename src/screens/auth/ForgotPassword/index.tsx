import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import { forgotPassword_user } from 'src/redux/actions/auth'
import * as utility from 'src/utility/util';
import { OpenValidationAlert } from 'src/redux/actions/common'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import { IReduxState } from 'src/redux/reducers';
import Image from 'src/components/Image';
interface IfgProps {
  forgotPassword_user: Function;
  forgotPassError: string;
  OpenValidationAlert: Function;
  loading: boolean;
}
const ForgotPassword = (props: IfgProps) => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    if (props.forgotPassError && !props.loading) {
      setTimeout(() => {
        showAlert(props.forgotPassError, "failure")
      }, 500);
    }
  }, [props.forgotPassError]);

  const showAlert = (message: string, type: string) => {
    let obj = {
      message: message,
      type: type
    }
    props.OpenValidationAlert(obj)
  }
  const handleProceed = () => {
    let message = '';
    let isValidate = false;
    if (email.trim() === '') {
      message = 'Please enter email';
    } else if (!utility.isValidEmail(email)) {
      message = 'Please enter valid email';
    } else {
      isValidate = true;
    }

    if (!isValidate) {
      showAlert(message, "failure")
    } else {
      props.forgotPassword_user(email)
    }
  };
  const renderForm = () => {
    return (
      <View style={styles.scrollView}>
        <COMPONENT.TextField
          maxLength={50}
          value={email}
          keyboardType={"email-address"}
          title={'Email Address'}
          placeholder={'abc@xyz.com'}
          secureTextEntry={false}
          style={styles.textField}
          onChangeText={(text: any) => {
            setEmail(text);
          }}
        />
      </View>
    )
  }
  const renderButtons = () => {
    return (
      <View style={styles.proceedContainer}>
        <COMPONENT.Button
          title={"PROCEED"}
          type={"fill"}
          onPress={() => handleProceed()}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <COMPONENT.Header
        title={""}
        leftImg={IMAGES.IC_BACK}
        leftClick={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode={'contain'}
            source={IMAGES.IC_LOGO}
            style={styles.logo}
          />
          <View style={styles.forgotPassTextContainer}>
            <Text style={styles.forgotPassText}>Forgot Password</Text>
          </View>
        </View>
        {renderForm()}
        {renderButtons()}
      </KeyboardAwareScrollView>
      <COMPONENT.Popup />
      <COMPONENT.Loader
        isLoading={props.loading}
      />
    </SafeAreaView>
  );
};


const mapStateToProps = (state: IReduxState) => ({
  forgotPassError: state.auth.forgotPassError,
  loading: state.auth.loading
});

export default connect(mapStateToProps, {
  forgotPassword_user,
  OpenValidationAlert
})(ForgotPassword);

