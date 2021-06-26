import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import { IReduxState } from 'src/redux/reducers';
import { diff_hours, diff_minutes } from 'src/utility/util';
import styles from './styles';

interface IDocumentDetailProps {
  loading: boolean;
  documentsDetail: any;
}

const DocumentDetailLO = (props: IDocumentDetailProps) => {
  const navigation = useNavigation();
  const { config, fs } = RNFetchBlob;
  const params: any = useRoute().params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (props.documentsDetail) {
      setData(props.documentsDetail);
    }
  }, [props.documentsDetail]);

  function downloadFile(url: string, filename: string) {
    let DownloadDir = fs.dirs.DocumentDir; // this is the pictures directory. You can check the available directories in the wiki.

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: true,
        description: 'Downloading image.',
      },
      path: DownloadDir + '/' + filename,
    };
    config(options)
      .fetch('GET', url)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setTimeout(() => {
          if (Platform.OS === 'ios') {
            RNFetchBlob.ios.previewDocument(res.data);
          }
        }, 500);
      });
  }

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
      displayDate = dayjs(item?.created_at).format('MMM DD, YYYY HH:MMA');
    }
    return (
      <View style={styles.cellContainer}>
        <View style={styles.detailContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.nameText}
          >
            {item.original_name}
          </Text>
          <Text style={styles.timeText}>{displayDate}</Text>
        </View>
        <View style={styles.downloadContainer}>
          <TouchableOpacity
            style={styles.btnDownload}
            onPress={() => {
              //item.url
              setLoading(true);
              downloadFile(item.url, item.original_name);
            }}
          >
            <Image
              source={IMAGES.IC_DOWNLOAD}
              style={styles.downloadIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.separtor} />
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
          title={params.name}
          rightImg={IMAGES.IC_NOTIFICATION}
          rightClick={() => navigation.navigate('NotificationLO')}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
        />
        <View style={styles.flatlistContainer}>
          {!props.loading && (
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => renderItem(item)}
            />
          )}
        </View>
      </SafeAreaView>
      <COMPONENT.Loader isLoading={loading} />
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.document.loading,
  documentsDetail: state.document.documentsDetail,
});

export default connect(mapStateToProps, {})(DocumentDetailLO);
