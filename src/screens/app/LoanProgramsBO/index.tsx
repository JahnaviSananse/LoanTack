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
import { getLoanProgram, getLoanProgramDetail } from 'src/redux/actions/guide';
import { IReduxState } from 'src/redux/reducers';
import * as modalInfo from 'src/redux/types/modalDescription';
import styles from './styles';

const data = [
  { title: 'FHA', redirect: 'FHAPurchaseBO' },
  { title: 'Conventional', redirect: 'ConventionalPurchaseBO' },
  { title: 'Jumbo', redirect: 'JumboPurchaseBO' },
  { title: 'USDA', redirect: 'USDAPurchaseBO' },
  { title: 'VA', redirect: 'VAPurchaseBO' },
];
const desc =
  'Browse loan programs to learn about your eligibility and the requirements for each. Read the minimum credit, debit, and down payment standard for each loan type to evaluate the best option for you.';

interface ILoanProgramBOProps {
  loading: boolean;
  loanprogram: any;
  getLoanProgram: Function;
  getLoanProgramDetail: Function;
  infoMessages: any;
}

const LearningCenterBO = (props: ILoanProgramBOProps) => {
  const navigation = useNavigation();
  const [loandata, setLoandata] = React.useState([]);
  const [showAlert, setShowAlert] = React.useState(false);
  React.useEffect(() => {
    props.getLoanProgram();
  }, []);
  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.cellContainer}
        onPress={() => {
          props.getLoanProgramDetail(item.id);
          setTimeout(() => {
            navigation.navigate('LoanProgramsDetailBO');
          }, 500);
        }}
      >
        <Text numberOfLines={1} style={styles.title}>
          {item.name}
        </Text>
        <View style={styles.saperator} />
      </TouchableOpacity>
    );
  };
  const closeAlert = () => {
    setShowAlert(false);
  };

  React.useEffect(() => {
    if (props.loanprogram.length > 0) {
      setLoandata(props.loanprogram);
    }
  }, [props.loanprogram]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAwareL}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Loan Programs'}
          infoMessage={props.infoMessages?.loan_programs_info}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          rightOneClick={() => setShowAlert(true)}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
          popupInfo={{
            title: modalInfo.default.loanProgramTitle,
            description: modalInfo.default.loanProgramDescription,
          }}
        />
        <FlatList
          scrollEnabled={true}
          data={loandata}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => renderItem(item)}
        />
        <COMPONENT.InfoPopup
          title={'Loan Programs'}
          visible={showAlert}
          desciption={desc}
          closeAlert={() => closeAlert()}
        />
        <COMPONENT.Loader isLoading={props.loading} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.guide.loading,
  loanprogram: state.guide.loanprogram,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  getLoanProgram,
  getLoanProgramDetail,
})(LearningCenterBO);
