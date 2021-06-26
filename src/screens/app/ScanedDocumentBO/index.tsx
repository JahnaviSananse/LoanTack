import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNImageToPdf from 'react-native-image-to-pdf';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import {
  clearScanImageData,
  closeModal,
  OpenValidationAlert,
  setScanImageData,
} from 'src/redux/actions/common';
import { clearSaveDocument, saveDocument } from 'src/redux/actions/scan';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';
interface IScanDocumentBOProps {
  scanimages: any;
  clearScanImageData: Function;
  setScanImageData: Function;
  saveDocument: Function;
  OpenValidationAlert: Function;
  closeModal: Function;
  saveDocumentMessage: string;
  saveDocumentSuccess: boolean;
  clearSaveDocument: Function;
  loading: boolean;
  filename: string;
}
const ScanDocumentBO = (props: IScanDocumentBOProps) => {
  const navigation = useNavigation();
  const [isCombine, setCombine] = React.useState(false);
  const [imageData, setImageData] = React.useState([]);
  const [finalData, setFinalData] = React.useState([]);
  const [filename, setfilename] = React.useState('');
  //var param = useRoute().params;
  var height = Dimensions.get('screen').height;
  React.useEffect(() => {
    setImageData([]);
    setImageData(props.scanimages);
    let temp: any = [];
    props.scanimages.map((item: any) => {
      console.log('Item', item);
      if (!item.uri.includes('document') && !item.uri.includes('pdf')) {
        temp.push(item.uri.toString().replace('file://', ''));
      }
    });
    setFinalData(temp);
  }, []);

  React.useEffect(() => {
    if (props.filename && props.filename !== '') {
      setfilename(props.filename);
    }
  }, [props.filename]);

  React.useEffect(() => {
    if (props.saveDocumentMessage && props.saveDocumentSuccess == false) {
      setTimeout(() => {
        let obj = {
          message: props.saveDocumentMessage,
          type: 'failure',
        };
        props.OpenValidationAlert(obj);
        props.clearSaveDocument();
      }, 500);
    }
    if (props.saveDocumentSuccess) {
      let obj = {
        message: 'Document uploaded successfully',
        type: 'success',
      };
      props.OpenValidationAlert(obj);

      setTimeout(() => {
        setTimeout(() => {
          navigation.navigate('UploadedDocumentScreen', {
            screen: 'UploadedDocumentBO',
            params: { isBack: true, backToScan: true },
          });
        }, 500);
        props.clearSaveDocument();
        props.closeModal();
      }, 1500);
    }
  }, [props.saveDocumentMessage, props.saveDocumentSuccess]);

  const convertToPDF = async () => {
    try {
      const options = {
        imagePaths: finalData,
        name: Platform.OS === 'android' ? filename + '.pdf' : filename,
        maxSize: {
          width: 900,
          height: Math.round((height / height) * 900),
        },
        quality: 0.7,
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);
      if (pdf) {
        let path =
          Platform.OS === 'android' ? 'file://' + pdf.filePath : pdf.filePath;
        let temp: any[] = [];
        let obj: any = {};
        obj.uri = path;
        obj.type = 'application/pdf';
        obj.name = pdf.filePath.split('/').pop();
        temp.push(obj);
        let request = {
          uploaded_for: 3,
          name: filename,
          is_combine: isCombine,
        };
        props.saveDocument(request, temp);
        props.clearScanImageData();
      }
      console.log('Converted PDF', pdf);
    } catch (e) {
      console.log(e);
    }
  };

  async function imageSending() {
    let temp: any[] = [];

    const fileToBase64 = (filename: string, filepath: string) => {
      return new Promise((resolve) => {
        try {
          var file = new File(
            [filename],
            filepath.toString().replace('file://', ''),
          );
        } catch (err) {
          console.log('Foile Errr', err);
        }
        temp.push(file);
        var reader = new FileReader();
        reader.onload = function (event: any) {
          resolve(file);
        };
        reader.readAsDataURL(file);
      });
    };

    Promise.all(
      imageData.map((item: any) => {
        return item;
      }),
    ).then((response: any) => {
      let request = {
        uploaded_for: 3,
        name: props.filename,
        is_combine: isCombine,
      };
      props.saveDocument(request, response);
      props.clearScanImageData();
    });
  }

  const renderItem = (item: any, index: number) => {
    return (
      <View style={styles.cellContainer}>
        {item.uri.includes('document') ? (
          <Image
            source={{
              uri:
                'https://www.kindpng.com/picc/m/33-333606_pdf-download-icon-png-transparent-png.png',
            }}
            style={styles.imagePlaceholder}
            resizeMode={'cover'}
          />
        ) : (
          <Image
            source={{ uri: item.uri }}
            style={styles.imagePlaceholder}
            resizeMode={'cover'}
          />
        )}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            let tempAry = JSON.parse(JSON.stringify(imageData));
            tempAry.splice(index, 1);
            setImageData(tempAry);
            props.clearScanImageData();
            setTimeout(() => {
              props.setScanImageData(tempAry, true);
            }, 200);
          }}
        >
          <Image
            source={IMAGES.IC_DELETE}
            style={styles.deleteIcon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  function upload() {
    if (imageData.length > 0) {
      let imageTypes = '.jpg' || '.jpeg' || '.png';
      let typeInc = '';
      let count = 0;
      Promise.all(
        imageData.map((i: any) => {
          console.log('Item', i.name, count);
          if (i.name.includes('.pdf')) {
            if (typeInc === '' || typeInc === 'image') {
              count = count === 1 ? 2 : 1;
              typeInc = 'file';
            }
            // console.log('If');
          } else if (i.name.includes(imageTypes)) {
            if (typeInc === '' || typeInc === 'file') {
              count = count === 1 ? 2 : 1;
              typeInc = 'image';
            }

            // console.log('Else');
          }
        }),
      ).then(() => {
        // console.log('Result', count);
        if (count === 2) {
          let obj = {
            message: 'Please select either Document or Image',
            type: 'failure',
          };
          props.OpenValidationAlert(obj);
        } else {
          if (imageData.length > 0) {
            if (isCombine) {
              convertToPDF();
            } else {
              imageSending();
            }
          } else {
            let obj = {
              message: 'Please select the documents',
              type: 'failure',
            };
            props.OpenValidationAlert(obj);
          }
        }
      });
    }
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={'Scan Document'}
          leftClick={() => navigation.goBack()}
          leftImg={IMAGES.IC_BACK}
          rightImg={IMAGES.IC_HEADER_RIGHT}
          rightClick={() => upload()}
        />
        <TouchableOpacity
          onPress={() => {
            setCombine(!isCombine);
          }}
          style={[styles.checkBoxContaier]}
        >
          <TouchableOpacity disabled style={styles.checkBox}>
            {isCombine && (
              <Image
                style={{ width: 12, height: 12 }}
                resizeMode={'contain'}
                source={IMAGES.IC_HEADER_RIGHT}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.combineText}>Combine all images</Text>
        </TouchableOpacity>
        <FlatList
          scrollEnabled={true}
          data={imageData}
          style={styles.flatlistStyle}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item, index }) => renderItem(item, index)}
        />

        <COMPONENT.Popup />
        <COMPONENT.Loader isLoading={props.loading} />
        <TouchableOpacity
          onPress={() => navigation.navigate('ScanDocumentBO')}
          style={[styles.FloatButton, { backgroundColor: COLOR.getTheme() }]}
        >
          <Image source={IMAGES.IC_MESSAGE_ADD} style={styles.floatAdd} />
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  scanimages: state.common.scanimages,
  filename: state.common.filename,
  saveDocumentMessage: state.scan.saveDocumentMessage,
  saveDocumentSuccess: state.scan.saveDocumentSuccess,
  loading: state.scan.loading,
});
export default connect(mapStateToProps, {
  clearScanImageData,
  setScanImageData,
  saveDocument,
  OpenValidationAlert,
  closeModal,
  clearSaveDocument,
})(ScanDocumentBO);
