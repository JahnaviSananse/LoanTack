import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,


  SafeAreaView,
  Text, View
} from 'react-native';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import styles from './styles';

const ResultDetailBO = () => {
  const navigation = useNavigation()
  const param : any = useRoute().params;
  const data = [
    { name: "Property Value", amount: "$700,000" },
    { name: "Down Payment", amount: "$10,710.00" },
    { name: "Base Loan Amount", amount: "$295,290.00" },
    { name: "Intererst Rate", amount: "4.000 %" },
    { name: "APR", amount: "$700,000" },
    { name: "FHA Upfront MIP", amount: "$10,710.00" },
    { name: "Total Loan Amount", amount: "$295,290.00" },
    { name: "Principal & Interest", amount: "$1,434.43" },
    { name: "Taxes & HOA", amount: "$250.00" },
    { name: "Hazard Insurance", amount: "$660.00" },
    { name: "Mortgage Insurance", amount: "$209.16" },
    { name: "Monthly Payment", amount: "$1, 434.43" },
  ]
  React.useEffect(() => {
  }, [])
  const renderItem = (item: any) => {
    return (
      <View style={styles.cellContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.detail}>{item.value ? item.value : '0'}</Text>
      </View>
    )
  }
  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.keyboardAware}>
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={"Details"}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
        />
        <FlatList
          scrollEnabled={true}
          data={param !== null && param !== undefined ? param.details : data}
          style={styles.flatListStyle}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => renderItem(item)}
        />
      </SafeAreaView>
    </KeyboardAvoidingView >
  );
};

export default ResultDetailBO;

