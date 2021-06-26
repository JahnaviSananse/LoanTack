import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import {
  clearDefaultData,
  getDefault,
  shouldIRefinanceCalculation,
} from 'src/redux/actions/calculation';
import { closeModal, OpenValidationAlert } from 'src/redux/actions/common';
import { updateInfoModal } from 'src/redux/actions/modal';
import { IReduxState } from 'src/redux/reducers';
import * as Router from 'src/routes/router';
import styles from './styles';

interface IShouldRefinanceProps {
  defaultData: any;
  getDefault: Function;
  shouldIRefinanceCalculation: Function;
  loading: boolean;
  OpenValidationAlert: Function;
  closeModal: Function;
  sirError: string;
  clearDefaultData: Function;
  infoMessages: any;
  updateInfoModal: Function;
}

const ShouldIRefinanceBO = (props: IShouldRefinanceProps) => {
  const navigation = useNavigation();
  const defaultData = JSON.parse(JSON.stringify(props.defaultData));
  //data
  let interest_rate_max = props.defaultData ? defaultData.interest_rate_max : 0;
  let interest_rate_min = props.defaultData ? defaultData.interest_rate_min : 0;
  let new_loan_amount_max = props.defaultData
    ? defaultData.new_loan_amount_max
    : 0;
  let new_loan_amount_min = props.defaultData
    ? defaultData.new_loan_amount_min
    : 0;
  let mortgage_term_arr: any[] = props.defaultData
    ? defaultData.mortgage_term_arr
    : [];
  let origial_year_arr = props.defaultData ? defaultData.origial_year_arr : [];
  let original_loan_amount_max = props.defaultData
    ? defaultData.original_loan_amount_max
    : 0;
  let original_loan_amount_min = props.defaultData
    ? defaultData.original_loan_amount_min
    : 0;
  let original_mortgage_term_arr = props.defaultData
    ? defaultData.original_mortgage_term_arr
    : [];
  let refinance_fees = props.defaultData ? defaultData.refinance_fees : 0;

  const [termData, setTermData] = React.useState([
    { label: '5 Years', value: '5' },
    { label: '10 Years', value: '10' },
    { label: '20 Years', value: '20' },
    { label: '30 Years', value: '30' },
  ]);
  const [newTermData, setNewTermData] = React.useState([
    { label: '5 Years', value: '5' },
    { label: '10 Years', value: '10' },
    { label: '20 Years', value: '20' },
    { label: '30 Years', value: '30' },
  ]);
  const [yearData, setYearData] = React.useState([
    { label: '2008', value: '2008' },
    { label: '2009', value: '2009' },
    { label: '2010', value: '2010' },
    { label: '2011', value: '2011' },
    { label: '2012', value: '2012' },
    { label: '2013', value: '2013' },
    { label: '2014', value: '2014' },
    { label: '2015', value: '2015' },
  ]);
  const [originalTerm, setOriginalTerm] = React.useState('5');
  const [newTerm, setNewTerm] = React.useState('10');
  const [year, setYear] = React.useState('2008');
  const [HOAValue, setHOAValue] = React.useState('0');
  const [oLoanAmount, setOLoanAmount] = React.useState('0');
  const [oInterestRate, setOInterestRate] = React.useState('0');
  const [nLoanAmount, setNLoanAmount] = React.useState('0');
  const [nInterestRate, setNInterestRate] = React.useState('0');

  const [oldLoan, setOldloan] = React.useState([
    {
      title: 'Original Loan Amount',
      signature: '$',
      amt: 0,
      value: 0,
    },
    {
      title: 'Original Interest Rate',
      signature: '%',
      amt: 0,
      value: 0,
    },
  ]);
  const [newLoan, setNewLoan] = React.useState([
    {
      title: 'New Loan Amount',
      signature: '$',
      amt: 0,
      value: 0,
    },
    {
      title: 'New Interest Rate',
      signature: '%',
      amt: 0,
      value: 0,
    },
  ]);

  React.useEffect(() => {
    props.getDefault('should_refinance');
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      props.clearDefaultData();
    });
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    if (
      props.defaultData &&
      !props.loading &&
      Object.keys(props.defaultData).length > 0
    ) {
      let originalYear = JSON.parse(JSON.stringify(origial_year_arr));
      let tempOYear: any = [];
      setYear(originalYear[0].toString());
      originalYear.map((item: any) => {
        tempOYear.push({
          label: item.toString(),
          value: item.toString(),
        });
      });
      setYearData(tempOYear);

      let tempOMTerm: any = [];
      let oMorgageTerm = JSON.parse(JSON.stringify(original_mortgage_term_arr));
      setOriginalTerm(oMorgageTerm[0].toString());
      oMorgageTerm.map((item: any) => {
        tempOMTerm.push({
          label: item.toString() + ' Years',
          value: item.toString(),
        });
      });
      setTermData(tempOMTerm);

      let tempNMTerm: any = [];
      let nMorgageTerm = JSON.parse(JSON.stringify(mortgage_term_arr));
      setNewTerm(nMorgageTerm[0].toString());
      nMorgageTerm.map((item: any) => {
        tempNMTerm.push({
          label: item.toString() + ' Years',
          value: item.toString(),
        });
      });
      setNewTermData(tempNMTerm);
    }
    if (props.sirError && !props.loading) {
      let obj = {
        message: props.sirError !== undefined ? props.sirError : '',
        type: 'failure',
      };
      setTimeout(() => {
        props.OpenValidationAlert(obj);
      }, 500);
    }
  }, [props.defaultData, props.sirError]);

  const CalculateShouldRefinance = () => {
    let message = '';
    if (HOAValue === '') {
      message = 'Please enter Refinance Fees';
      let obj = {
        message: message,
        type: 'failure',
      };
      props.OpenValidationAlert(obj);
    } else {
      let request: any = {};
      let oData = JSON.parse(JSON.stringify(oldLoan));
      let nData = JSON.parse(JSON.stringify(newLoan));
      request.original_loan_amount = parseFloat(oData[0].amt);
      request.new_loan_amount = parseFloat(nData[0].amt);
      request.original_interest_rate = parseFloat(oData[1].amt);
      request.interest_rate = parseFloat(nData[1].amt);
      request.original_year = parseInt(year);
      request.refinance_fees = HOAValue ? parseFloat(HOAValue) : 0;
      //request.refinance_fees = 0;
      request.original_mortgage_term = parseInt(originalTerm);
      request.mortgage_term = parseInt(newTerm);
      props.shouldIRefinanceCalculation(request);
    }
  };

  const renderPicker = (currentData: any, type: number) => {
    return (
      <COMPONENT.Picker
        data={currentData}
        onValueChange={(value: any) => {
          if (type === 1) {
            setOriginalTerm(value);
          } else if (type === 2) {
            setYear(value);
          } else {
            setNewTerm(value);
          }
        }}
        value={returnPickerValue(type)}
      />
    );
  };

  const returnPickerValue = (type: any) => {
    switch (type) {
      case 1:
        return originalTerm;
      case 2:
        return year;
      case 3:
        return newTerm;
    }
  };
  return (
    <KeyboardAvoidingView
      //behavior="position"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title="Should I Refinance?"
          rightClick={() => {
            props.updateInfoModal(
              true,
              'Should I Refinance?',
              props.infoMessages?.should_refinance,
            );
          }}
          rightImg={IMAGES.IC_HEADER_INFO}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => Router.goBack()}
        />
        <ScrollView style={styles.scrollView}>
          <View style={[styles.hzLine, { marginTop: 10 }]} />
          <Text style={styles.boldTitle}>{'Your Original Loan'}</Text>
          <View style={styles.hzLine} />
          {oldLoan.map((item, index) => {
            let sliderValue = 0;
            let minValue = 0;
            let maxValue = 0;
            if (index === 0) {
              // console.log('S Value', oldLoan);
              sliderValue = oldLoan[0].amt ? oldLoan[0].amt : 0;
              minValue = props.defaultData ? original_loan_amount_min : 0;
              maxValue = props.defaultData ? original_loan_amount_max : 0;
            } else {
              sliderValue = oldLoan[1].amt ? oldLoan[1].amt : 0;
              minValue = props.defaultData ? interest_rate_min : 0;
              maxValue = props.defaultData ? interest_rate_max : 0;
            }
            return (
              <>
                <View style={styles.viewContainer}>
                  <Text style={styles.text}>{item.title}</Text>
                  {index === 0 ? (
                    <COMPONENT.PriceBox
                      sign={item.signature}
                      title={oLoanAmount}
                      width={120}
                      onChangeText={(value: number) => {
                        setOLoanAmount(value.toString());
                      }}
                      onEndEditing={() => {
                        if (oLoanAmount <= original_loan_amount_max) {
                          let currentData = JSON.parse(JSON.stringify(oldLoan));
                          currentData[index].amt = oLoanAmount;
                          setOldloan(currentData);
                        } else {
                          setOLoanAmount('0');
                          let currentData = JSON.parse(JSON.stringify(oldLoan));
                          currentData[index].amt = 0;
                          setOldloan(currentData);
                        }
                      }}
                    />
                  ) : (
                    <COMPONENT.PriceBox
                      sign={item.signature}
                      title={oInterestRate}
                      width={120}
                      onChangeText={(value: number) => {
                        setOInterestRate(value.toString());
                      }}
                      onEndEditing={() => {
                        if (oInterestRate <= interest_rate_max) {
                          let currentData = JSON.parse(JSON.stringify(oldLoan));
                          currentData[index].amt = oInterestRate;
                          setOldloan(currentData);
                        } else {
                          setOInterestRate('0');
                          let currentData = JSON.parse(JSON.stringify(oldLoan));
                          currentData[index].amt = 0;
                          setOldloan(currentData);
                        }
                      }}
                    />
                  )}
                </View>
                <COMPONENT.Slider
                  value={parseInt(sliderValue)}
                  minValue={minValue}
                  maxValue={maxValue}
                  showPercentage={false}
                  percentage={0}
                  onValueChange={(value: any) => {
                    console.log('Slider Value', Math.round(value));
                    if (index === 0) {
                      let currentData = JSON.parse(JSON.stringify(oldLoan));
                      currentData[0].amt = Math.round(value);
                      setOLoanAmount(Math.round(value).toString());
                      setOldloan(currentData);
                      console.log('oldLoan', oldLoan);
                    } else {
                      let currentData = JSON.parse(JSON.stringify(oldLoan));
                      currentData[1].amt = Math.round(value);
                      setOldloan(currentData);
                      setOInterestRate(Math.round(value).toString());
                    }
                  }}
                />
              </>
            );
          })}
          <Text style={styles.title}>{'Origination Year'}</Text>
          {renderPicker(yearData, 2)}
          <Text style={styles.title}>{'Original Term'}</Text>
          {renderPicker(termData, 1)}
          <View style={[styles.hzLine, { marginTop: 20 }]} />
          <Text style={styles.boldTitle}>{'Your New Loan'}</Text>
          <View style={styles.hzLine} />
          <View style={{ marginVertical: 20 }}>
            {newLoan.map((item, index) => {
              let sliderValue = 0;
              let minValue = 0;
              let maxValue = 0;
              if (index === 0) {
                sliderValue = newLoan[0].amt ? newLoan[0].amt : 0;
                minValue = props.defaultData ? new_loan_amount_min : 0;
                maxValue = props.defaultData ? new_loan_amount_max : 0;
              } else {
                sliderValue = newLoan[1].amt ? newLoan[1].amt : 0;
                minValue = props.defaultData ? interest_rate_min : 0;
                maxValue = props.defaultData ? interest_rate_max : 0;
              }
              return (
                <>
                  <View style={styles.viewContainer}>
                    <Text style={styles.text}>{item.title}</Text>
                    {index === 0 ? (
                      <COMPONENT.PriceBox
                        sign={item.signature}
                        title={nLoanAmount}
                        width={120}
                        onChangeText={(value: number) => {
                          setNLoanAmount(value.toString());
                        }}
                        onEndEditing={() => {
                          if (nLoanAmount <= new_loan_amount_max) {
                            let currentData = JSON.parse(
                              JSON.stringify(newLoan),
                            );
                            currentData[index].amt = nLoanAmount;
                            setNewLoan(currentData);
                          } else {
                            setNLoanAmount('0');
                            let currentData = JSON.parse(
                              JSON.stringify(newLoan),
                            );
                            currentData[index].amt = 0;
                            setNewLoan(currentData);
                          }
                        }}
                      />
                    ) : (
                      <COMPONENT.PriceBox
                        sign={item.signature}
                        title={nInterestRate}
                        width={120}
                        onChangeText={(value: number) => {
                          setNInterestRate(value.toString());
                        }}
                        onEndEditing={() => {
                          if (nInterestRate <= interest_rate_max) {
                            let currentData = JSON.parse(
                              JSON.stringify(newLoan),
                            );
                            currentData[index].amt = nInterestRate;
                            setNewLoan(currentData);
                          } else {
                            setNInterestRate('0');
                            let currentData = JSON.parse(
                              JSON.stringify(newLoan),
                            );
                            currentData[index].amt = 0;
                            setNewLoan(currentData);
                          }
                        }}
                      />
                    )}
                  </View>
                  <COMPONENT.Slider
                    value={parseInt(sliderValue)}
                    minValue={minValue}
                    maxValue={maxValue}
                    showPercentage={false}
                    percentage={0}
                    onValueChange={(value: any) => {
                      if (index === 0) {
                        let currentData = JSON.parse(JSON.stringify(newLoan));
                        currentData[0].amt = Math.round(value);
                        setNLoanAmount(Math.round(value).toString());
                        setNewLoan(currentData);
                      } else {
                        let currentData = JSON.parse(JSON.stringify(newLoan));
                        currentData[1].amt = Math.round(value);
                        setNInterestRate(Math.round(value).toString());
                        setNewLoan(currentData);
                      }
                    }}
                  />
                </>
              );
            })}
            <Text style={styles.title}>{'Refinance Fees'}</Text>
            <COMPONENT.SignatureTextInput
              isLeft={true}
              sign={'$'}
              placeholder={'0.00'}
              value={HOAValue}
              onChangeText={(text: any) => {
                setHOAValue(text);
              }}
              keyboardType={'default'}
              customStyle={styles.textInputCustom}
            />
            <Text style={styles.title}>{'New Term'}</Text>
            {renderPicker(newTermData, 3)}
            <View style={styles.buttonContainer}>
              <COMPONENT.Button
                title={'CALCULATE'}
                type={'fill'}
                onPress={() => {
                  CalculateShouldRefinance();
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <COMPONENT.Popup />
      <COMPONENT.Loader isLoading={props.loading} />
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  defaultData: state.calculation.defaultData,
  loading: state.calculation.loading,
  sirError: state.calculation.sirError,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  getDefault,
  shouldIRefinanceCalculation,
  OpenValidationAlert,
  closeModal,
  clearDefaultData,
  updateInfoModal,
})(ShouldIRefinanceBO);
