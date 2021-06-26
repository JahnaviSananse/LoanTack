import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import {
  clearDefaultData,
  getCounty,
  getDefault,
  jumboRefinanceCalculation,
} from 'src/redux/actions/calculation';
import { closeModal, OpenValidationAlert } from 'src/redux/actions/common';
import { updateInfoModal } from 'src/redux/actions/modal';
import { IReduxState } from 'src/redux/reducers';
import * as Router from 'src/routes/router';
import styles from './styles';
interface IJumboProps {
  defaultData: any;
  getDefault: Function;
  jumboRefinanceCalculation: Function;
  loading: boolean;
  OpenValidationAlert: Function;
  closeModal: Function;
  jumboRefinanceError: string;
  clearDefaultData: Function;
  getCounty: Function;
  county: any[];
  infoMessages: any;
  updateInfoModal: Function;
}

const JumboRefinanceBO = (props: IJumboProps) => {
  const navigation = useNavigation();
  const defaultData = JSON.parse(JSON.stringify(props.defaultData));
  let hazard_insurance: any = props.defaultData
    ? JSON.stringify(defaultData.hazard_insurance)
    : 0;
  let max_interest_rate = props.defaultData ? defaultData.max_interest_rate : 0;
  let min_interest_rate = props.defaultData ? defaultData.min_interest_rate : 0;
  let mortgage_term: number = props.defaultData
    ? parseInt(defaultData.mortgage_term)
    : 0;
  let new_loan_amount = props.defaultData ? defaultData.new_loan_amount : 0;
  let new_loan_amount_max = props.defaultData
    ? defaultData.new_loan_amount_max
    : 0;
  let property_price = props.defaultData ? defaultData.property_price : 0;
  let property_price_max = props.defaultData
    ? defaultData.property_price_max
    : 0;
  let property_price_min = props.defaultData
    ? defaultData.property_price_min
    : 0;
  let property_tax = props.defaultData ? defaultData.property_tax : 0;
  let interest_rate: Object[] = props.defaultData
    ? defaultData.interest_rate
    : [{}];
  let credits: Object[] = props.defaultData ? defaultData.credits : [{}];
  let credit_id: string = props.defaultData ? defaultData.credit_id : '';
  let states: any = props.defaultData ? defaultData.states : [];

  const [termData, setTermData] = React.useState([
    { label: '5 Years', value: '5' },
    { label: '10 Years', value: '10' },
    { label: '20 Years', value: '20' },
    { label: '30 Years', value: '30' },
  ]);
  const [creditData, setCreditData] = React.useState([
    { label: '200-400 (bad)', value: 'bad' },
    { label: '499-680 (Good)', value: 'Good' },
    { label: '680-719 (Excellent)', value: 'Excellent' },
  ]);

  const [mortgageTerm, setMortgageTerm] = React.useState('');
  const [credit, setCredit] = React.useState('Good');
  const [term, setTerm] = React.useState('10');
  const [state, setState] = React.useState(1);
  const [HOAValue, setHOAValue] = React.useState('');
  const [InsuranceValue, setInsuranceValue] = React.useState('');
  const [PropertyPercentage, setPropertyPercenatge] = React.useState('');
  const [PropertyAmount, setPropertyAmount] = React.useState('');
  const [advOpen, setAdvOpen] = React.useState(false);

  const [newLoanAmount, setNewLoanAmount] = React.useState('0');
  const [newLoanAmountMax, setNewLoanAmountMax] = React.useState(0);
  const [selectedCounty, setSelectedCounty] = React.useState(1);
  const [stateList, setStateList] = React.useState([]);
  const [countyList, setCountyList] = React.useState([]);
  const [interest, setInterest] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [data, setData] = React.useState([
    {
      title: 'Property Price',
      signature: '$',
      amt: 0,
      value: 0,
    },
    {
      title: 'New Loan Amount',
      signature: '$',
      amt: 0,
      value: 0,
    },
    {
      title: 'Interest Rate',
      signature: '%',
      amt: 0,
      value: 0,
    },
  ]);

  React.useEffect(() => {
    props.getDefault('jumbo');
    props.getCounty(1);
  }, []);

  React.useEffect(() => {
    if (props.county) {
      let temp: any = [];
      let cData = JSON.parse(JSON.stringify(props.county));
      cData.map((item: any) => {
        temp.push({
          label: item.name,
          value: item.id,
        });
      });
      setCountyList(temp);
    }
  }, [props.county]);

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
      let temp: any = [];
      let tempCredit: any = [];
      let currentInterest = 0;
      let stateArray = JSON.parse(JSON.stringify(states));
      let tempState: any = [];
      stateArray.map((item: any) => {
        tempState.push({
          label: item.name,
          value: item.id,
        });
      });
      setStateList(tempState);
      let myCredits = JSON.parse(JSON.stringify(credits));
      myCredits.map((item: any) => {
        tempCredit.push({
          label: item.value + '',
          value: item.id,
        });
      });
      setCreditData(tempCredit);
      let myArray = JSON.parse(JSON.stringify(interest_rate));
      myArray.map((item: any, index: number) => {
        if (index === 1) {
          currentInterest = item.value;
          setMortgageTerm(item.year);
          setTerm(item.year);
        }
        if (item.year == mortgage_term) {
          currentInterest = item.value;
          setMortgageTerm(item.year);
          setTerm(item.year);
        }
        temp.push({
          label: item.year + ' Years',
          value: item.year,
        });
      });
      setNewLoanAmount(((property_price * 80) / 100).toFixed(0));
      setNewLoanAmountMax((property_price * 97.75) / 100);
      setTermData(temp);
      setCredit(credit_id);
      setInsuranceValue(hazard_insurance);
      setPropertyPercenatge(property_tax.toString());
      setPrice(property_price);
      let amt = (property_price * property_tax) / 100;
      setPropertyAmount(amt.toString());
      setInterest(currentInterest);
      setData([
        {
          title: 'Property Price',
          signature: '$',
          amt: property_price,
          // amt: (property_price * 80) / 100,
          value: 0,
        },
        {
          title: 'New Loan Amount',
          signature: '$',
          // amt: property_price,
          amt: (property_price * 80) / 100,
          value: 0,
        },
        {
          title: 'Interest Rate',
          signature: '%',
          amt: currentInterest,
          value: 0,
        },
      ]);
    }
    if (props.jumboRefinanceError && !props.loading) {
      let obj = {
        message:
          props.jumboRefinanceError !== undefined
            ? props.jumboRefinanceError
            : '',
        type: 'failure',
      };
      setTimeout(() => {
        props.OpenValidationAlert(obj);
      }, 200);
    }
  }, [props.defaultData, props.jumboRefinanceError]);

  const validateForm = () => {
    let currentData = JSON.parse(JSON.stringify(data));
    let message = '';
    let isValidate = false;
    if (currentData[0].amt === '0' || currentData[0].amt <= 0) {
      message = 'Please enter';
    } else if (currentData[1].amt === '0' || currentData[1].amt <= 0) {
      message = 'Please enter new loan amount';
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
      CalculateJumbo();
    }
  };
  const CalculateJumbo = () => {
    let request: any = {};
    let cData = JSON.parse(JSON.stringify(data));
    request.category = 'refinance';
    request.credit_id = credit;
    // request.property_price = parseFloat(cData[1].amt);
    // request.new_loan_amount = parseFloat(cData[0].amt);
    request.property_price = parseFloat(cData[0].amt);
    request.new_loan_amount = parseFloat(cData[1].amt);
    request.interest_rate = parseFloat(cData[2].amt);
    request.annual_property_tax = parseFloat(PropertyPercentage);
    request.hazard_insurance =
      InsuranceValue !== '' ? parseInt(InsuranceValue) : 0;
    request.monthly_hoa = HOAValue !== '' ? parseInt(HOAValue) : 0;
    request.mortgage_term = term;
    props.jumboRefinanceCalculation(request);
  };

  const renderPicker = (currentdata: any, type: number) => {
    return (
      <COMPONENT.Picker
        data={currentdata}
        onValueChange={(value: any, label: any) => {
          if (type === 1) {
            setTerm(value);
            setMortgageTerm(value);
            let myArray = JSON.parse(JSON.stringify(interest_rate));
            let currentData = JSON.parse(JSON.stringify(data));
            currentData[2].amt = myArray[label].value;
            setInterest(myArray[label].value);
            setData(currentData);
          } else if (type === 2) {
            setState(value);
            props.getCounty(parseInt(value));
          } else if (type === 3) {
            setSelectedCounty(value);
          } else {
            setCredit(value);
          }
        }}
        value={returnPickerValue(type)}
      />
    );
  };
  const returnPickerValue = (type: any) => {
    switch (type) {
      case 1:
        return term;
      case 2:
        return state;
      case 3:
        return selectedCounty;
      case 4:
        return credit;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <COMPONENT.Header
        title="Jumbo Refinance"
        rightClick={() => {
          props.updateInfoModal(
            true,
            'Jumbo Refinance',
            props.infoMessages?.calculator_refinance_details,
          );
        }}
        rightImg={IMAGES.IC_HEADER_INFO}
        leftImg={IMAGES.IC_BACK}
        leftClick={() => Router.goBack()}
      />
      {props.loading && <View style={styles.emptyContainer} />}
      <KeyboardAwareScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {data.map((item, index) => {
            let sliderValue = item.value;
            let minValue = 0;
            let maxValue = 0;
            if (index === 0) {
              sliderValue = data[0].amt ? data[0].amt : 0;
              // minValue = 0;
              // maxValue = props.defaultData ? newLoanAmountMax : 0;
              minValue = props.defaultData ? property_price_min : 0;
              maxValue = props.defaultData ? property_price_max : 0;
            } else if (index === 1) {
              sliderValue = data[1].amt ? data[1].amt : 0;
              // minValue = props.defaultData ? property_price_min : 0;
              // maxValue = props.defaultData ? property_price_max : 0;
              minValue = 0;
              maxValue = props.defaultData ? newLoanAmountMax : 0;
            } else {
              sliderValue = data[2].amt ? data[2].amt : 0;
              minValue = props.defaultData ? min_interest_rate : 0;
              maxValue = props.defaultData ? max_interest_rate : 0;
            }
            return (
              <>
                <View style={styles.viewContainer}>
                  <Text style={styles.text}>{item.title}</Text>
                  {index === 1 ? (
                    <COMPONENT.PriceBox
                      sign={item.signature}
                      title={newLoanAmount}
                      maxLength={10}
                      width={120}
                      onEndEditing={() => {
                        if (parseFloat(newLoanAmount) <= newLoanAmountMax) {
                          let currentData = JSON.parse(JSON.stringify(data));
                          currentData[index].amt = newLoanAmount;
                          setData(currentData);
                        } else {
                          setNewLoanAmount(((price * 80) / 100).toFixed(0));
                          let currentData = JSON.parse(JSON.stringify(data));
                          currentData[index].amt = (price * 80) / 100;
                          setData(currentData);
                        }
                      }}
                      onChangeText={(value: number) => {
                        setNewLoanAmount(value.toString());
                      }}
                    />
                  ) : index === 0 ? (
                    <COMPONENT.PriceBox
                      sign={item.signature}
                      title={price}
                      width={120}
                      maxLength={
                        property_price_max
                          ? property_price_max.toString().length + 3
                          : 10
                      }
                      onEndEditing={() => {
                        if (
                          price <= property_price_max &&
                          price >= property_price_min
                        ) {
                          let currentData = JSON.parse(JSON.stringify(data));
                          currentData[1].amt = (price * 80) / 100;
                          currentData[0].amt = Math.round(price);
                          let amt =
                            (currentData[0].amt *
                              parseFloat(PropertyPercentage)) /
                            100;
                          setPropertyAmount(amt.toString());
                          setPrice(Math.round(price));
                          setData(currentData);
                          setTimeout(() => {
                            setNewLoanAmountMax((price * 97.75) / 100);
                            setNewLoanAmount(((price * 80) / 100).toFixed(0));
                          }, 10);
                        } else {
                          let final =
                            property_price > property_price_min
                              ? property_price
                              : property_price_min;
                          setNewLoanAmountMax((final * 97.75) / 100);
                          let amt = (final * property_tax) / 100;
                          setPropertyAmount(amt.toString());
                          setPrice(final);
                          setNewLoanAmount(((final * 80) / 100).toFixed(0));
                          let currentData = JSON.parse(JSON.stringify(data));
                          let cPrice = final;
                          let per = final * 100;
                          per = per / cPrice;
                          currentData[1].amt = (final * 80) / 100;
                          currentData[0].amt = final;
                          currentData[0].value = property_price > 0 ? per : 0;
                          setData(currentData);
                        }
                      }}
                      onChangeText={(value: number) => {
                        setPrice(value);
                      }}
                    />
                  ) : (
                    <COMPONENT.PriceBox
                      sign={item.signature}
                      title={interest}
                      width={120}
                      maxLength={6}
                      onEndEditing={() => {
                        if (
                          interest <= max_interest_rate &&
                          interest >= min_interest_rate
                        ) {
                          let currentData = JSON.parse(JSON.stringify(data));
                          let price =
                            currentData[2].amt > 0
                              ? currentData[2].amt
                              : 400000;
                          let per = currentData[2].amt * 100;
                          per = per / price;
                          currentData[2].amt = interest;
                          currentData[2].value = interest > 0 ? per : 0;
                          setData(currentData);
                        } else {
                          setInterest(min_interest_rate);
                        }
                      }}
                      onChangeText={(value: number) => {
                        if (value <= max_interest_rate) {
                          setInterest(value);
                        }
                      }}
                    />
                  )}
                </View>
                <COMPONENT.Slider
                  value={
                    index === 2
                      ? parseFloat(sliderValue)
                      : parseInt(sliderValue)
                  }
                  minValue={minValue}
                  maxValue={maxValue}
                  showPercentage={false}
                  percentage={0}
                  onValueChange={(value: any) => {
                    if (index === 0) {
                      // setNewLoanAmount(Math.round(value).toString());
                      // let currentData = JSON.parse(JSON.stringify(data));
                      // currentData[0].amt = Math.round(value);
                      // setData(currentData);
                      let currentData = JSON.parse(JSON.stringify(data));
                      currentData[1].amt = (value * 80) / 100;
                      currentData[0].amt = Math.round(value);
                      setNewLoanAmount(((value * 80) / 100).toFixed(0));
                      setNewLoanAmountMax((value * 97.75) / 100);
                      setData(currentData);
                      let amt =
                        (currentData[0].amt * parseFloat(PropertyPercentage)) /
                        100;
                      setPropertyAmount(amt.toFixed(2));
                      setPrice(Math.round(value));
                      setData(currentData);
                    } else if (index === 1) {
                      setNewLoanAmount(Math.round(value).toString());
                      let currentData = JSON.parse(JSON.stringify(data));
                      currentData[1].amt = Math.round(value);
                      setData(currentData);
                      // let currentData = JSON.parse(JSON.stringify(data));
                      // currentData[0].amt = (value * 80) / 100;
                      // currentData[1].amt = Math.round(value);
                      // setNewLoanAmount(((value * 80) / 100).toFixed(0));
                      // setNewLoanAmountMax((value * 97.75) / 100);
                      // setData(currentData);
                      // let amt =
                      //   (currentData[1].amt * parseFloat(PropertyPercentage)) /
                      //   100;
                      // setPropertyAmount(amt.toString());
                      // setPrice(Math.round(value));
                      // setData(currentData);
                    } else {
                      setInterest(value.toFixed(2));
                      let currentData = JSON.parse(JSON.stringify(data));
                      currentData[2].amt = Math.round(value);
                      setData(currentData);
                    }
                  }}
                />
              </>
            );
          })}
          <TouchableOpacity
            onPress={() => setAdvOpen(!advOpen)}
            style={styles.advStyle}
          >
            <Text style={styles.boldTitle}>{'Advanced'}</Text>
            <Image
              source={advOpen ? IMAGES.IC_UP_ARROW : IMAGES.IC_DOWN_ARROW}
              style={styles.iconContainer}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          {advOpen && (
            <View style={{ marginVertical: 20 }}>
              <Text style={styles.title}>{'Credit Score'}</Text>
              {renderPicker(creditData, 4)}
              <Text style={styles.title}>{'Desired Term'}</Text>
              {renderPicker(termData, 1)}
              <Text style={styles.title}>{'Monthly HOA'}</Text>
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
              <Text style={styles.title}>{'Annual Hazard Insurance'}</Text>
              <COMPONENT.SignatureTextInput
                isLeft={true}
                sign={'$'}
                placeholder={'0.00'}
                value={InsuranceValue}
                onChangeText={(text: any) => {
                  setInsuranceValue(text);
                }}
                keyboardType={'default'}
                customStyle={styles.textInputCustom}
              />
              <Text style={styles.title}>{'Annual Property Tax'}</Text>
              <View style={styles.taxMainContainer}>
                <View style={styles.taxContainer}>
                  <COMPONENT.SignatureTextInput
                    isLeft={false}
                    sign={'%'}
                    maxLength={6}
                    placeholder={'0.00'}
                    value={PropertyPercentage}
                    onChangeText={(text: any) => {
                      setPropertyPercenatge(text);
                      let currentData = JSON.parse(JSON.stringify(data));
                      let amt = (currentData[0].amt * parseFloat(text)) / 100;
                      if (amt.toString() !== 'NaN') {
                        setPropertyAmount(amt.toFixed(2).toString());
                      } else {
                        setPropertyAmount('0');
                      }
                    }}
                    keyboardType={'default'}
                    customStyle={styles.textInputCustom}
                  />
                </View>
                <View style={styles.taxContainer}>
                  <COMPONENT.SignatureTextInput
                    isLeft={true}
                    sign={'$'}
                    maxLength={property_price_max}
                    placeholder={'0.00'}
                    value={PropertyAmount}
                    onChangeText={(text: any) => {
                      setPropertyAmount(text);
                      let currentData = JSON.parse(JSON.stringify(data));
                      let per = (parseFloat(text) * 100) / currentData[0].amt;
                      if (
                        per.toString() !== 'NaN' &&
                        per.toString() !== 'Infinity'
                      ) {
                        setPropertyPercenatge(per.toFixed(2).toString());
                      } else {
                        setPropertyPercenatge('0');
                      }
                    }}
                    keyboardType={'default'}
                    customStyle={styles.textInputCustom}
                  />
                </View>
              </View>
              <Text style={styles.title}>{'State'}</Text>
              {renderPicker(stateList, 2)}
              <Text style={styles.title}>{'County'}</Text>
              {renderPicker(countyList, 3)}
            </View>
          )}
          <View style={styles.buttonContainer}>
            <COMPONENT.Button
              title={'CALCULATE'}
              type={'fill'}
              onPress={() => validateForm()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <COMPONENT.Popup />
      <COMPONENT.Loader isLoading={props.loading} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  defaultData: state.calculation.defaultData,
  loading: state.calculation.loading,
  jumboRefinanceError: state.calculation.jumboRefinanceError,
  county: state.calculation.county,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  getCounty,
  getDefault,
  jumboRefinanceCalculation,
  OpenValidationAlert,
  closeModal,
  clearDefaultData,
  updateInfoModal,
})(JumboRefinanceBO);
