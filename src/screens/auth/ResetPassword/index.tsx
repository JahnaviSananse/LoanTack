import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import { resetPassword_user } from 'src/redux/actions/auth';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import * as CONSTANT from 'src/constants/constant';
import { OpenValidationAlert, closeModal } from 'src/redux/actions/common';
import { connect } from 'react-redux';
import { IReduxState } from 'src/redux/reducers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Router from 'src/routes/router';
import Image from 'src/components/Image';

interface IResetProps {
  resetPassword_user: Function;
  email: string;
  OpenValidationAlert: Function;
  loading: boolean;
  resetPassError: string;
  resetPasswordSuccess: string;
  closeModal: Function;
}

const ResetPassword = (props: IResetProps) => {
  const navigation = useNavigation();
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const showAlert = (message: string, type: string) => {
    let obj = {
      message: message,
      type: type,
    };
    props.OpenValidationAlert(obj);
  };
  React.useEffect(() => {
    if (props.resetPasswordSuccess && !props.loading) {
      setTimeout(() => {
        showAlert('Your password has been reset successfully', 'success');
      }, 500);
      setTimeout(() => {
        props.closeModal();
        Router.navigate('Login', {});
      }, 2000);
    }
    if (props.resetPassError && !props.loading) {
      setTimeout(() => {
        showAlert(props.resetPassError, 'failure');
      }, 500);
    }
  }, [props.resetPassError, props.resetPasswordSuccess]);

  const handleSave = () => {
    let message = '';
    let isValidate = false;
    if (password.trim() === '') {
      message = 'Please enter password';
    } else if (confirmPassword.trim() === '') {
      message = 'Please enter confirm password';
    } else if (password.trim() !== confirmPassword.trim()) {
      message = 'Password and confirm password must be same';
    } else if (!CONSTANT.CheckPassword(password.trim())) {
      message =
        'The password should be 6 characters long. It should contain at least one upper case, lower case, number and special character';
    } else {
      isValidate = true;
    }

    if (!isValidate) {
      showAlert(message, 'failure');
    } else {
      let obj = {
        email: props.email,
        password: password,
      };
      props.resetPassword_user(obj);
    }
  };

  const renderForm = () => {
    return (
      <View style={styles.scrollView}>
        <COMPONENT.TextField
          maxLength={50}
          value={password}
          secureTextEntry={true}
          title={'New Password'}
          placeholder={'Enter Here'}
          style={styles.textField}
          onChangeText={(password: string) => {
            setPassword(password);
          }}
        />
        <COMPONENT.TextField
          maxLength={50}
          value={confirmPassword}
          title={'Confirm Password'}
          placeholder={'Enter Here'}
          secureTextEntry={true}
          style={styles.textField}
          onChangeText={(password: string) => {
            setConfirmPassword(password);
          }}
        />
      </View>
    );
  };
  const renderButton = () => {
    return (
      <View style={styles.proceedContainer}>
        <COMPONENT.Button
          title={'SAVE'}
          type={'fill'}
          onPress={() => handleSave()}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <COMPONENT.Header
        title={''}
        leftImg={IMAGES.IC_BACK}
        leftClick={() => navigation.navigate('ForgotPassword')}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode={'contain'}
            source={IMAGES.IC_LOGO}
            style={styles.logo}
          />
          <View style={styles.forgotPassTextContainer}>
            <Text style={styles.forgotPassText}>Reset Password</Text>
          </View>
        </View>
        {renderForm()}
        {renderButton()}
      </KeyboardAwareScrollView>
      <COMPONENT.Popup />
      <COMPONENT.Loader isLoading={props.loading} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  email: state.auth.email,
  loading: state.auth.loading,
  resetPassError: state.auth.resetPassError,
  resetPasswordSuccess: state.auth.resetPasswordSuccess,
});

export default connect(mapStateToProps, {
  resetPassword_user,
  OpenValidationAlert,
  closeModal,
})(ResetPassword);
