import { useNavigation, useRoute } from '@react-navigation/native';
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
import { getTypes } from 'src/redux/actions/calculation';
import { toggleSettingOption } from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';
interface ICalculatorBOProps {
  setTabbarTabs: Function;
  toggleSettingOption: any;
  showOptions: boolean;
  getTypes: Function;
  types: any;
  infoMessages: any;
  isGuest: boolean;
}
const CalculatorBO = (props: ICalculatorBOProps) => {
  const navigation = useNavigation();
  const params = useRoute().params;
  const [data, setData] = React.useState([{}]);
  React.useEffect(() => {
    props.getTypes();
  }, []);

  React.useEffect(() => {
    if (props.types) {
      const isInclude = props.types.filter(
        (item: any) => item.name === 'Affordability',
      );
      if (props.isGuest) {
        setData([
          { title: 'Purchase', redirect: 'PurchaseBO' },
          { title: 'Refinance', redirect: 'RefinanceBO' },
          { title: 'Affordability', redirect: 'AffordabilityBO' },
          { title: 'Should I Refinance?', redirect: 'ShouldIRefinanceBO' },
          // {
          //   title: 'Saved Calculations',
          //   redirect: 'SavedCalculationBO',
          //   stack: 'SavedCalculationScreen',
          // },
        ]);
      } else {
        if (isInclude.length > 0) {
          setData([
            { title: 'Purchase', redirect: 'PurchaseBO' },
            { title: 'Refinance', redirect: 'RefinanceBO' },
            { title: 'Affordability', redirect: 'AffordabilityBO' },
            { title: 'Should I Refinance?', redirect: 'ShouldIRefinanceBO' },
            {
              title: 'Saved Calculations',
              redirect: 'SavedCalculationBO',
              stack: 'SavedCalculationScreen',
            },
          ]);
        } else {
          setData([
            { title: 'Purchase', redirect: 'PurchaseBO' },
            { title: 'Refinance', redirect: 'RefinanceBO' },
            { title: 'Should I Refinance?', redirect: 'ShouldIRefinanceBO' },
            {
              title: 'Saved Calculations',
              redirect: 'SavedCalculationBO',
              stack: 'SavedCalculationScreen',
            },
          ]);
        }
      }
    }
  }, [props.types]);

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.cellContainer}
        onPress={() => {
          if (item.stack) {
            navigation.navigate(item.stack, {
              screen: item.redirect,
              params: { isBack: true },
            });
          } else {
            navigation.navigate(item.redirect);
          }
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
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
          title={'Calculator'}
          infoMessage={
            props.infoMessages ? props.infoMessages.calculator_info : ''
          }
          leftImg={
            params !== undefined ? IMAGES.IC_BACK : IMAGES.IC_HEADER_SETTING
          }
          leftClick={() => {
            params !== undefined
              ? navigation.goBack()
              : props.toggleSettingOption(!props.showOptions);
          }}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        <FlatList
          scrollEnabled={false}
          data={data}
          style={styles.flatStyle}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => renderItem(item)}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  showOptions: state.common.showOptions,
  types: state.calculation.types,
  infoMessages: state.auth.infoMessages,
  isGuest: state.common.isGuest,
});

export default connect(mapStateToProps, {
  toggleSettingOption,
  getTypes,
})(CalculatorBO);
