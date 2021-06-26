import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  AsyncStorage,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as CONSTANT from 'src/constants/constant';
import { clearForgotData, doLogin } from 'src/redux/actions/auth';
import { OpenValidationAlert, setGuest } from 'src/redux/actions/common';
import { getDashboardList, getMainList } from 'src/redux/actions/dashboard_bo';
import { IReduxState } from 'src/redux/reducers';
import * as utility from 'src/utility/util';
import styles from './styles';

interface ILoginProps {
  doLogin: Function;
  loading: boolean;
  email_verified: boolean;
  userData: any;
  OpenValidationAlert: Function;
  loginError: any;
  getMainList: Function;
  token: any;
  mainlistData: any;
  clearForgotData: Function;
  getDashboardList: Function;
}
const Login = (props: ILoginProps) => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    if (props.userData !== null && props.userData !== undefined) {
      props.getMainList();
      props.getDashboardList();
      AsyncStorage.getItem(CONSTANT.ACCESS_TOKEN).then((value) => {
        if (value) {
          let redirect =
            props.userData.role === 2 ? 'LoanTackTabs' : 'LoanTackTabsBO';
          props.setGuest();
          setTimeout(() => {
            navigation.reset({
              routes: [{ name: redirect }],
            });
          }, 1000);
        }
      });
    }
    if (props.loginError && !props.loading) {
      // console.log('Errr', props.loginError);
      setTimeout(() => {
        let obj = {
          message: props.loginError?.toString(),
          type: 'failure',
        };
        props.OpenValidationAlert(obj);
      }, 500);
    }
    if (props.email_verified === false && props.loading === false) {
      navigation.navigate('VerificationCode', {
        redirect: 'Login',
      });
    }
  }, [props.email_verified, props.loginError, props.userData]);
  const handleLogin = () => {
    let message = '';
    let isValidate = false;
    if (email.trim() === '') {
      message = 'Please enter email';
    } else if (!utility.isValidEmail(email.trim())) {
      message = 'Please enter valid email';
    } else if (password.trim() === '') {
      message = 'Please enter password';
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
      // props.getMainList()
      props.doLogin(email, password);
    }
  };
  const handleGuest = () => {
    AsyncStorage.setItem('isGuest', 'true').then((res: any) => {
      // navigation.reset({
      //   routes: [
      //     {
      //       name: 'GuestTabs',
      //     },
      //   ],
      // });
      navigation.navigate('GuestTabs');
    });
  };
  const handleForgotPass = () => {
    navigation.navigate('ForgotPassword');
    props.clearForgotData();
  };

  const renderButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <COMPONENT.Button
          title={'LOGIN'}
          type={'fill'}
          onPress={() => handleLogin()}
        />

        <COMPONENT.Button
          title={'CONTINUE AS GUEST'}
          type={'unfill'}
          onPress={() => handleGuest()}
        />

        <View style={styles.signContainer}>
          <Text style={styles.signupExtraText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderForm = () => {
    return (
      <View style={styles.scrollView}>
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
        <TouchableOpacity
          onPress={() => handleForgotPass()}
          style={styles.forgotPassContainer}
        >
          <Text style={styles.forgotPassText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.keyboardAware}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode={'contain'}
            source={IMAGES.IC_LOGO}
            style={styles.logo}
          />
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Login</Text>
          </View>
        </View>
        {renderForm()}
        {renderButtons()}
      </KeyboardAwareScrollView>
      <COMPONENT.Popup />

      <COMPONENT.Loader isLoading={props.loading} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.auth.loading,
  userData: state.auth.userData,
  email_verified: state.auth.email_verified,
  loginError: state.auth.loginError,
  mainlistData: state.dashboard_bo.mainlistData,
});

export default connect(mapStateToProps, {
  doLogin,
  OpenValidationAlert,
  clearForgotData,
  getMainList,
  getDashboardList,
  setGuest,
})(Login);
