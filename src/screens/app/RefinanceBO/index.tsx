import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import { closeModal, OpenValidationAlert } from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';
interface IRefinanceBOProps {
  types: Object[];
  OpenValidationAlert: Function;
  closeModal: Function;
  typesError: string;
  infoMessages: any;
}
const RefinanceBO = (props: IRefinanceBOProps) => {
  const navigation = useNavigation();
  React.useEffect(() => {
    if (props.typesError) {
      setTimeout(() => {
        let obj = {
          message: props.typesError,
          type: 'failure',
        };
        props.OpenValidationAlert(obj);
      }, 500);
    }
  }, [props.typesError]);

  const renderItem = (item: any) => {
    if (item.name === 'Affordability' || item.name === 'Should I Refinance') {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.cellContainer}
        onPress={() => navigation.navigate(item.name + 'RefinanceBO')}
      >
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.saperator} />
      </TouchableOpacity>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAwareL}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Refinance'}
          infoMessage={props.infoMessages?.calculator_refinance_info}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        <FlatList
          scrollEnabled={false}
          data={props.types}
          style={styles.flatStyle}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => renderItem(item)}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  types: state.calculation.types,
  typesError: state.calculation.typesError,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  OpenValidationAlert,
  closeModal,
})(RefinanceBO);
