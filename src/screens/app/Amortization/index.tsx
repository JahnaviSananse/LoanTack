import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';
import { clearLoader } from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import {
  createContainer,
  VictoryArea,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTheme,
} from 'victory-native';
import styles from './styles';

const data = [
  { color: COLOR.THEME.GREEN, title: 'Principal' },
  { color: COLOR.THEME.YELLOW, title: 'Interest' },
  { color: COLOR.THEME.SKY_BLUE, title: 'Taxes/Fees' },
  { color: COLOR.THEME.DARK_BLUE, title: 'Balance' },
];

let width = CONSTANT.SCREEN_WIDTH - 30;
let optionWidth = width / 4;

interface IAmmoProps {
  clearLoader: Function;
  loading: boolean;
}

const Amortization = (props: IAmmoProps) => {
  const navigation = useNavigation();
  const param: any = useRoute().params;
  const [principal, setPrincipal] = React.useState<any[]>([]);
  const [interest, setInterest] = React.useState<any[]>([]);
  const [tax, setTax] = React.useState<any[]>([]);
  const [balance, setBalance] = React.useState<any[]>([]);
  const [xAxeslength, setxAxeslength] = React.useState(360);
  const [yAxeslength, setyAxeslength] = React.useState(100000);
  const [visibleChart, setVisibleChart] = React.useState(false);

  function monthsToYear() {
    let value: any = xAxeslength + 1;
    let year = parseInt(value, 10) > 12 ? (value / 12) | 0 : 0;
    return year * 12;
  }

  React.useEffect(() => {
    if (param) {
      setxAxeslength(param.amortization.length);
      setyAxeslength(
        (param.amortization[0].balance + param.amortization[0].balance * 0.2) /
          100,
      );

      let principalArray: any[] = [];
      let interestArray: any[] = [];
      let taxArray: any[] = [];
      let balanceArray: any[] = [];

      let count = 0;
      Promise.all(
        param.amortization.map((item: any, index: number) => {
          //if (index % 12 === 0) {
          //let i = count * 12;
          let i = index + 1;
          let objPricipal = { x: i, y: parseFloat(item.principal) };
          let objInterest = { x: i, y: parseFloat(item.interest) };
          let objTax = { x: i, y: parseFloat(item.tax_ins_mi_amount) };
          let objBalance = { x: i, y: parseFloat(item.balance) / 100 };

          principalArray.push(objPricipal);
          interestArray.push(objInterest);
          taxArray.push(objTax);
          balanceArray.push(objBalance);

          count += 1;
          //}
        }),
      ).then((res: any) => {
        setPrincipal(principalArray);
        setInterest(interestArray);
        setTax(taxArray);
        setBalance(balanceArray);
        setTimeout(() => {
          setVisibleChart(true);
          props.clearLoader();
        }, 1000);
      });
    }
  }, [param]);
  const renderTableRow = (item: any, index: number) => {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.textIndex}>{index + 1}</Text>
        <Text style={styles.textData}>{item.balance.toFixed(2)}</Text>
        <Text style={styles.textData}>{item.principal.toFixed(2)}</Text>
        <Text style={styles.textData}>{item.interest.toFixed(2)}</Text>
        <Text style={styles.textData}>{item.tax_ins_mi_amount.toFixed(2)}</Text>
        <View style={styles.rowSaperator} />
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextIndex}>#</Text>
        <Text style={styles.headerTextData}>Balance</Text>
        <Text style={styles.headerTextData}>Principal</Text>
        <Text style={styles.headerTextData}>Interest</Text>
        <Text style={styles.headerTextData}>Taxes/Fees</Text>
        <View style={styles.rowSaperator} />
      </View>
    );
  };
  const renderTable = () => {
    return (
      <View style={styles.tableContainer}>
        {renderHeader()}
        <FlatList
          contentContainerStyle={styles.flatScroll}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          data={param !== null && param !== undefined ? param.amortization : []}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => renderTableRow(item, index)}
        />
      </View>
    );
  };
  const renderLegends = () => {
    return (
      <View style={styles.lagendContainer}>
        <FlatList
          scrollEnabled={false}
          data={data}
          showsVerticalScrollIndicator={false}
          numColumns={4}
          renderItem={({ item }) => (
            <View style={[styles.cellContainer, { width: optionWidth }]}>
              <View style={styles.colorContainer}>
                <View
                  style={[
                    styles.colorBoxLegend,
                    { backgroundColor: item.color },
                  ]}
                />
                <Text style={[styles.cellAmount, { color: item.color }]}>
                  {item.title}
                </Text>
              </View>
              {/* {item.desc && <Text style={styles.cellDesc}>{item.desc}</Text>} */}
            </View>
          )}
        />
      </View>
    );
  };

  const getTitle = (code: string) => {
    //let code = '#4FB263';
    switch (code) {
      case '#4FB263':
        return 'Principal';
      case '#F4C427':
        return 'Interest';
      case '#1fb0f0':
        return 'Taxes/Fees';
      case '#5880c9':
        return 'Balance';
    }
  };

  const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAwareL}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={'Amortization'}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
        />

        <ScrollView
          contentContainerStyle={styles.scroll}
          stickyHeaderIndices={[1]}
          nestedScrollEnabled={true}
        >
          <View style={styles.firstComponent}>
            {visibleChart ? (
              <VictoryChart
                width={CONSTANT.SCREEN_WIDTH}
                height={270}
                containerComponent={
                  <VictoryZoomVoronoiContainer
                    labels={({ datum }) => {
                      let title = datum?.style?.data?.stroke
                        ? datum?.style?.data?.stroke
                        : datum?.style?.data?.fill;
                      return `Month: ${datum.x} ${getTitle(title)} : ${
                        datum.y
                      }`;
                    }}
                  />
                }
                domain={{ x: [0, monthsToYear()], y: [0, yAxeslength] }}
                domainPadding={{ x: [0, 30], y: [0, 0] }}
                padding={{ left: 70, right: 40, top: 50, bottom: 40 }}
                theme={VictoryTheme.material}
              >
                <VictoryStack>
                  <VictoryBar
                    data={principal}
                    style={{ data: { fill: COLOR.THEME.GREEN } }}
                  />
                  <VictoryBar
                    data={interest}
                    style={{ data: { fill: COLOR.THEME.YELLOW } }}
                  />
                  <VictoryBar
                    data={tax}
                    style={{ data: { fill: COLOR.THEME.SKY_BLUE } }}
                  />
                </VictoryStack>
                <VictoryArea
                  style={{
                    data: {
                      fill: 'transparent',
                      fillOpacity: 0.7,
                      stroke: COLOR.THEME.DARK_BLUE,
                      strokeWidth: 3,
                    },
                  }}
                  data={balance}
                />
              </VictoryChart>
            ) : (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color={COLOR.THEME.BLACK} />
              </View>
            )}
            {/* <VictoryChart
              width={CONSTANT.SCREEN_WIDTH}
              height={270}
              domain={{x: [0, monthsToYear()], y: [0, yAxeslength]}}
              //maxDomain={{x: monthsToYear(), y: yAxeslength}}
              //minDomain={{x: 0, y: 0}}
              domainPadding={{x: [0, 10], y: 0}}
              padding={{left: 70, right: 30, top: 50, bottom: 40}}
              theme={VictoryTheme.material}>
              {/* <VictoryBar
                barRatio={0.8}
                style={{
                  data: {fill: '#c43a31'},
                }}
                data={sampleData}
              /> */}
            {/* <VictoryAxis tickValues={temp} maxDomain={{x: 3, y: 3}} />
              <VictoryBar
                barRatio={0.8}
                style={{data: {fill: COLOR.THEME.YELLOW}}}
                data={interest}
              />
              <VictoryBar
                style={{data: {fill: COLOR.THEME.GREEN}}}
                data={principal}
              />
              <VictoryBar
                style={{data: {fill: COLOR.THEME.SKY_BLUE}}}
                data={tax}
              />
              <VictoryArea
                style={{
                  data: {
                    fill: 'transparent',
                    fillOpacity: 0.7,
                    stroke: COLOR.THEME.DARK_BLUE,
                    strokeWidth: 3,
                  },
                }}
                data={balance}
              />
            </VictoryChart> */}
            {renderLegends()}
          </View>

          <View style={styles.secComponent}>{renderTable()}</View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.common.loading,
});
export default connect(mapStateToProps, { clearLoader })(Amortization);
