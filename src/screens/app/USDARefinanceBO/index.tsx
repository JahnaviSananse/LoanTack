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
  usdaRefinanceCalculation,
} from 'src/redux/actions/calculation';
import { closeModal, OpenValidationAlert } from 'src/redux/actions/common';
import { updateInfoModal } from 'src/redux/actions/modal';
import { IReduxState } from 'src/redux/reducers';
import * as Router from 'src/routes/router';
import styles from './styles';
interface IUSDAProps {
  defaultData: any;
  getDefault: Function;
  usdaRefinanceCalculation: Function;
  loading: boolean;
  OpenValidationAlert: Function;
  closeModal: Function;
  usdaRefinanceError: string;
  clearDefaultData: Function;
  getCounty: Function;
  county: any[];
  infoMessages: any;
  updateInfoModal: Function;
}

const USDARefinanceBO = (props: IUSDAProps) => {
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
  let states: any = props.defaultData ? defaultData.states : [];

  const [termData, setTermData] = React.useState([
    { label: '5 Years', value: '5' },
    { label: '10 Years', value: '10' },
    { label: '20 Years', value: '20' },
    { label: '30 Years', value: '30' },
  ]);

  const [mortgageTerm, setMortgageTerm] = React.useState('');
  const [term, setTerm] = React.useState('10');
  const [state, setState] = React.useState(1);
  const [HOAValue, setHOAValue] = React.useState('');
  const [InsuranceValue, setInsuranceValue] = React.useState('');
  const [PropertyPercentage, setPropertyPercenatge] = React.useState('');
  const [PropertyAmount, setPropertyAmount] = React.useState('');
  const [advOpen, setAdvOpen] = React.useState(false);

  const [newLoanAmount, setNewLoanAmount] = React.useState('0');
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
      title: 'Interest Rate',
      signature: '%',
      amt: 0,
      value: 0,
    },
  ]);

  React.useEffect(() => {
    props.getDefault('usda');
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
      setNewLoanAmount(new_loan_amount);
      setTermData(temp);
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
    if (props.usdaRefinanceError && !props.loading) {
      let obj = {
        message:
          props.usdaRefinanceError !== undefined
            ? props.usdaRefinanceError
            : '',
        type: 'failure',
      };
      setTimeout(() => {
        props.OpenValidationAlert(obj);
      }, 500);
    }
  }, [props.defaultData, props.usdaRefinanceError]);

  const validateForm = () => {
    let currentData = JSON.parse(JSON.stringify(data));
    let message = '';
    let isValidate = false;
    // if (currentData[0].amt === "0" || currentData[0].amt <= 0) {
    //     message = 'Please enter new loan amount';
    // }else
    if (currentData[0].amt === '0' || currentData[0].amt <= 0) {
      message = 'Please enter property price';
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
      CalculateUSDA();
    }
  };
  const CalculateUSDA = () => {
    let request: any = {};
    let cData = JSON.parse(JSON.stringify(data));
    request.category = 'refinance';
    request.property_price = parseFloat(cData[0].amt);
    //request.new_loan_amount = parseFloat(cData[0].amt);
    request.interest_rate = parseFloat(cData[1].amt);
    request.annual_property_tax = parseFloat(PropertyPercentage);
    request.hazard_insurance =
      InsuranceValue !== '' ? parseInt(InsuranceValue) : 0;
    request.monthly_hoa = HOAValue !== '' ? parseInt(HOAValue) : 0;
    request.mortgage_term = term;
    props.usdaRefinanceCalculation(request);
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
            currentData[1].amt = myArray[label].value;
            setInterest(myArray[label].value);
            setData(currentData);
          } else if (type === 2) {
            setState(value);
            props.getCounty(parseInt(value));
          } else if (type === 3) {
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
        return selectedCounty;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <COMPONENT.Header
        title="USDA Refinance"
        //calculator_refinance_details
        rightClick={() => {
          props.updateInfoModal(
            true,
            'USDA Refinance',
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
              minValue = props.defaultData ? property_price_min : 0;
              maxValue = props.defaultData ? property_price_max : 0;
            } else {
              sliderValue = data[1].amt ? data[1].amt : 0;
              minValue = props.defaultData ? min_interest_rate : 0;
              maxValue = props.defaultData ? max_interest_rate : 0;
            }
            return (
              <>
                <View style={styles.viewContainer}>
                  <Text style={styles.text}>{item.title}</Text>
                  {index === 0 ? (
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
                          let cPrice =
                            currentData[0].amt > 0
                              ? currentData[0].amt
                              : 400000;
                          let per = currentData[0].amt * 100;
                          per = per / cPrice;
                          currentData[0].amt = price;
                          currentData[0].value = price > 0 ? per : 0;
                          let amt =
                            (currentData[0].amt *
                              parseFloat(PropertyPercentage)) /
                            100;
                          setPropertyAmount(amt.toString());
                          setData(currentData);
                        } else {
                          let amt = (property_price * property_tax) / 100;
                          setPropertyAmount(amt.toString());
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
                            currentData[1].amt > 0
                              ? currentData[1].amt
                              : 400000;
                          let per = currentData[1].amt * 100;
                          per = per / price;
                          currentData[1].amt = interest;
                          currentData[1].value = interest > 0 ? per : 0;
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
                    index === 1
                      ? parseFloat(sliderValue)
                      : parseInt(sliderValue)
                  }
                  minValue={minValue}
                  maxValue={maxValue}
                  showPercentage={false}
                  percentage={0}
                  onValueChange={(value: any) => {
                    // if (index === 0) {
                    //     setNewLoanAmount(Math.round(value).toString())
                    //     let currentData = JSON.parse(JSON.stringify(data))
                    //     currentData[0].amt = Math.round(value)
                    //     setData(currentData)
                    // } else
                    if (index === 0) {
                      let currentData = JSON.parse(JSON.stringify(data));
                      currentData[0].amt = Math.round(value);
                      setData(currentData);
                      let amt =
                        (currentData[0].amt * parseFloat(PropertyPercentage)) /
                        100;
                      setPropertyAmount(amt.toString());
                      setPrice(Math.round(value));
                      setData(currentData);
                    } else {
                      setInterest(value.toFixed(2));
                      let currentData = JSON.parse(JSON.stringify(data));
                      currentData[1].amt = Math.round(value);
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
                      let amt = (currentData[1].amt * parseFloat(text)) / 100;
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
                      let per = (parseFloat(text) * 100) / currentData[1].amt;
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
  usdaRefinanceError: state.calculation.usdaRefinanceError,
  county: state.calculation.county,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  getCounty,
  getDefault,
  usdaRefinanceCalculation,
  OpenValidationAlert,
  closeModal,
  clearDefaultData,
  updateInfoModal,
})(USDARefinanceBO);
