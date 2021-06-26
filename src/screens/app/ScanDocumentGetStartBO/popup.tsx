import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Keyboard, Modal, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as COMPONENT from 'src/components';
import {OpenValidationAlert} from 'src/redux/actions/common';
import {IReduxState} from 'src/redux/reducers';
import styles from './styles';

interface IButtonProps {
  visible: boolean;
  type: string;
  OpenValidationAlert: Function;
  closeAlert: any;
  onChangeText: any;
  value: any;
  loading: boolean;
  setData: Function;
}

const Popup = (props: IButtonProps) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const {visible, closeAlert, onChangeText, value, setData} = props;

  const validateFileName = () => {
    if (fileName.trim() === '') {
      //setShowAlert(true);
      let obj = {
        message: 'Please enter file name',
        type: 'failure',
      };
      props.OpenValidationAlert(obj);
    } else {
      closeAlert(false);
      setData(true);
      // setTimeout(() => {
      //   navigation.navigate('ScanedDocumentBO', { filename: fileName });
      // }, 300);
    }
  };
  const getFileName = () => {
    return (
      <View style={styles.modalContainer}>
        <Text style={styles.desc}>{'Document Name'}</Text>
        <COMPONENT.TextField
          maxLength={50}
          value={value}
          keyboardType={'email-address'}
          title={'Name'}
          placeholder={'Enter Here'}
          secureTextEntry={false}
          onChangeText={(text: string) => {
            setFileName(text);
            onChangeText(text);
          }}
        />
        <View style={styles.buttonContainer}>
          <COMPONENT.Button
            title={'NEXT'}
            onPress={() => {
              validateFileName();
            }}
            type={'fill'}
          />
          <COMPONENT.Button
            title={'CANCEL'}
            onPress={() => closeAlert(false)}
            type={'unfill'}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.popupView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Keyboard.dismiss();
        }}>
        <View
          //activeOpacity={1}
          //onPress={() => Keyboard.dismiss()}
          style={styles.modalOverlay}>
          {getFileName()}
        </View>
        <COMPONENT.Popup />
      </Modal>
    </View>
  );
};
const mapStateToProps = (state: IReduxState) => ({
  loading: state.auth.loading,
});
export default connect(mapStateToProps, {
  OpenValidationAlert,
})(Popup);
