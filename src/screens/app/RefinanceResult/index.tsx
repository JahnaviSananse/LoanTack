import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import { saveCalculation } from 'src/redux/actions/calculation';
import { OpenValidationAlert } from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';

interface IRResult {
  // loading: boolean;
  OpenValidationAlert: Function;
  calculatedData: any;
  saveCalculation: Function;
  infoMessages: any;
  isGuest: boolean;
}
const AffordabilityResult = (props: IRResult) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const param: any = useRoute().params;

  let FHAData = JSON.parse(JSON.stringify(props.calculatedData));
  let could_save = FHAData.could_save;
  let new_payment = FHAData.new_payment;
  let total_saving = FHAData.total_saving;
  let disclaimer = FHAData.calculatio_disclaimer;

  const data = [
    { color: '#4FB263', title: `$${total_saving}`, desc: 'Total Savings' },
    { color: '#EB4949', title: `$${new_payment}`, desc: 'New Payment' },
  ];
  React.useEffect(() => {
    if (param) {
      setIsSaved(param.isSaved);
    }
  }, [param]);
  const renderBlackBox = () => {
    return (
      <View style={styles.blackBoxContainer}>
        <View>
          <Text style={styles.purchasePriceText}>
            Refinancing could save you
          </Text>
          <Text style={styles.purchasePriceAmount}>${could_save} / Month</Text>
        </View>
      </View>
    );
  };
  const renderDesription = () => {
    return (
      <View style={styles.descContainer}>
        <Text style={styles.descText}>{disclaimer}</Text>
      </View>
    );
  };
  const validateName = () => {
    if (fileName.trim() === '') {
      //setAlertMsg('Please enter file name');
      //setShowAlert(true);
      let obj = {
        message: 'Please enter file name',
        type: 'failure',
      };
      props.OpenValidationAlert(obj);
    } else {
      props.saveCalculation({ id: FHAData.id, name: fileName });
      setModalVisible(false);
      setTimeout(() => {
        setFileName('');
      }, 500);
    }
  };
  const renderPopup = () => {
    return (
      <View style={styles.popupView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.alertTitle}>Save Calculation</Text>
              <COMPONENT.TextField
                maxLength={15}
                value={fileName}
                title={'Name'}
                placeholder={'Enter Here'}
                secureTextEntry={false}
                onChangeText={(name: string) => {
                  setFileName(name);
                }}
              />
              <View style={styles.alertbuttonsContainer}>
                <COMPONENT.Button
                  title={'SAVE'}
                  type={'fill'}
                  onPress={() => validateName()}
                />

                <COMPONENT.Button
                  title={'CANCEL'}
                  type={'unfill'}
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </View>
          </View>
          <COMPONENT.Popup />
        </Modal>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Results'}
          infoMessage={props.infoMessages?.should_refinance_result}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        <ScrollView contentContainerStyle={styles.contentStyle}>
          {renderBlackBox()}
          <COMPONENT.ChartDetail data={data} column={2} />
          {!isSaved && !props.isGuest && (
            <View style={styles.buttonContainer}>
              <COMPONENT.Button
                title={'SAVE'}
                type={'fill'}
                onPress={() => setModalVisible(true)}
              />
            </View>
          )}
        </ScrollView>
        {renderPopup()}
        {disclaimer && renderDesription()}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  //loading: state.calculation.loading,
  calculatedData: state.calculation.calculatedData,
  infoMessages: state.auth.infoMessages,
  isGuest: state.common.isGuest,
  // isGuest,
});
export default connect(mapStateToProps, {
  OpenValidationAlert,
  saveCalculation,
})(AffordabilityResult);
