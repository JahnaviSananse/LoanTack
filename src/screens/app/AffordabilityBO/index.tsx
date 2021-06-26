import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import {
  affordabilityCalculation,
  clearDefaultData,
  getCounty,
  getDefault,
} from 'src/redux/actions/calculation';
import { closeModal, OpenValidationAlert } from 'src/redux/actions/common';
import { updateInfoModal } from 'src/redux/actions/modal';
import { IReduxState } from 'src/redux/reducers';
import * as Router from 'src/routes/router';
import styles from './styles';

const stateData = [
  {
    label: 'California',
    value: 'California',
    data: [
      { label: 'Alpine', value: 'Alpine' },
      { label: 'Calaveras', value: 'Calaveras' },
      { label: 'El Dorado', value: 'El Dorado' },
      { label: 'Los Angeles', value: 'Los Angeles' },
      { label: 'San Diego', value: 'San Diego' },
      { label: 'San Francisco', value: 'San Francisco' },
    ],
  },
  {
    label: 'Florida',
    value: 'Florida',
    data: [
      { label: 'Alachua', value: 'Alachua' },
      { label: 'Charlotte', value: 'Charlotte' },
      { label: 'Manatee', value: 'Manatee' },
      { label: 'Miami-Dade', value: 'Miami-Dade' },
      { label: 'Palm Beach', value: 'Palm Beach' },
      { label: 'Saint Johns', value: 'Saint Johns' },
    ],
  },
  {
    label: 'Texas',
    value: 'Texas',
    data: [
      { label: 'Armstrong', value: 'Armstrong' },
      { label: 'Brooks', value: 'Brooks' },
      { label: 'Collingsworth', value: 'Collingsworth' },
      { label: 'Crockett', value: 'Crockett' },
      { label: 'Kenedy', value: 'Kenedy' },
      { label: 'Shelby', value: 'Shelby' },
    ],
  },
  {
    label: 'Arizona',
    value: 'Arizona',
    data: [
      { label: 'Apache', value: 'Apache' },
      { label: 'Graham', value: 'Graham' },
      { label: 'Maricopa', value: 'Maricopa' },
      { label: 'Mohave', value: 'Mohave' },
      { label: 'Santa Cruz', value: 'Santa Cruz' },
      { label: 'Yavapai', value: 'Yavapai' },
    ],
  },
];

interface IAFDProps {
  defaultData: any;
  getDefault: Function;
  affordabilityCalculation: Function;
  loading: boolean;
  OpenValidationAlert: Function;
  closeModal: Function;
  clearDefaultData: Function;
  afdError: string;
  getCounty: Function;
  county: any[];
  infoMessages: any;
  updateInfoModal: Function;
}

