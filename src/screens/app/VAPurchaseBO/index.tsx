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
  vaCalculation,
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

interface IVAProps {
  defaultData: any;
  getDefault: Function;
  vaCalculation: Function;
  loading: boolean;
  OpenValidationAlert: Function;
  closeModal: Function;
  vaError: string;
  clearDefaultData: Function;
  getCounty: Function;
  county: any[];
  infoMessages: any;
  updateInfoModal: Function;
}

const VAPurchaseBO = (props: IVAProps) => {
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
  let new_loan_amount = props.defaultData ? defaultData.new_loan_amount : 0;
  let property_price: any = props.defaultData
    ? parseInt(defaultData.property_price)
    : 0;
  let property_price_max = props.defaultData
    ? defaultData.property_price_max
    : 0;
  let property_price_min = props.defaultData
    ? defaultData.property_price_min
    : 0;
  let property_tax: any = props.defaultData ? defaultData.property_tax : 0;
  let interest_rate: Object[] = props.defaultData
    ? defaultData.interest_rate
    : [{}];
  let services: Object[] = props.defaultData ? defaultData.services : [{}];
  let user_loan_before: boolean = props.defaultData
    ? defaultData.user_loan_before
    : false;
  let states: any = props.defaultData ? defaultData.states : stateData;

  const [termData, setTermData] = React.useState([
    { label: '5 Years', value: '5' },
    { label: '10 Years', value: '10' },
    { label: '20 Years', value: '20' },
    { label: '30 Years', value: '30' },
  ]);
  const [typeData, setTypeData] = React.useState([
    { label: 'Military', value: '1' },
    { label: 'Military', value: '2' },
    { label: 'Military', value: '3' },
  ]);

  const [mortgageTerm, setMortgageTerm] = React.useState('');
  const [typeService, setTypeService] = React.useState(1);
  const [useLoanBefore, setUseLoanBefore] = React.useState(false);
  const [term, setTerm] = React.useState('5');
  const [state, setState] = React.useState(1);
  const [country, setCountry] = React.useState('USA');
  const [HOAValue, setHOAValue] = React.useState('');
  const [InsuranceValue, setInsuranceValue] = React.useState('');
  const [PropertyPercentage, setPropertyPercenatge] = React.useState('');
  const [PropertyAmount, setPropertyAmount] = React.useState(property_price);
  const [advOpen, setAdvOpen] = React.useState(false);
  const [selectedCounty, setSelectedCounty] = React.useState(1);
  const [stateList, setStateList] = React.useState(stateData);
  const [countyList, setCountyList] = React.useState(stateData[0].data);
  const [downpayment, setDownPayment] = React.useState(0);
  const [interest, setInterest] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [dpValue, setDPValue] = React.useState(0);
  const [data, setData] = React.useState([
    {
      title: 'Property Price',
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
    props.getDefault('va');
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
      let temptype: any = [];
      let stateArray = JSON.parse(JSON.stringify(states));
      let tempState: any = [];
      stateArray.map((item: any) => {
        tempState.push({
          label: item.name,
          value: item.id,
        });
      });
      setStateList(tempState);
      let mytype: any = JSON.parse(JSON.stringify(services));
      mytype.map((item: any, index: number) => {
        temptype.push({
          label: item.name,
          value: item.id,
        });
      });
      setTypeData(temptype);
      let currentInterest = 0;
      setDownPayment(downpayment_min);
      let myArray = JSON.parse(JSON.stringify(interest_rate));
      myArray.map((item: any, index: number) => {
        if (index === 0) {
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
      setTermData(temp);
      setUseLoanBefore(user_loan_before);
      setInsuranceValue(hazard_insurance);
      setPropertyPercenatge(property_tax.toString());
      let amt = (property_price * property_tax) / 100;
      setPropertyAmount(amt.toString());
      setInterest(currentInterest);
      setPrice(property_price);
      setDPValue((property_price * downpayment_min) / 100);
      setData([
        {
          title: 'Property Price',
          signature: '$',
          amt: property_price,
          value: 0,
        },
        {
          title: 'Down Payment',
          signature: '$',
          amt: (property_price * downpayment_min) / 100,
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
    if (props.vaError && !props.loading) {
      let obj = {
        message: props.vaError !== undefined ? props.vaError : '',
        type: 'failure',
      };
      setTimeout(() => {
        props.OpenValidationAlert(obj);
      }, 200);
    }
  }, [props.defaultData, props.vaError]);

  const validateForm = () => {
    let currentData = JSON.parse(JSON.stringify(data));
    let message = '';
    let isValidate = false;
    if (currentData[0].amt === '0' || currentData[0].amt <= 0) {
      message = 'Please enter price amount';
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
      CalculateVA();
    }
  };
  const CalculateVA = () => {
    let request: any = {};
    let cData = JSON.parse(JSON.stringify(data));
    request.category = 'purchase';
    request.property_price = parseFloat(cData[0].amt);
    request.downpayment_min = parseFloat(cData[1].value);
    request.interest_rate = parseFloat(cData[2].amt);
    request.annual_property_tax = parseFloat(PropertyPercentage);
    request.hazard_insurance =
      InsuranceValue !== '' ? parseInt(InsuranceValue) : 0;
    request.monthly_hoa = HOAValue !== '' ? parseInt(HOAValue) : 0;
    request.mortgage_term = term;
    request.type_service = typeService;
    request.user_loan_before = useLoanBefore;
    props.vaCalculation(request);
  };

  const renderPicker = (pickerdata: any, type: any) => {
    return (
      <COMPONENT.Picker
        data={pickerdata}
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
            //console.log("Selected", value, label);
            setTypeService(value);
          } else {
            setSelectedCounty(value);
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
        return typeService;
      case 4:
        return selectedCounty;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <COMPONENT.Header
        title="VA Purchase"
        rightClick={() => {
          props.updateInfoModal(
            true,
            'VA Purchase',
            props.infoMessages?.calculator_purchase_details,
          );
        }}
        rightImg={IMAGES.IC_HEADER_INFO}
        leftImg={IMAGES.IC_BACK}
        leftClick={() => {
          props.clearDefaultData();
          Router.goBack();
        }}
      />
      {props.loading && <View style={styles.emptyContainer} />}
      <KeyboardAwareScrollView style={styles.scrollView}>
        <View style={styles.container}>
          {data.map((item, index) => {
            let sliderValue = 0;
            let minValue = 0;
            let maxValue = 0;
            if (index === 0) {
              sliderValue = data[0].amt ? data[0].amt : 0;
              minValue = props.defaultData ? property_price_min : 0;
              maxValue = props.defaultData ? property_price_max : 0;
            } else if (index === 1) {
              sliderValue = data[1].value ? data[1].value : 0;
              minValue = props.defaultData ? downpayment_min : 0;
              maxValue = 100;
            } else {
              sliderValue = data[2].amt ? data[2].amt : 0;
              minValue = props.defaultData ? min_interest_rate : 0;
              maxValue = props.defaultData ? max_interest_rate : 0;
            }
            return (
              <>
                <View style={styles.viewContainer}>
                  <Text style={styles.text}>{item.title}</Text>
                  {item.title === 'Down Payment' && (
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
                          let price =
                            currentData[0].amt > downpayment_min
                              ? currentData[0].amt
                              : 400000;
                          let per = (price * downpayment) / 100;
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
                          setDPValue((downpayment_min * price) / 100);
                        }
                      }}
                      onChangeText={(value: number) => {
                        if (value <= 100) {
                          setDownPayment(value);
                        }
                      }}
                    />
                  )}
                  <View>
                    {index === 2 ? (
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
                    ) : index === 0 ? (
                      <COMPONENT.PriceBox
                        sign={item.signature}
                        title={price}
                        width={120}
                        maxLength={
                          property_price_max
                            ? property_price_max.toString().length + 3
                            : 7
                        }
                        onEndEditing={() => {
                          if (
                            price <= property_price_max &&
                            price >= property_price_min
                          ) {
                            let currentData = JSON.parse(JSON.stringify(data));
                            let cPrice =
                              currentData[0].amt > 0
                                ? currentData[0].amt
                                : 400000;
                            let per = currentData[0].amt * 100;
                            per = per / cPrice;
                            currentData[0].amt = price;
                            currentData[0].value = price > 0 ? per : 0;
                            setDPValue((price * downpayment) / 100);
                            if (index === 0) {
                              let amt =
                                (currentData[index].amt *
                                  parseFloat(PropertyPercentage)) /
                                100;
                              setPropertyAmount(amt.toString());
                              let val =
                                (currentData[0].amt * currentData[1].value) /
                                100;
                              currentData[1].amt = val.toFixed(2);
                            }
                            setData(currentData);
                          } else {
                            setDPValue(
                              (property_price * downpayment_min) / 100,
                            );
                            setPrice(property_price);
                            let currentData = JSON.parse(JSON.stringify(data));
                            let cPrice = property_price;
                            let per = property_price * 100;
                            per = per / cPrice;
                            currentData[0].amt = property_price;
                            currentData[0].value = property_price > 0 ? per : 0;
                            setData(currentData);
                          }
                        }}
                        onChangeText={(value: number) => {
                          if (value <= property_price_max) {
                            setPrice(value);
                          }
                        }}
                      />
                    ) : (
                      <COMPONENT.PriceBox
                        sign={item.signature}
                        title={dpValue}
                        width={120}
                        maxLength={
                          property_price_max
                            ? property_price_max.toString().length + 3
                            : 7
                        }
                        onChangeText={(value: number) => {
                          if (value <= price && value >= 0) {
                            console.log('Valu', value, price);
                            setDPValue(value);
                          }
                        }}
                        onEndEditing={() => {
                          let currentData = JSON.parse(JSON.stringify(data));
                          let count = (price * downpayment_min) / 100;
                          let cPrice =
                            currentData[0].amt > 0
                              ? currentData[0].amt
                              : 400000;
                          let per = dpValue * 100;
                          per = per / cPrice;
                          if (
                            per >= downpayment_min &&
                            dpValue <= property_price_max &&
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
                            setDPValue((price * downpayment_min) / 100);
                          }
                        }}
                      />
                    )}
                  </View>
                </View>
                <COMPONENT.Slider
                  value={
                    index === 2
                      ? parseFloat(sliderValue)
                      : parseInt(sliderValue)
                  }
                  minValue={minValue}
                  maxValue={maxValue}
                  showPercentage={index === 1 ? true : false}
                  percentage={parseFloat(data[1].value)}
                  onValueChange={(value: any) => {
                    let currentData = JSON.parse(JSON.stringify(data));
                    if (index === 0) {
                      let currentData = JSON.parse(JSON.stringify(data));
                      currentData[0].amt = Math.round(value);
                      let amt =
                        (currentData[0].amt * parseFloat(PropertyPercentage)) /
                        100;
                      setPropertyAmount(amt.toString());
                      setPrice(Math.round(value));
                      let dpVal = (
                        (Math.round(value) * downpayment) /
                        100
                      ).toFixed(2);
                      setDPValue(dpVal);
                      if (currentData[0].amt) {
                        let val =
                          (currentData[0].amt * currentData[1].value) / 100;
                        currentData[1].amt = val.toFixed(2);
                      }
                      setData(currentData);
                    } else if (index === 1) {
                      let currentData = JSON.parse(JSON.stringify(data));
                      let price =
                        currentData[0].amt > downpayment_min
                          ? currentData[0].amt
                          : 400000;
                      let per = (price * value) / 100;
                      per = per > 0 ? per : 0;
                      setDownPayment(value.toFixed(2));
                      //console.log("Perce", );
                      setDPValue(((price * value) / 100).toFixed(2));
                      currentData[index].amt = per.toFixed(2);
                      currentData[1].value = value.toFixed(2);
                      setData(currentData);
                    } else {
                      setInterest(value.toFixed(2));
                      let currentData = JSON.parse(JSON.stringify(data));
                      currentData[2].amt = value.toFixed(2);
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
              <Text style={styles.title}>{'Type of Service'}</Text>
              {renderPicker(typeData, 3)}
              <Text style={styles.title}>{'Used LA Loan before?'}</Text>
              <View style={styles.radioContainer}>
                <TouchableOpacity
                  style={styles.radioBox}
                  onPress={() => setUseLoanBefore(true)}
                >
                  <Image
                    source={
                      useLoanBefore ? IMAGES.IC_RADIO_CHECKED : IMAGES.IC_RADIO
                    }
                    resizeMode={'contain'}
                    style={styles.radioIcon}
                  />
                  <Text style={styles.radioTxt}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioBox}
                  onPress={() => setUseLoanBefore(false)}
                >
                  <Image
                    source={
                      !useLoanBefore ? IMAGES.IC_RADIO_CHECKED : IMAGES.IC_RADIO
                    }
                    resizeMode={'contain'}
                    style={styles.radioIcon}
                  />
                  <Text style={styles.radioTxt}>No</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>{'Term'}</Text>
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
      </KeyboardAwareScrollView>
      <COMPONENT.Popup />
      <COMPONENT.Loader isLoading={props.loading} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  defaultData: state.calculation.defaultData,
  loading: state.calculation.loading,
  vaError: state.calculation.vaError,
  county: state.calculation.county,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  getCounty,
  getDefault,
  vaCalculation,
  OpenValidationAlert,
  closeModal,
  clearDefaultData,
  updateInfoModal,
})(VAPurchaseBO);
