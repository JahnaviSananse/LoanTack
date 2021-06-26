import React from 'react';
import { View, SafeAreaView } from 'react-native';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import styles from './styles';
import { changePassword, clearChangePassword } from 'src/redux/actions/user';
import { connect } from 'react-redux';
import { IReduxState } from 'src/redux/reducers';
import { useNavigation } from '@react-navigation/native';
import { OpenValidationAlert, closeModal } from 'src/redux/actions/common';
import * as CONSTANT from 'src/constants/constant'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface IChangePasswordProps {
  changePassword: Function;
  passwordChangeMessage: string;
  OpenValidationAlert: Function;
  clearChangePassword: Function;
  closeModal: Function;
  passwordChangeSuccess: boolean;
  loading: boolean;
}
const ChangePasswordLO = (props: IChangePasswordProps) => {
  const navigation = useNavigation();
  const [currentPass, setCurrentPass] = React.useState('');
  const [newPass, setNewPass] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  React.useEffect(() => {
    if (props.passwordChangeMessage && props.passwordChangeSuccess == false) {
      setTimeout(() => {
        let obj = {
          message: props.passwordChangeMessage,
          type: 'failure',
        };
        props.OpenValidationAlert(obj);
      }, 500);
    }
    if (props.passwordChangeSuccess) {
      let obj = {
        message: 'Password changed successfully',
        type: 'success',
      };
      props.OpenValidationAlert(obj);
      props.clearChangePassword();
      setTimeout(() => {
        props.closeModal();
        navigation.goBack();
      }, 1500);
    }
  }, [props.passwordChangeMessage, props.passwordChangeSuccess]);
  const validatePassword = () => {
    let message = '';
    let isValidate = false;
    if (currentPass.trim() === '') {
      message = 'Please enter current password';
    } else if (newPass.trim() === '') {
      message = 'Please enter new password';
    } else if (confirmPass.trim() === '') {
      message = 'Please enter confirm password';
    } else if (newPass.trim() !== confirmPass.trim()) {
      message = 'Password and confirm password must be same';
    } else if (!CONSTANT.CheckPassword(newPass.trim())) {
      message = 'The password should be 6 characters long. It should contain at least one upper case, lower case, number and special character';
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
      props.changePassword(currentPass, newPass);
    }
  };
  const renderButtons = () => {
    return (
      <View style={styles.btnContainer}>
        <COMPONENT.Button
          title={'SAVE'}
          type={'fill'}
          onPress={() => validatePassword()}
        />

        <COMPONENT.Button
          title={'CANCEL'}
          type={'unfill'}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  };
  const renderForm = () => {
    return (
      <View>
        <COMPONENT.TextField
          maxLength={15}
          value={currentPass}
          title={'Current Password'}
          placeholder={'Enter Here'}
          secureTextEntry={true}
          style={styles.textField}
          onChangeText={(password: string) => {
            setCurrentPass(password);
          }}
        />
        <COMPONENT.TextField
          maxLength={15}
          value={newPass}
          title={'New Password'}
          placeholder={'Enter Here'}
          secureTextEntry={true}
          style={styles.textField}
          onChangeText={(password: string) => {
            setNewPass(password);
          }}
        />
        <COMPONENT.TextField
          maxLength={15}
          value={confirmPass}
          title={'Confirm Password'}
          placeholder={'Enter Here'}
          secureTextEntry={true}
          style={styles.textField}
          onChangeText={(password: string) => {
            setConfirmPass(password);
          }}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <COMPONENT.Header
        title={'Change Password'}
        leftImg={IMAGES.IC_BACK}
        leftClick={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView>
        <View>
          {renderForm()}
          {renderButtons()}
        </View>
      </KeyboardAwareScrollView>
      <COMPONENT.Loader isLoading={props.loading} />
      <COMPONENT.Popup />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.user.loading,
  passwordChangeMessage: state.user.passwordChangeMessage,
  passwordChangeSuccess: state.user.passwordChangeSuccess,
});

export default connect(mapStateToProps, {
  changePassword,
  OpenValidationAlert,
  clearChangePassword,
  closeModal,
})(ChangePasswordLO);
