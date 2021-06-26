import {
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import dayjs from 'dayjs';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import { deleteDocument, getDocument } from 'src/redux/actions/scan';
import { IReduxState } from 'src/redux/reducers';
import { diff_hours, diff_minutes } from 'src/utility/util';
import styles from './styles';
interface IUDProps {
  scanRedirect: string;
  getDocument: Function;
  documentData: any;
  loading: boolean;
  deleteDocument: Function;
  filename: string;
  infoMessages: any;
}
const UploadedDocumentBO = (props: IUDProps) => {
  const navigation = useNavigation();
  const params: any = useRoute().params;

  const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.pdf`;
  const popAction = StackActions.popToTop();
  let _swipeListView = null;
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    props.getDocument();
  }, []);
  React.useEffect(() => {
    if (Object.keys(props.documentData).length > 0) {
      let d: any[] = props.documentData.data.reverse();
      setData(d);
    }
  }, [props.documentData]);

  console.log('ALer', params);

  const OpenFile = (fileurl: string) => {
    const options = {
      fromUrl: fileurl,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
      })
      .catch((error) => {
        // error
      });
  };

  const renderItem = (item: any) => {
    let today = new Date();
    let fDate = dayjs(today).format('DD/MM/YYYY');
    let fNDate = dayjs(item.item.created_at).format('DD/MM/YYYY');
    let displayDate: any = fNDate;
    var toUTC = new Date(item.item.created_at);

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
      displayDate = dayjs(item.item.created_at).format('MMM DD, YYYY');
    }
    return (
      <TouchableHighlight
        onPress={() => {
          // OpenFile(item.item.url);
          if (Platform.OS === 'ios') {
            navigation.navigate('Webview', {
              url: item.item.url,
              // url:
              //   'http://139.59.65.130:5000/upload/media/from_gallery_combined-d10f7.pdf',
            });
          } else {
            if (item.item.url.includes('pdf')) {
              OpenFile(item.item.url);
            } else {
              navigation.navigate('Webview', {
                url: item.item.url,
                // url:
                //   'http://139.59.65.130:5000/upload/media/from_gallery_combined-d10f7.pdf',
              });
            }
          }
          // props
          console.log('URL', item.item.url);
        }}
        underlayColor="#DDDDDD"
        style={styles.cellContainer}
      >
        <>
          <View>
            {item.item.url.includes('jpg') ||
            item.item.url.includes('png') ||
            item.item.url.includes('jpeg') ? (
              <Image
                source={IMAGES.IMAGE_PLACEHOLDER}
                style={styles.docImage}
                resizeMode={'contain'}
                tintColor={COLOR.getTheme()}
              />
            ) : (
              <Image
                source={IMAGES.IC_DOCUMENT_FILLED}
                style={styles.docImage}
                resizeMode={'contain'}
                tintColor={COLOR.getTheme()}
              />
            )}
          </View>
          <View style={styles.nameContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {item.item.document_name}
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{displayDate}</Text>
          </View>
        </>
      </TouchableHighlight>
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
    props.deleteDocument(rowKey);
  };
  const renderHiddenItem = (item: any, rowMap: any) => (
    <View style={styles.rowBack}>
      <Text></Text>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, item.item.id, item.item)}
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
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Uploaded Documents'}
          infoMessage={props.infoMessages?.uploaded_documents}
          leftImg={params !== undefined && IMAGES.IC_BACK}
          leftClick={() => {
            if (params !== undefined) {
              // ROUTER.navigate('ScanScreen', {
              //   screen: props.scanRedirect,
              // })
              if (params.backToScan) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'ScanDocumentGetStartBO' }],
                });
                // navigation.goBack();
              } else {
                navigation.dispatch(popAction);
              }
            }
          }}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        {props.loading ? (
          <View style={styles.nullContainer}>
            <Text>{'Loading'}</Text>
          </View>
        ) : (
          <SwipeListView
            ref={(ref) => (_swipeListView = ref)}
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={(data) => renderItem(data)}
            renderHiddenItem={(data, rowMap) => renderHiddenItem(data, rowMap)}
            rightOpenValue={-50}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            ListEmptyComponent={() => (
              <View style={styles.nullContainer}>
                <Text>{'No Documents Uploaded'}</Text>
              </View>
            )}
          />
        )}
        <COMPONENT.Loader isLoading={props.loading} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  scanRedirect: state.common.scanRedirect,
  filename: state.common.filename,
  documentData: state.scan.documentData,
  loading: state.scan.loading,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  getDocument,
  deleteDocument,
})(UploadedDocumentBO);

// export default UploadedDocumentBO;
