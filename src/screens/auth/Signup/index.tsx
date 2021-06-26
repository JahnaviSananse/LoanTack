import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as CONSTANT from 'src/constants/constant';
import { clearSignupData, doSignup } from 'src/redux/actions/auth';
import { closeModal, OpenValidationAlert } from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import * as utility from 'src/utility/util';
import styles from './styles';
interface ISignupProps {
  doSignup: Function;
  loading: boolean;
  signupData: any;
  signupError: any;
  clearSignupData: Function;
  OpenValidationAlert: Function;
  closeModal: Function;
  signupSuccess: string;
}
const Signup = (props: ISignupProps) => {
  const navigation = useNavigation();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [displayPhone, setDisplayPhone] = React.useState('');
  const [callingCode, setCallingCode] = React.useState('+1');
  const [countryCode, setCountryCode] = React.useState('US');
  const [country, setCountry] = React.useState(null);

  React.useEffect(() => {
    if (props.signupData) {
      setTimeout(() => {
        // console.log('SignUp data', props.signupData);
        props.clearSignupData(); //clear signup data from redux
        clearState();
        navigation.navigate('VerificationCode', {
          redirect: 'Login',
        });
      }, 1000);
    }
    if (props.signupError && !props.loading) {
      setTimeout(() => {
        showAlert(props.signupError, 'failure');
      }, 500);
    }
  }, [props.signupData, props.signupError]);

  const showAlert = (message: string, type: string) => {
    let obj = {
      message: message,
      type: type,
    };
    props.OpenValidationAlert(obj);
  };
  const clearState = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayPhone('');
  };
  const handleSignup = () => {
    let message = '';
    let isValidate = false;
    if (name.trim() === '') {
      message = 'Please enter name';
    } else if (email.trim() === '') {
      message = 'Please enter email';
    } else if (!utility.isValidEmail(email)) {
      message = 'Please enter a valid email address';
    } else if (password.trim() === '') {
      message = 'Please enter password';
    } else if (confirmPassword.trim() === '') {
      message = 'Please enter confirm password';
    } else if (!CONSTANT.CheckPassword(password.trim())) {
      message =
        'The password should be 6 characters long. It should contain at least one upper case, lower case, number and special character';
    } else if (password.trim() !== confirmPassword.trim()) {
      message = 'Password and confirm password must be same';
    } else if (displayPhone.trim() === '') {
      message = 'Please enter cell phone';
    } else {
      isValidate = true;
    }

    if (!isValidate) {
      let obj = {
        message: message,
        type: 'failure',
      };
      props.OpenValidationAlert(obj);
    } else {
      let phoneNum = displayPhone.replace(' ', '').replace('-', '');
      var obj = {
        email: email,
        password: password,
        name: name,
        contact_number: phoneNum,
        contact_code: callingCode.substring(1),
      };
      props.doSignup(obj);
    }
  };
  const onSelect = (country: any) => {
    setCountry(country);
    setCountryCode(country.cca2);
    setCallingCode('+' + country.callingCode);
  };
  const renderform = () => {
    return (
      <View style={styles.scrollView}>
        <COMPONENT.TextField
          maxLength={50}
          value={name}
          title={'Name'}
          placeholder={'Enter Here'}
          secureTextEntry={false}
          style={styles.textField}
          onChangeText={(name: string) => {
            setName(name);
          }}
        />
        <COMPONENT.TextField
          maxLength={50}
          value={email}
          keyboardType={'email-address'}
          title={'Email Address'}
          placeholder={'abc@xyz.com'}
          secureTextEntry={false}
          style={styles.textField}
          onChangeText={(email: string) => {
            setEmail(email);
          }}
        />
        <COMPONENT.TextField
          maxLength={15}
          value={password}
          title={'Password'}
          placeholder={'Enter Here'}
          secureTextEntry={true}
          style={styles.textField}
          onChangeText={(password: string) => {
            setPassword(password);
          }}
        />
        <COMPONENT.TextField
          maxLength={15}
          value={confirmPassword}
          title={'Confirm Password'}
          placeholder={'Enter Here'}
          secureTextEntry={true}
          style={styles.textField}
          onChangeText={(password: string) => {
            setConfirmPassword(password);
          }}
        />
        <COMPONENT.PhoneNumberInput
          maxLength={12}
          onSelect={onSelect}
          value={displayPhone}
          keyboardType={'number-pad'}
          title={'Cell Phone'}
          placeholder={'(xxx) xxx - xxxx'}
          style={styles.textField}
          onChangeText={(text: string) => {
            let phone = text.replace(/\D/g, '');
            const match = phone.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
            if (match) {
              phone = `${match[1]}${match[2] ? ' ' : ''}${match[2]}${
                match[3] ? '-' : ''
              }${match[3]}`;
            }
            setDisplayPhone(phone);
          }}
        />
      </View>
    );
  };
  const renderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <COMPONENT.Button
          title={'SIGN UP'}
          type={'fill'}
          onPress={() => handleSignup()}
        />

        <View style={styles.signContainer}>
          <Text style={styles.signupExtraText}>Have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <COMPONENT.Header
        title={''}
        leftImg={IMAGES.IC_BACK}
        leftClick={() => {
          props.clearSignupData();
          navigation.goBack();
        }}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode={'contain'}
            source={IMAGES.IC_LOGO}
            style={styles.logo}
          />
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Sign Up</Text>
          </View>
        </View>
        {renderform()}
        {renderButton()}
        <COMPONENT.Popup />
        <COMPONENT.Loader isLoading={props.loading} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.auth.loading,
  signupData: state.auth.signupData,
  signupError: state.auth.signupError,
  signupSuccess: state.auth.signupSuccess,
});

export default connect(mapStateToProps, {
  doSignup,
  clearSignupData,
  OpenValidationAlert,
  closeModal,
})(Signup);
