import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import {
  setScanImageData,
  toggleSettingOption,
} from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import POPUP from './popup';
import RCamera from './RCamera';
import styles from './styles';
interface IScanDocumentBOProps {
  toggleSettingOption: any;
  showOptions: boolean;
  setScanImageData: Function;
  scanimages: String[];
  filename: string;
  infoMessages: any;
}
const ScanDocumentBO = (props: IScanDocumentBOProps) => {
  const navigation = useNavigation();
  const params = useRoute().params;
  const [showAlert, setShowAlert] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const [cameraVisible, setCameraVisible] = React.useState(false);
  const [phoneImageData, setphoneImageData] = React.useState([]);
  const [selected, setSelected] = React.useState(0);
  React.useEffect(() => {
    if (props.filename !== null && props.filename !== undefined) {
      setFileName(props.filename);
    }
  }, []);

  function redirect(data: any) {
    props.setScanImageData(data);
    setphoneImageData([]);
    // setTimeout(() => {
    //   navigation.navigate('ScanedDocumentBO', { filename: fileName });
    // }, 300);
  }
  const takePicture = async function (camera: any) {
    setphoneImageData([]);
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    console.log('Data', data);
    let uri: any = data.uri; /*.toString().replace('file://', '')*/
    let obj: any = {};
    obj.uri = uri;
    obj.name = uri.split('/').pop();
    obj.type = 'image/jpeg';
    setphoneImageData(phoneImageData.concat(obj));
    setCameraVisible(false);
    redirect(obj);
    //setShowAlert(true);
  };
  const chooseImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      cropping: false,
    }).then((images: any) => {
      let temp: any = [];
      images.map((res: any) => {
        console.log('i', res);
        setphoneImageData([]);
        let uri: string = '';
        if (Platform.OS === 'android') {
          uri = res.path /*.toString().replace('file://', '')*/;
          temp.push({
            uri: res.path,
            name: uri.split('/').pop(),
            type: res.mime,
          });
        } else {
          temp.push({ uri: res.path, name: res.filename, type: res.mime });
        }
      });
      setphoneImageData(phoneImageData.concat(temp));
      redirect(temp);
    });
  };

  const chooseDocuments = async () => {
    // Pick multiple files
    setphoneImageData([]);
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
      });
      let temp: any = [];
      for (const res of results) {
        temp.push({ uri: res.uri, name: res.name, type: res.type });
      }
      setphoneImageData(temp);
      redirect(temp);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const renderButton = () => {
    return (
      <View style={styles.uploadDocumentContainer}>
        <TouchableOpacity
          style={[
            styles.uploadDocumentButton,
            { backgroundColor: COLOR.getTheme() },
          ]}
          onPress={() => {
            navigation.navigate('UploadedDocumentScreen', {
              screen: 'UploadedDocumentBO',
              params: { isBack: true },
            });
          }}
        >
          <Text style={styles.uploadDocumentText}>UPLOADED DOCUMENTS</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View>
        <View style={styles.buttonsContainer}>
          <View>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderColor: COLOR.getTheme(),
                  backgroundColor: COLOR.getLightTheme(),
                },
              ]}
              onPress={() => {
                setCameraVisible(true);
              }}
            >
              <Image
                source={IMAGES.IC_BUTTON_CAMERA}
                style={styles.img}
                resizeMode={'contain'}
                tintColor={COLOR.getTheme()}
              />
            </TouchableOpacity>
            <Text style={styles.buttonTitle}>Take a Photo</Text>
          </View>
          <View>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderColor: COLOR.getTheme(),
                  backgroundColor: COLOR.getLightTheme(),
                },
              ]}
              onPress={() => {
                chooseImage();
              }}
            >
              <Image
                source={IMAGES.IC_BUTTON_GALLARY}
                style={styles.img}
                resizeMode={'contain'}
                tintColor={COLOR.getTheme()}
              />
            </TouchableOpacity>
            <Text style={styles.buttonTitle}>Select from Gallery</Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <View>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderColor: COLOR.getTheme(),
                  backgroundColor: COLOR.getLightTheme(),
                },
              ]}
              onPress={() => {
                chooseDocuments();
              }}
            >
              <Image
                source={IMAGES.IC_BUTTON_FILE}
                style={styles.img}
                resizeMode={'contain'}
                tintColor={COLOR.getTheme()}
              />
            </TouchableOpacity>
            <Text style={styles.buttonTitle}>Upload File</Text>
          </View>
        </View>
      </View>
    );
  };
  const closeAlert = () => {
    setFileName('');
    setShowAlert(false);
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Scan'}
          infoMessage={props.infoMessages?.scan_info}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        <Text style={styles.title}>Scan New Document</Text>
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={styles.extraPadding}
        >
          {renderOptions()}
          {renderButton()}
        </ScrollView>
        <POPUP
          type={'failure'}
          visible={showAlert}
          closeAlert={() => closeAlert()}
          onChangeText={(text: string) => setFileName(text)}
          value={fileName}
          setData={() => {
            props.setScanImageData(phoneImageData);
            setphoneImageData([]);
            // if(selected === 0)
            // {
            //   setCameraVisible(true)
            // }else if(selected === 1)
            // {
            //   chooseImage()
            // }else if(selected === 2)
            // {
            //   chooseDocuments()
            // }
          }}
        />
        <RCamera
          visible={cameraVisible}
          closeAlert={() => setCameraVisible(false)}
          takePicture={(camera: any) => takePicture(camera)}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  showOptions: state.common.showOptions,
  scanimages: state.common.scanimages,
  filename: state.common.filename,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  toggleSettingOption,
  setScanImageData,
})(ScanDocumentBO);