const AffordabilityBO = (props: IAFDProps) => {
  const navigation = useNavigation();
  const defaultData = JSON.parse(JSON.stringify(props.defaultData));
  let downpayment_min = props.defaultData ? defaultData.downpayment_min : 0;
  let hazard_insurance: any = props.defaultData
    ? JSON.stringify(defaultData.hazard_insurance)
    : 0;
  let max_interest_rate = props.defaultData ? defaultData.max_interest_rate : 0;
  let min_interest_rate = props.defaultData ? defaultData.min_interest_rate : 0;
  let mortgage_term: number = props.defaultData
    ? parseInt(defaultData.mortgage_term)
    : 0;
  // let new_loan_amount = props.defaultData ? defaultData.new_loan_amount : 0;
  let property_price = props.defaultData ? defaultData.property_price : 0;
  // let property_price_max = props.defaultData
  //   ? defaultData.property_price_max
  //   : 0;
  // let property_price_min = props.defaultData
  //   ? defaultData.property_price_min
  //   : 0;
  let property_tax = props.defaultData ? defaultData.property_tax : 0;
  let interest_rate: Object[] = props.defaultData
    ? defaultData.interest_rate
    : [{}];
  let credits: Object[] = props.defaultData ? defaultData.credits : [{}];
  let credit_id: string = props.defaultData ? defaultData.credit_id : '';
  let states: any = props.defaultData ? defaultData.states : stateData;
  let annual_gross_income = props.defaultData
    ? defaultData.annual_gross_income
    : 0;
  let annual_gross_income_max = props.defaultData
    ? defaultData.annual_gross_income_max
    : 0;
  let annual_gross_income_min = props.defaultData
    ? defaultData.annual_gross_income_min
    : 0;

  let monthly_debts = props.defaultData ? defaultData.monthly_debts : 0;
  let monthly_debts_max = props.defaultData ? defaultData.monthly_debts_max : 0;
  let monthly_debts_min = props.defaultData ? defaultData.monthly_debts_min : 0;

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
  // const [mortgageTerm, setMortgageTerm] = React.useState('');
  const [credit, setCredit] = React.useState('');
  const [term, setTerm] = React.useState(10);
  const [state, setState] = React.useState(1);
  const [HOAValue, setHOAValue] = React.useState('');
  const [InsuranceValue, setInsuranceValue] = React.useState('');
  const [PropertyPercentage, setPropertyPercenatge] = React.useState('');
  const [PropertyAmount, setPropertyAmount] = React.useState('');
  const [advOpen, setAdvOpen] = React.useState(false);

  const [selectedCounty, setSelectedCounty] = React.useState(1);
  const [stateList, setStateList] = React.useState(stateData);
  const [countyList, setCountyList] = React.useState(stateData[0].data);
  const [downpayment, setDownPayment] = React.useState(0);
  const [interest, setInterest] = React.useState(0);
  const [annualIncome, setAnnualncome] = React.useState(0);
  const [monthlyDebts, setMonthlyDebts] = React.useState(0);
  const [dpValue, setDPValue] = React.useState(0);
  const [data, setData] = React.useState<any[]>([
    {
      title: 'Annual Gross Income',
      signature: '$',
      amt: 0,
      value: 0,
    },
    {
      title: 'Monthly Debts',
      signature: '$',
      amt: 0,
      value: 0,
    },
    {
      title: 'Down Payment',
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
    props.getDefault('affordability');
    props.getCounty(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.county]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      props.clearDefaultData();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  React.useEffect(() => {
    if (
      props.defaultData &&
      !props.loading &&
      Object.keys(props.defaultData).length > 0
    ) {
      let stateArray = JSON.parse(JSON.stringify(states));
      let tempState: any = [];
      stateArray.map((item: any) => {
        tempState.push({
          label: item.name,
          value: item.id,
        });
      });
      setStateList(tempState);
      let temp: any = [];
      let tempCredit: any = [];
      let currentInterest = 0;
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
        if (index === 0) {
          currentInterest = item.value;
          // setMortgageTerm(item.year);
          setTerm(item.year);
        }
        if (item.year == mortgage_term) {
          currentInterest = item.value;
          // setMortgageTerm(item.year);
          setTerm(item.year);
        }
        temp.push({
          label: item.year + ' Years',
          value: item.year,
        });
      });
      setDownPayment(downpayment_min);
      setInterest(currentInterest);
      setDPValue((annual_gross_income * downpayment_min) / 100);
      setTermData(temp);
      setCredit(credit_id);
      setInsuranceValue(hazard_insurance);
      setAnnualncome(annual_gross_income);
      setMonthlyDebts(monthly_debts);
      setPropertyPercenatge(property_tax.toString());
      let amt = (property_price * property_tax) / 100;
      setPropertyAmount(amt.toString());
      setData([
        {
          title: 'Annual Gross Income',
          signature: '$',
          amt: annual_gross_income,
          value: 0,
        },
        {
          title: 'Monthly Debts',
          signature: '$',
          amt: monthly_debts,
          value: 0,
        },
        {
          title: 'Down Payment',
          signature: '$',
          amt: 0,
          value: downpayment_min,
        },
        {
          title: 'Interest Rate',
          signature: '%',
          amt: currentInterest,
          value: 0,
        },
      ]);
    }
    if (props.afdError && !props.loading) {
      let obj = {
        message: props.afdError !== undefined ? props.afdError : '',
        type: 'failure',
      };
      setTimeout(() => {
        props.OpenValidationAlert(obj);
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultData, props.afdError]);

  const validateForm = () => {
    let currentData = JSON.parse(JSON.stringify(data));
    let message = '';
    let isValidate = false;
    if (currentData[0].amt === '0' || currentData[0].amt <= 0) {
      message = 'Please enter annual gross income';
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
      CalculateAffordability();
    }
  };
  const CalculateAffordability = () => {
    let request: any = {};
    let cData = JSON.parse(JSON.stringify(data));
    request.credit_id = credit;
    request.annual_gross_income = parseFloat(cData[0].amt);
    request.monthly_debts = parseFloat(cData[1].amt);
    request.downpayment_min = parseFloat(dpValue.toString());
    request.interest_rate = parseFloat(cData[3].amt);
    request.annual_property_tax = parseFloat(PropertyPercentage);
    request.hazard_insurance =
      InsuranceValue !== '' ? parseInt(InsuranceValue) : 0;
    request.monthly_hoa = HOAValue !== '' ? parseInt(HOAValue) : 0;
    request.mortgage_term = term;
    // console.log(request);
    props.affordabilityCalculation(request);
  };

  const renderPicker = (currentdata: any, type: number) => {
    return (
      <COMPONENT.Picker
        data={currentdata}
        onValueChange={(value: any, label: any) => {
          if (type === 1) {
            setTerm(value);
            // setMortgageTerm(value);
            let myArray = JSON.parse(JSON.stringify(interest_rate));
            let currentData = JSON.parse(JSON.stringify(data));
            currentData[3].amt = myArray[label].value;
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
        title="Affordability"
        rightClick={() => {
          props.updateInfoModal(
            true,
            'Affordability',
            props.infoMessages?.calculator_affordability_details,
          );
        }}
        rightImg={IMAGES.IC_HEADER_INFO}
        leftImg={IMAGES.IC_BACK}
        leftClick={() => Router.goBack()}
      />
      {props.loading && <View style={styles.emptyContainer} />}
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {data.map((item, index) => {
            let sliderValue: any = 0;
            let minValue = 0;
            let maxValue = 0;
            if (index === 0) {
              sliderValue = data[0].amt ? data[0].amt : 0;
              minValue = props.defaultData ? annual_gross_income_min : 0;
              maxValue = props.defaultData ? annual_gross_income_max : 400000;
            } else if (index === 1) {
              sliderValue = data[1].amt ? data[1].amt : 0;
              minValue = props.defaultData ? monthly_debts_min : 0;
              maxValue = props.defaultData ? monthly_debts_max : 400000;
            } else if (index === 2) {
              sliderValue = data[2].value ? data[2].value : 0;
              minValue = props.defaultData ? downpayment_min : 0;
              maxValue = 100;
            } else if (index === 3) {
              sliderValue = data[3].amt ? data[3].amt : 0;
              minValue = props.defaultData ? min_interest_rate : 0;
              maxValue = props.defaultData ? max_interest_rate : 100;
            }
            return (
              <>
                <View style={styles.viewContainer}>
                  <Text style={styles.text}>{item.title}</Text>
                  {/* {item.title === 'Down Payment' && (
                    <COMPONENT.PriceBox
                      sign={'%'}
                      width={80}
                      title={downpayment}
                      maxLength={6}
                      onEndEditing={() => {
                        if (
                          downpayment <= 100 &&
                          downpayment >= downpayment_min
                        ) {
                          let currentData = JSON.parse(JSON.stringify(data));
                          let cAnnualIncome =
                            currentData[0].amt > downpayment_min
                              ? currentData[0].amt
                              : 400000;
                          let per = (cAnnualIncome * downpayment) / 100;
                          per = per > 0 ? per : 0;
                          setDPValue(per);
                          currentData[index].amt = per;
                          currentData[index].value = downpayment && downpayment;
                          setData(currentData);
                        } else {
                          let currentData = JSON.parse(JSON.stringify(data));
                          currentData[index].value = downpayment_min;
                          setData(currentData);
                          setDownPayment(downpayment_min);
                          setDPValue((downpayment_min * annualIncome) / 100);
                        }
                      }}
                      onChangeText={(value: number) => {
                        if (value <= 100) {
                          setDownPayment(value);
                        }
                      }}
                    />
                  )} */}
                  <View>
                    {index === 0 ? (
                      <COMPONENT.PriceBox
                        sign={item.signature}
                        title={annualIncome}
                        width={120}
                        maxLength={
                          annual_gross_income_max
                            ? annual_gross_income_max.toString().length + 3
                            : 7
                        }
                        onEndEditing={() => {
                          if (
                            annualIncome <= annual_gross_income_max &&
                            annualIncome >= annual_gross_income_min
                          ) {
                            let currentData = JSON.parse(JSON.stringify(data));
                            let cPrice =
                              currentData[0].amt > 0
                                ? currentData[0].amt
                                : 400000;
                            let per = currentData[0].amt * 100;
                            per = per / cPrice;
                            currentData[0].amt = annualIncome;
                            currentData[0].value = annualIncome > 0 ? per : 0;
                            setDPValue((annualIncome * downpayment) / 100);
                            let val =
                              (currentData[0].amt * currentData[2].value) / 100;
                            currentData[2].amt = val.toFixed(2);
                            setData(currentData);
                          } else {
                            setDPValue(
                              (annual_gross_income_min * downpayment_min) / 100,
                            );
                            setAnnualncome(annual_gross_income_min);
                            let currentData = JSON.parse(JSON.stringify(data));
                            let cPrice = annual_gross_income_min;
                            let per = annual_gross_income_min * 100;
                            per = per / cPrice;
                            currentData[0].amt = annual_gross_income_min;
                            currentData[0].value =
                              annual_gross_income_min > 0 ? per : 0;
                            setData(currentData);
                          }
                        }}
                        onChangeText={(value: number) => {
                          if (value <= annual_gross_income_max) {
                            setAnnualncome(value);
                          }
                        }}
                      />
                    ) : index === 1 ? (
                      <COMPONENT.PriceBox
                        sign={item.signature}
                        title={monthlyDebts}
                        width={120}
                        maxLength={
                          monthly_debts_max
                            ? monthly_debts_max.toString().length + 3
                            : 7
                        }
                        onChangeText={(value: number) => {
                          if (value <= monthly_debts_max) {
                            setMonthlyDebts(value);
                          }
                        }}
                        onEndEditing={() => {
                          let currentData = JSON.parse(JSON.stringify(data));
                          let cIncome =
                            currentData[1].amt > 0
                              ? currentData[1].amt
                              : 400000;
                          let per = monthlyDebts * 100;
                          per = per / cIncome;
                          let count = (monthly_debts_min * monthly_debts) / 100;
                          if (
                            monthlyDebts >= monthly_debts_min &&
                            monthlyDebts <= monthly_debts_max
                          ) {
                            currentData[index].amt = monthlyDebts;
                            currentData[index].value =
                              monthlyDebts > 0 ? per : 0;
                            setDownPayment(per);
                            setData(currentData);
                          } else {
                            currentData[index].amt = monthly_debts;
                            currentData[index].value = count;
                            setData(currentData);
                            setMonthlyDebts(monthly_debts);
                          }
                        }}
                      />
                    ) : index === 2 ? (
                      <COMPONENT.PriceBox
                        sign={item.signature}
                        title={dpValue}
                        width={120}
                        maxLength={
                          annual_gross_income_max
                            ? annual_gross_income_max.toString().length + 3
                            : 7
                        }
                        onChangeText={(value: number) => {
                          if (value <= annualIncome) {
                            setDPValue(value);
                          }
                        }}
                        onEndEditing={() => {
                          let currentData = JSON.parse(JSON.stringify(data));
                          let count =
                            (annual_gross_income_min * downpayment_min) / 100;
                          let cIncome =
                            currentData[0].amt > 0
                              ? currentData[0].amt
                              : 400000;
                          let per = dpValue * 100;
                          per = per / cIncome;
                          if (
                            per >= downpayment_min &&
                            dpValue <= annual_gross_income_max &&
                            dpValue >= count
                          ) {
                            currentData[index].amt = dpValue;
                            currentData[index].value = dpValue > 0 ? per : 0;
                            setDownPayment(per);
                            setData(currentData);
                          } else {
                            currentData[index].amt = count;
                            currentData[index].value = downpayment_min;
                            setData(currentData);
                            setDownPayment(downpayment_min);
                            setDPValue((annualIncome * downpayment_min) / 100);
                          }
                        }}
                      />
                    ) : (
                      <COMPONENT.PriceBox
                        sign={item.signature}
                        title={interest}
                        width={120}
                        maxLength={
                          max_interest_rate
                            ? max_interest_rate.toString().length + 3
                            : 3
                        }
                        onEndEditing={() => {
                          if (
                            interest <= max_interest_rate &&
                            interest >= min_interest_rate
                          ) {
                            let currentData = JSON.parse(JSON.stringify(data));
                            let price =
                              currentData[3].amt > 0
                                ? currentData[3].amt
                                : 400000;
                            let per = currentData[3].amt * 100;
                            per = per / price;
                            currentData[3].amt = interest;
                            currentData[3].value = interest > 0 ? per : 0;
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
                </View>
                <COMPONENT.Slider
                  value={
                    index === 3
                      ? parseFloat(sliderValue)
                      : parseInt(sliderValue)
                  }
                  minValue={minValue}
                  maxValue={maxValue}
                  showPercentage={index === 2 ? true : false}
                  percentage={parseFloat(data[2].value)}
                  onValueChange={(value: any) => {
                    if (index === 0) {
                      let currentData = JSON.parse(JSON.stringify(data));
                      currentData[0].amt = Math.round(value);
                      setAnnualncome(Math.round(value));
                      let dpVal = (
                        (Math.round(value) * downpayment) /
                        100
                      ).toFixed(2);
                      setDPValue(dpVal);
                      if (currentData[0].amt) {
                        let val =
                          (currentData[0].amt * currentData[2].value) / 100;
                        currentData[2].amt = val.toFixed(2);
                      }
                      setData(currentData);
                    } else if (index === 1) {
                      setMonthlyDebts(value.toFixed(2));
                      let currentData = JSON.parse(JSON.stringify(data));
                      currentData[1].amt = value.toFixed(2);
                      setData(currentData);
                    } else if (index === 2) {
                      let currentData = JSON.parse(JSON.stringify(data));
                      let cIncome =
                        currentData[0].amt > downpayment_min
                          ? currentData[0].amt
                          : 400000;
                      let per = (cIncome * value) / 100;
                      per = per > 0 ? per : 0;
                      setDownPayment(value.toFixed(2));
                      setDPValue(((cIncome * value) / 100).toFixed(2));
                      currentData[2].amt = per.toFixed(2);
                      currentData[2].value = value.toFixed(2);
                      setData(currentData);
                    } else if (index === 3) {
                      setInterest(value.toFixed(2));
                      let currentData = JSON.parse(JSON.stringify(data));
                      currentData[3].amt = value.toFixed(2);
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
            <View style={styles.marginStyle}>
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
                    placeholder={'0.00'}
                    value={PropertyPercentage}
                    maxLength={6}
                    onChangeText={(text: any) => {
                      if (parseInt(text) <= 100) {
                        setPropertyPercenatge(text);
                        let amt = (property_price * parseFloat(text)) / 100;
                        if (amt.toString() !== 'NaN') {
                          setPropertyAmount(amt.toFixed(2).toString());
                        } else {
                          setPropertyAmount('0');
                        }
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
                    placeholder={'0.00'}
                    value={PropertyAmount}
                    onChangeText={(text: any) => {
                      setPropertyAmount(text);
                      let per = (parseFloat(text) * 100) / property_price;
                      if (
                        per.toString() !== 'NaN' &&
                        per.toString() !== 'Infinity'
                      ) {
                        setPropertyPercenatge(per.toFixed(3).toString());
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
      </ScrollView>
      <COMPONENT.Popup />
      <COMPONENT.Loader isLoading={props.loading} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  defaultData: state.calculation.defaultData,
  loading: state.calculation.loading,
  afdError: state.calculation.afdError,
  county: state.calculation.county,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  getCounty,
  getDefault,
  affordabilityCalculation,
  clearDefaultData,
  OpenValidationAlert,
  updateInfoModal,
  closeModal,
})(AffordabilityBO);
