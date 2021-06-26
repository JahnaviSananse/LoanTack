import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import {
  clearSignupData,
  resendCode,
  verifyCode,
} from 'src/redux/actions/auth';
import { closeModal, OpenValidationAlert } from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import * as Router from '../../../routes/router';
import styles from './styles';

interface IVerifyProps {
  resendCode: Function;
  email: string;
  verifyError: string;
  verifyCode: Function;
  resendMessage: string;
  email_verified: boolean;
  OpenValidationAlert: Function;
  loading: boolean;
  signupData: any;
  closeModal: Function;
  clearSignupData: Function;
  verifyType: string;
  verifySuccess: any;
}
const VerificationCode = (prop: IVerifyProps) => {
  const navigation = useNavigation();
  const CELL_COUNT = 6;
  const params: any = useRoute().params;
  const [enableMask, setEnableMask] = React.useState(true);
  const [value, setValue] = React.useState('');
  const [type, setType] = React.useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  React.useEffect(() => {
    if (prop.signupData) {
      setTimeout(() => {
        setTimeout(() => {
          showAlert(prop.signupData.message, 'success');
        }, 500);
        prop.clearSignupData();
      }, 1500);
    }
    if (
      type === 'VERIFY' &&
      prop.verifySuccess !== null &&
      prop.verifySuccess !== ''
    ) {
      console.log('Success Signup verfiy', prop.verifySuccess, params);
      setTimeout(() => {
        showAlert('Email Verified Successfully', 'success');
        setTimeout(() => {
          prop.closeModal();
          // Router.navigate('LoanTackTabsBO', {});
        }, 2000);
      }, 500);

      console.log('EmailVerified', prop.email, type);
    }

    if (prop.resendMessage) {
      setTimeout(() => {
        showAlert(prop.resendMessage, 'success');
      }, 500);
    }
    if (prop.verifyError) {
      setTimeout(() => {
        //showAlert('Invalid Verification Code', 'failure');
        showAlert(prop.verifyError, 'failure');
      }, 500);
    }
    if (
      prop.verifySuccess !== null &&
      prop.verifySuccess !== '' &&
      params.email &&
      type === 'RESET'
    ) {
      // let obj = {
      //   message: prop.verifySuccess,
      //   type: 'success',
      // };
      setTimeout(() => {
        showAlert('Email Verified Successfully', 'Success');
      }, 500);
      setTimeout(() => {
        prop.closeModal();
      }, 1500);
      //prop.OpenValidationAlert(obj);
      setTimeout(() => {
        Router.navigate('ResetPassword', {});
      }, 2000);
    }
  }, [
    prop.signupData,
    prop.resendMessage,
    prop.email_verified,
    prop.verifyError,
    prop.email,
    prop.verifyType,
    prop.verifySuccess,
  ]);

  const showAlert = (message: string, type: string) => {
    let obj = {
      message: message,
      type: type,
    };
    prop.OpenValidationAlert(obj);
  };
  const handleProceed = () => {
    if (value.length !== 6) {
      showAlert('Please enter code', 'failure');
    } else {
      let email = prop.email ? prop.email : params?.email;
      let type = !params?.email ? 'VERIFY' : 'RESET';
      type = params?.verify ? 'VERIFY' : type;
      setType(type);
      let obj = {
        email: email,
        code: parseInt(value),
        type: type,
      };
      if (params?.email) {
        prop.verifyCode(obj, params?.verify ? false : true);
      } else {
        prop.verifyCode(obj, false);
      }
    }
  };
  const handleResend = () => {
    // setType(prop.email ? 'VERIFY' : 'RESET');
    let email = prop.email ? prop.email : params?.email;
    let type = prop.email ? 'VERIFY' : 'RESET';
    type = params?.verify ? 'VERIFY' : type;
    setType(type);
    let obj = {
      email: email,
      type: type,
    };
    prop.resendCode(obj);
  };
  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;
    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }
    return (
      <View>
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {textChild}
        </Text>
        {index !== 6 && <View style={styles.dash} />}
      </View>
    );
  };
  const renderCodeInput = () => {
    return (
      <View style={styles.scrollView}>
        <Text style={styles.placeholderText}>{'Enter Verification Code'}</Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
      </View>
    );
  };
  const renderButton = () => {
    return (
      <View style={styles.buttonsContainer}>
        <COMPONENT.Button
          title={'PROCEED'}
          type={'fill'}
          onPress={() => handleProceed()}
        />
        <TouchableOpacity
          style={styles.unfillButton}
          onPress={() => handleResend()}
        >
          <Text style={styles.unfillText}>{'RESEND CODE'}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <COMPONENT.Header
        title={''}
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
            <Text style={styles.forgotPassText}>Verification Code</Text>
          </View>
        </View>
        {renderCodeInput()}
        {renderButton()}

        <COMPONENT.Popup />
      </KeyboardAwareScrollView>
      <COMPONENT.Popup />
      <COMPONENT.Loader isLoading={prop.loading} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.auth.loading,
  resendMessage: state.auth.resendMessage,
  email: state.auth.email,
  email_verified: state.auth.email_verified,
  verifyError: state.auth.verifyError,
  signupData: state.auth.signupData,
  verifyType: state.auth.verifyType,
  verifySuccess: state.auth.verifySuccess,
});

export default connect(mapStateToProps, {
  resendCode,
  verifyCode,
  OpenValidationAlert,
  closeModal,
  clearSignupData,
})(VerificationCode);
