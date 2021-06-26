import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import { callbackRequest, clearCallback } from 'src/redux/actions/callback';
import { closeModal, OpenValidationAlert } from 'src/redux/actions/common';
import { updateInfoModal } from 'src/redux/actions/modal';
import { IReduxState } from 'src/redux/reducers';
import * as Router from 'src/routes/router';
import POPUP from './popup';
import styles from './styles';
interface ICallBackProps {
  loading: boolean;
  OpenValidationAlert: Function;
  callbackRequest: Function;
  callbackSuccess: string;
  clearCallback: Function;
  closeModal: Function;
  callbackError: string;
  infoMessages: any;
  updateInfoModal: Function;
}
const ScanDocumentBO = (props: ICallBackProps) => {
  const navigation = useNavigation();
  const params = useRoute().params;
  const [phone, setPhone] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [selectedSlot, setTimeslot] = React.useState('');
  const [displayPhone, setDisplayPhone] = React.useState('');
  const [showSlotAlert, setShowSlotAlert] = React.useState(false);
  const [slotCode, setSlotCode] = React.useState(1);
  const [callingCode, setCallingCode] = React.useState('1');

  React.useEffect(() => {
    if (props.callbackSuccess) {
      setPhone('');
      setComment('');
      setTimeslot('');
      setDisplayPhone('');
      let obj = {
        message: props.callbackSuccess,
        type: 'success',
      };
      props.OpenValidationAlert(obj);

      setTimeout(() => {
        setPhone('');
        setComment('');
        setTimeslot('');
        setDisplayPhone('');
        props.clearCallback();
        props.closeModal();
        Router.goBack();
      }, 1500);
    }
    if (props.callbackError) {
      let obj = {
        message: 'Something went Wrong!',
        type: 'failure',
      };
      props.OpenValidationAlert(obj);

      setTimeout(() => {
        props.clearCallback();
        props.closeModal();
      }, 1500);
    }
  }, [props.callbackSuccess, props.callbackError]);

  const closeAlert = () => {
    // setShowAlert(false);
    setShowSlotAlert(false);
  };
  const timeSlot = (slot: string) => [setTimeslot(slot)];
  const validateForm = () => {
    let message = '';
    let isValidate = false;
    let type: string = 'failure';
    if (phone.trim() === '') {
      message = 'Please enter phone number';
    } else if (selectedSlot === '') {
      message = 'Please select time to call';
    } else if (comment.trim() === '') {
      message = 'Please enter comment';
    } else {
      isValidate = true;
      type = 'success';
      message = 'Your request has been sent';
    }

    if (!isValidate) {
      //setAlertType('failure');
      //setShowAlert(true);
      //setAlertMsg(message);
      let obj = {
        message: message,
        type: 'failure',
      };
      props.OpenValidationAlert(obj);
    } else {
      let finalNumber = phone.replace(' ', '');
      let req = {
        contact_code: callingCode,
        contact_number: finalNumber.replace('-', ''),
        best_time_to_call: slotCode,
        comment: comment,
      };
      console.log('Reuqesty', req);
      props.callbackRequest(req);
    }
  };
  const renderPhoneNumber = () => {
    return (
      <COMPONENT.PhoneNumberInput
        maxLength={12}
        value={displayPhone}
        keyboardType={'number-pad'}
        title={'Cell Phone'}
        placeholder={'(xxx) xxx - xxxx'}
        onChangeText={(text: string) => {
          let phone = text.replace(/\D/g, '');
          const match = phone.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
          if (match) {
            phone = `${match[1]}${match[2] ? ' ' : ''}${match[2]}${
              match[3] ? '-' : ''
            }${match[3]}`;
          }
          setPhone(text);
          setDisplayPhone(phone);
        }}
        onSelect={(value: any) =>
          setCallingCode(
            value.callingCode[0] !== undefined ? value.callingCode[0] : 1,
          )
        }
      />
    );
  };
  const renderBestTimeToCall = () => {
    return (
      <View>
        <Text style={styles.placeholderText}>Best Time to Call</Text>
        <TouchableOpacity
          style={styles.timeContainer}
          onPress={() => setShowSlotAlert(true)}
        >
          <Text
            style={[
              styles.slotText,
              {
                fontStyle: selectedSlot ? 'normal' : 'italic',
                color: selectedSlot ? 'black' : '#8D8E90',
              },
            ]}
          >
            {selectedSlot ? selectedSlot : 'Select'}
          </Text>
          <Image
            source={IMAGES.IC_DROPDOWN}
            style={styles.imgDropdown}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderComment = () => {
    return (
      <View>
        <Text style={styles.placeholderText}>Comments</Text>
        <TextInput
          maxLength={200}
          style={[
            styles.textField,
            { fontStyle: comment.length > 0 ? 'normal' : 'italic' },
          ]}
          underlineColorAndroid={'transparent'}
          multiline={true}
          numberOfLines={6}
          value={comment}
          placeholder={'Enter Here'}
          onChangeText={(text: string) => {
            setComment(text);
          }}
        />
      </View>
    );
  };
  const renderButton = () => {
    return (
      <View style={styles.buttonPadding}>
        <COMPONENT.Button
          title={'SEND'}
          type={'fill'}
          onPress={() => validateForm()}
        />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      //behavior="padding"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={'Callback'}
          leftImg={params !== undefined && IMAGES.IC_BACK}
          leftClick={() => params !== undefined && navigation.goBack()}
          rightImg={IMAGES.IC_HEADER_INFO}
          rightClick={() => {
            props.updateInfoModal(
              true,
              'Callback',
              props.infoMessages?.callback_request,
            );
          }}
        />
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
          {renderPhoneNumber()}
          {renderBestTimeToCall()}
          {renderComment()}
          {renderButton()}
          <POPUP
            visible={showSlotAlert}
            closeAlert={() => closeAlert()}
            timeSlot={(slot: string) => {
              timeSlot(slot);
              if (slot === 'ASAP') {
                setSlotCode(1);
              } else if (slot === 'Evening') {
                setSlotCode(3);
              } else if (slot === 'Morning') {
                setSlotCode(2);
              }
            }}
            value={selectedSlot}
          />
          <COMPONENT.Popup />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.callback.loading,
  callbackSuccess: state.callback.callbackSuccess,
  callbackError: state.callback.callbackError,
  infoMessages: state.auth.infoMessages,
});
export default connect(mapStateToProps, {
  OpenValidationAlert,
  callbackRequest,
  clearCallback,
  closeModal,
  updateInfoModal,
})(ScanDocumentBO);
