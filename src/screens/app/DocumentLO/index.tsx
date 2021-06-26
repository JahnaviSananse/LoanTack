/* eslint-disable import/namespace */
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useState } from 'react';
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
import { getDocumentDetail, getDocumentList } from 'src/redux/actions/document';
import { IReduxState } from 'src/redux/reducers';
import { diff_hours, diff_minutes } from 'src/utility/util';
import styles from './styles';

interface IDocumentProps {
  loading: boolean;
  getDocumentList: Function;
  getDocumentDetail: Function;
  documents: any;
}

const DocumentLO = (props: IDocumentProps) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  React.useEffect(() => {
    // props.getDocumentList();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      props.getDocumentList();
    });

    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    if (props.documents) {
      setData(props.documents);
    }
  }, [props.documents]);

  const renderItem = (item: any) => {
    let today = new Date();
    let fDate = dayjs(today).format('DD/MM/YYYY');
    let fNDate = dayjs(item?.created_at).format('DD/MM/YYYY');
    let displayDate: any = fNDate;
    var toUTC = new Date(item?.created_at);

    if (fNDate === fDate && diff_hours(today, toUTC) === 0) {
      let min = diff_minutes(today, toUTC) > 0 ? diff_minutes(today, toUTC) : 1;
      if (min > 1) {
        displayDate = min + ' minutes ago';
      } else {
        displayDate = min + ' minute ago';
      }
    } else if (fNDate === fDate && diff_hours(today, toUTC) > 0) {
      displayDate = diff_hours(today, toUTC) + ' hours ago';
    } else {
      displayDate = dayjs(item?.created_at).format('MMM DD, YYYY');
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            props.getDocumentDetail(item.id);
            navigation.navigate('DocumentDetailLO', {
              name: item.name,
            });
          }}
          style={styles.cellContainer}
        >
          <COMPONENT.Image
            source={IMAGES.IC_PLACEHOLDER}
            style={styles.avatar}
          />
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.timeText}>{displayDate}</Text>
        </TouchableOpacity>
        <View style={styles.separetor} />
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
        <COMPONENT.Header
          title={'Documents'}
          rightImg={IMAGES.IC_NOTIFICATION}
          rightClick={() =>
            navigation.navigate('NotificationLO', { isBack: true })
          }
        />
        <View style={styles.flatlistContainer}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
      </SafeAreaView>
      {/* <COMPONENT.Loader isLoading={props.loading} /> */}
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.document.loading,
  documents: state.document.documents,
});

export default connect(mapStateToProps, {
  getDocumentList,
  getDocumentDetail,
})(DocumentLO);
