import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Pie from 'react-native-pie';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import * as COLOR from 'src/constants/colors';
import { OpenValidationAlert } from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';

interface IResultProps {
  loading: boolean;
  OpenValidationAlert: Function;
  calculatedData: any;
  infoMessages: any;
}

const AffordabilityResult = (props: IResultProps) => {
  const navigation = useNavigation();
  React.useEffect(() => {}, []);
  let FHAData = JSON.parse(JSON.stringify(props.calculatedData));
  let aggressive = FHAData.Aggressive;
  let conservative = FHAData.Conservative;
  let moderate = FHAData.Moderate;
  let disclaimer = FHAData.disclaimer;

  //get purchase price
  const getPurchasePrice = (type: any) => {
    let price = type.Purchase_Price;
    return price;
  };

  //get chart data
  const getChartData = (data: any) => {
    let total =
      data.Income_Taxes +
      data.Mortgage_Payment +
      data.Remaining +
      data.Debt_Payments;
    let chartData = [
      {
        percentage: (data.Income_Taxes * 100) / total,
        color: '#F4C427',
      },
      {
        percentage: (data.Mortgage_Payment * 100) / total,
        color: '#4FB263',
      },
      {
        percentage: (data.Remaining * 100) / total,
        color: '#3ACBE9',
      },
      {
        percentage: (data.Debt_Payments * 100) / total,
        color: '#EB4949',
      },
    ];
    console.log(chartData);
    return chartData;
  };

  const getData = (type: any) => {
    let data = [
      {
        color: '#4FB263',
        title: `$${type.Mortgage_Payment}`,
        desc: 'Mortgage Payments ',
      },
      {
        color: '#EB4949',
        title: `$${type.Debt_Payments}`,
        desc: 'Debt Payments',
      },
      {
        color: '#F4C427',
        title: `$${type.Income_Taxes}`,
        desc: 'Income Taxes',
      },
      { color: '#3ACBE9', title: `$${type.Remaining}`, desc: 'Remaining' },
    ];
    return data;
  };

  const renderPie = (data: any) => {
    return (
      <View style={styles.chartContainer}>
        <Pie radius={80} sections={data} strokeCap={'butt'} />
      </View>
    );
  };
  const renderBlackBox = (price: any) => {
    return (
      <View style={styles.blackBoxContainer}>
        <View>
          <Text style={styles.purchasePriceText}>Purchase Price</Text>
          <Text style={styles.purchasePriceAmount}>${price ? price : '0'}</Text>
        </View>
      </View>
    );
  };
  const renderDesription = () => {
    return (
      <View style={styles.descContainer}>
        <Text style={styles.descText}>{disclaimer ? disclaimer : ''}</Text>
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
          infoMessage={props.infoMessages?.calculator_affordability_result}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        <View style={styles.tabbarTopBorder} />
        <ScrollableTabView
          renderTabBar={() => <ScrollableTabBar />}
          style={styles.scrollableTabViewStyle}
          tabBarTextStyle={styles.tabbarTextStyle}
          tabBarInactiveTextColor={COLOR.THEME.LIGHT_GRAY}
          tabBarActiveTextColor={COLOR.THEME.TRACK_COLOR_TRUE}
          tabBarUnderlineStyle={styles.tabbarUnderlineStyle}
          initialPage={1}
        >
          <View
            key={'1'}
            tabLabel={'Conservative'}
            style={styles.tabbarPageContainer}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContentStyle}
            >
              {renderPie(getChartData(conservative))}
              <COMPONENT.ChartDetail data={getData(conservative)} column={2} />
              {renderBlackBox(getPurchasePrice(conservative))}
            </ScrollView>
            {renderDesription()}
          </View>
          <View
            key={'2'}
            tabLabel={'Moderate'}
            style={styles.tabbarPageContainer}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContentStyle}
            >
              {renderPie(getChartData(moderate))}
              <COMPONENT.ChartDetail data={getData(moderate)} column={2} />
              {renderBlackBox(getPurchasePrice(moderate))}
            </ScrollView>
            {renderDesription()}
          </View>
          <View
            key={'3'}
            tabLabel={'Aggressive'}
            style={styles.tabbarPageContainer}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContentStyle}
            >
              {renderPie(getChartData(aggressive))}
              <COMPONENT.ChartDetail data={getData(aggressive)} column={2} />
              {renderBlackBox(getPurchasePrice(aggressive))}
            </ScrollView>
            {renderDesription()}
          </View>
        </ScrollableTabView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.calculation.loading,
  calculatedData: state.calculation.calculatedData,
  infoMessages: state.auth.infoMessages,
});
export default connect(mapStateToProps, {
  OpenValidationAlert,
})(AffordabilityResult);
