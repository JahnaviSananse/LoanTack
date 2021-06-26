import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import { closeModal, OpenValidationAlert } from 'src/redux/actions/common';
import {
  clearBorrowerProfile,
  clearUpdateEmail,
  getUserProfile,
  saveBorrowerProfile,
  updateEmail,
} from 'src/redux/actions/user';
import { IReduxState } from 'src/redux/reducers';
import { isValidEmail } from 'src/utility/util';
import styles from './styles';

interface IUserProfileProps {
  getUserProfile: Function;
  saveBorrowerProfile: Function;
  loading: boolean;
  borrowerProfileMessage: string;
  clearBorrowerProfile: Function;
  OpenValidationAlert: Function;
  closeModal: Function;
  profileData: any;
  borrowerProfileSuccess: boolean;
  updateEmailMessage: string;
  updateEmailFailureMessage: string;
  clearUpdateEmail: Function;
}
const ScanDocumentBO = (props: IUserProfileProps) => {
  const navigation = useNavigation();
  const [phone, setPhone] = React.useState('');
  const [code, setCode] = React.useState(1);
  const [name, setName] = React.useState('');
  const [displayPhone, setDisplayPhone] = React.useState('');
  const [callingCode, setCallingCode] = React.useState('+1');
  const [countryCode, setCountryCode] = React.useState('US');
  const [country, setCountry] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [oldEmail, setOldEmail] = React.useState('');

  React.useEffect(() => {
    props.getUserProfile();
  }, []);
  React.useEffect(() => {
    if (props.borrowerProfileMessage && props.borrowerProfileSuccess == false) {
      setTimeout(() => {
        let obj = {
          message: props.borrowerProfileMessage,
          type: 'failure',
        };
        props.OpenValidationAlert(obj);
      }, 500);
    }
    if (props.borrowerProfileSuccess) {
      setTimeout(() => {
        let obj = {
          message: 'User details updated',
          type: 'success',
        };
        props.OpenValidationAlert(obj);
        setTimeout(() => {
          props.closeModal();
          props.clearBorrowerProfile();
          navigation.goBack();
        }, 2000);
      }, 500);
    }
  }, [props.borrowerProfileMessage, props.borrowerProfileSuccess]);

  React.useEffect(() => {
    if (props.updateEmailFailureMessage !== '') {
      setTimeout(() => {
        let obj = {
          message: props.updateEmailFailureMessage,
          type: 'failure',
        };
        props.OpenValidationAlert(obj);
        props.clearUpdateEmail();
        setTimeout(() => {
          props.closeModal();
          // navigation.goBack();
        }, 1500);
      }, 500);
    }
    if (props.updateEmailMessage !== '') {
      setTimeout(() => {
        let obj = {
          message: props.updateEmailMessage,
          type: 'success',
        };
        props.OpenValidationAlert(obj);
        props.clearUpdateEmail();
        setTimeout(() => {
          props.closeModal();
          navigation.goBack();
        }, 1500);
      }, 500);
    }
  }, [props.updateEmailFailureMessage, props.updateEmailMessage]);

  const onSelect = (country: any) => {
    setCountry(country);
    console.log(country);
    setCountryCode(country.cca2);
    setCallingCode(
      country.callingCode[0] !== undefined ? country.callingCode[0] : 1,
    );
  };
  React.useEffect(() => {
    if (props.profileData.data) {
      let data = props.profileData.data;
      let conNum = data.contact_number.toString();
      let phone = conNum.replace(/\D/g, '');
      const match = conNum.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
      if (match) {
        phone = `(${match[1]}${match[2] ? ') ' : ''}${match[2]}${
          match[3] ? '-' : ''
        }${match[3]}`;
      }
      setName(data.name);
      setCountryCode(data.contact_code);
      setDisplayPhone(phone);
      setEmail(data.email);
      setOldEmail(data.email);
    }
  }, [props.profileData]);
  const validateForm = () => {
    let message = '';
    let isValidate = false;
    //isValidEmail
    if (name.trim() === '') {
      message = 'Please enter name';
    } else if (displayPhone.trim() === '') {
      message = 'Please enter phone';
    } else if (displayPhone.trim().length < 12) {
      message = 'Phone number should be 10 digit';
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
      if (props.profileData) {
        let data = props.profileData.data;
        let phoneNum = displayPhone
          .replace('(', '')
          .replace(')', '')
          .replace(' ', '')
          .replace('-', '');
        if (
          data.name !== name ||
          phoneNum.toString() !== data.contact_number.toString() ||
          data.contact_code !== countryCode
        ) {
          var obj = {
            name: name,
            contact_number: phoneNum,
            contact_code: callingCode,
          };
          //console.log(obj)
          props.saveBorrowerProfile(obj);
        }
      }
    }
    if (email.trim() === '') {
      message = 'Please enter email';
    } else if (!isValidEmail(email)) {
      message = 'Please enter valid email';
    } else if (email.trim() === oldEmail.trim()) {
      message = 'Please enter new email';
    } else {
      props.updateEmail(email);
    }
  };
  const renderButton = () => {
    return (
      <View style={styles.buttonPadding}>
        <COMPONENT.Button
          title={'SAVE'}
          type={'fill'}
          onPress={() => validateForm()}
        />
        <COMPONENT.Button
          title={'CANCEL'}
          type={'unfill'}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 0}
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={'User Details'}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => {
            navigation.goBack();
            props.clearBorrowerProfile();
          }}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
          <COMPONENT.TextField
            maxLength={50}
            value={name}
            keyboardType={'default'}
            title={'Name'}
            placeholder={'Enter Here'}
            secureTextEntry={false}
            style={styles.textField}
            onChangeText={(text: string) => {
              setName(text);
            }}
          />
          <COMPONENT.TextField
            maxLength={50}
            value={email}
            keyboardType={'email-address'}
            title={'Email'}
            placeholder={'Enter Here'}
            secureTextEntry={false}
            style={styles.textField}
            onChangeText={(text: string) => {
              setEmail(text);
            }}
          />
          <COMPONENT.PhoneNumberInput
            maxLength={14}
            onSelect={onSelect}
            value={displayPhone}
            keyboardType={'number-pad'}
            title={'Cell Phone'}
            placeholder={'(xxx) xxx - xxxx'}
            onChangeText={(text: string) => {
              let phone = text.replace(/\D/g, '');
              const match = phone.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
              if (match) {
                phone = `(${match[1]}${match[2] ? ') ' : ''}${match[2]}${
                  match[3] ? '-' : ''
                }${match[3]}`;
              }
              setPhone(text);
              setDisplayPhone(phone);
            }}
          />
          {renderButton()}
        </ScrollView>
        <COMPONENT.Popup />
        <COMPONENT.Loader isLoading={props.loading} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.user.loading,
  profileData: state.user.profileData,
  borrowerProfileMessage: state.user.borrowerProfileMessage,
  borrowerProfileSuccess: state.user.borrowerProfileSuccess,
  updateEmailMessage: state.user.updateEmailMessage,
  updateEmailFailureMessage: state.user.updateEmailFailureMessage,
});

export default connect(mapStateToProps, {
  getUserProfile,
  saveBorrowerProfile,
  OpenValidationAlert,
  closeModal,
  clearBorrowerProfile,
  updateEmail,
  clearUpdateEmail,
})(ScanDocumentBO);
