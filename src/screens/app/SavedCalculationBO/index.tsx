import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import {
  deleteCalculation,
  getSavedCalculation,
  getSavedCalculationDetail,
} from 'src/redux/actions/calculation';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';

interface ISavedCalculationProps {
  loading: boolean;
  savedData: Object[];
  getSavedCalculation: Function;
  getSavedCalculationDetail: Function;
  infoMessages: any;
  deleteCalculation: Function;
}

const SavedCalculationBO = (props: ISavedCalculationProps) => {
  const navigation = useNavigation();
  const params = useRoute().params;
  let _swipeListView = null;
  const [data, setData] = useState([]);
  React.useEffect(() => {
    setTimeout(() => {
      props.getSavedCalculation();
    }, 500);
  }, []);

  React.useEffect(() => {
    if (props.savedData) {
      setData(props.savedData);
    }
  }, [props.savedData]);
  const renderItem = (item: any) => {
    var date = dayjs(item.created_at).format('MMMM DD, YYYY');
    return (
      <TouchableOpacity
        onPress={() => {
          props.getSavedCalculationDetail(item.id);
        }}
        style={styles.cellContainer}
      >
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.date}>{date + ' - ' + item.type}</Text>
        <View style={styles.saperator} />
      </TouchableOpacity>
    );
  };

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (rowMap: any, rowKey: any, item: any) => {
    closeRow(rowMap, rowKey);
    let filteredAry = data.filter((fvalue) => fvalue.id !== rowKey);
    setData(filteredAry);
    props.deleteCalculation(rowKey);
  };

  const renderHiddenItem = (item: any, rowMap: any) => (
    <View style={styles.rowBack}>
      <Text></Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          console.log('Press', rowMap, item.item.id, item.item);
          deleteRow(rowMap, item.item.id, item.item);
        }}
      >
        <Image
          source={IMAGES.IC_DELETE}
          style={{ height: 25, width: 25 }}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAwareL}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Saved Calculations'}
          leftImg={IMAGES.IC_BACK}
          infoMessage={props.infoMessages?.saved_calculations}
          leftClick={() => navigation.goBack()}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        <SwipeListView
          ref={(ref) => (_swipeListView = ref)}
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => renderItem(item)}
          renderHiddenItem={(datas, rowMap) => renderHiddenItem(datas, rowMap)}
          rightOpenValue={-50}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          ListEmptyComponent={() => (
            <View style={styles.nullContainer}>
              {/* <Text>{'No Calculations Saved'}</Text> */}
            </View>
          )}
        />
        <COMPONENT.Loader isLoading={props.loading} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  savedData: state.calculation.savedData,
  loading: state.calculation.loading,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  getSavedCalculationDetail,
  getSavedCalculation,
  deleteCalculation,
})(SavedCalculationBO);
