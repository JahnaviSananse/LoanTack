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
import * as COLOR from 'src/constants/colors';
import {
  setFileName,
  setScanImageData,
  toggleSettingOption,
} from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import POPUP from './popup';
import styles from './styles';
interface IScanDocumentBOProps {
  toggleSettingOption: any;
  showOptions: boolean;
  setScanImageData: Function;
  scanimages: String[];
  setFileName: Function;
  infoMessages: any;
}
const ScanDocumentGetStartBO = (props: IScanDocumentBOProps) => {
  const navigation = useNavigation();
  const params = useRoute().params;
  const [showAlert, setShowAlert] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const [cameraVisible, setCameraVisible] = React.useState(false);
  const [phoneImageData, setphoneImageData] = React.useState([]);
  const [selected, setSelected] = React.useState(0);
  React.useEffect(() => {}, []);

  function redirect() {
    props.setScanImageData(phoneImageData);
    setphoneImageData([]);
    setTimeout(() => {
      navigation.navigate('ScanedDocumentBO', { filename: fileName });
    }, 1000);
  }
  const takePicture = async function (camera: any) {
    setphoneImageData([]);
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    let uri: string = data.uri; /*.toString().replace('file://', '')*/
    setphoneImageData(phoneImageData.concat(uri));
    setCameraVisible(false);
    redirect();
    //setShowAlert(true);
  };
  const chooseImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      cropping: false,
    }).then((images: any) => {
      let temp: string[] = [];
      images.map((res: any) => {
        console.log('i', res);
        setphoneImageData([]);
        let uri: string = '';
        if (Platform.OS === 'android') {
          uri = res.path /*.toString().replace('file://', '')*/;
          temp.push(uri);
        } else {
          temp.push(res.path);
        }
      });
      console.log('IMage Full', images);
      setphoneImageData(temp);
      redirect();
      //setShowAlert(true);
      //props.setScanImageData(phoneImageData);
    });
  };

  const chooseDocuments = async () => {
    // Pick multiple files
    setphoneImageData([]);
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf],
      });
      let temp = [];
      for (const res of results) {
        temp.push(res.uri);
      }
      setphoneImageData(temp);
      redirect();
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
          style={styles.uploadDocumentButton}
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
          <Text>Get Started</Text>
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
          leftImg={
            params !== undefined ? IMAGES.IC_BACK : IMAGES.IC_HEADER_SETTING
          }
          leftClick={() =>
            params !== undefined
              ? navigation.goBack()
              : props.toggleSettingOption(!props.showOptions)
          }
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={styles.extraPadding}
        >
          <Text style={styles.title}>Scan New Document</Text>
          <View style={styles.uploadDocumentContainer}>
            <TouchableOpacity
              style={[
                styles.uploadDocumentButton,
                { backgroundColor: COLOR.getTheme() },
              ]}
              onPress={() => {
                setShowAlert(true);
              }}
            >
              <Text style={styles.uploadDocumentText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <POPUP
          type={'failure'}
          visible={showAlert}
          closeAlert={() => closeAlert()}
          onChangeText={(text: string) => setFileName(text)}
          value={fileName}
          setData={() => {
            props.setFileName(fileName);
            //navigation.navigate('ScanDocumentBO', {filename: fileName});
            // navigation.navigate('ScanDocumentBO', {
            //   screen: 'ScanDocumentBO',
            //   params: {filename: fileName},
            // });
            // ROUTER.navigate('ScanDocumentBO', { fileName: fileName });
            navigation.navigate('ScanDocumentBO', { fileName: fileName });
          }}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  showOptions: state.common.showOptions,
  scanimages: state.common.scanimages,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  toggleSettingOption,
  setScanImageData,
  setFileName,
})(ScanDocumentGetStartBO);
