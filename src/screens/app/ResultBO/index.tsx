import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Pie from 'react-native-pie';
import Share from 'react-native-share';
import { connect } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import { saveCalculation } from 'src/redux/actions/calculation';
import { OpenValidationAlert, setLoaderTrue } from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import * as ROUTER from 'src/routes/router';
import styles from './styles';

const detailData = [
  { title: 'Details', redirect: 'ResultDetailBO' },
  { title: 'Amortization', redirect: 'Amortization' },
];

function numberWithCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
interface IResultProps {
  loading: boolean;
  OpenValidationAlert: Function;
  calculatedData: any;
  saveCalculation: Function;
  commonLoading: boolean;
  setLoaderTrue: Function;
  infoMessages: any;
  isGuest: boolean;
}
const ResultBO = (props: IResultProps) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState('');
  const [isSaved, setIsSaved] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const param: any = useRoute().params;
  const { config, fs } = RNFetchBlob;

  let FHAData = JSON.parse(JSON.stringify(props.calculatedData));
  let breakdown = FHAData.breakdown;
  let amortization = FHAData.amortization;
  let details = FHAData.details;
  let disclaimer = FHAData.disclaimer;
  let pdf_url = FHAData?.pdf_url ? FHAData?.pdf_url : '';

  React.useEffect(() => {
    if (param) {
      setIsSaved(param.isSaved);
    }
  }, [param]);

  const data = [
    {
      color: '#4FB263',
      title: `$${numberWithCommas(breakdown.principal.toFixed(2))}`,
      desc: 'Principal & Interest',
    },
    {
      color: '#EB4949',
      title: `$${numberWithCommas(breakdown.hazard_insurance.toFixed(2))}`,
      desc: 'Hazard Insurance',
    },
    {
      color: '#F4C427',
      title: `$${numberWithCommas(breakdown.taxes.toFixed(2))}`,
      desc: 'Taxes & HOA',
    },
    {
      color: '#3ACBE9',
      title: `$${numberWithCommas(breakdown.mortgage_insurance.toFixed(2))}`,
      desc: 'Mortgage Insurance',
    },
  ];

  const chartData = [
    {
      percentage: (breakdown.taxes * 100) / breakdown.total_monthly_payment,
      color: '#F4C427',
    },
    {
      percentage: (breakdown.principal * 100) / breakdown.total_monthly_payment,
      color: '#4FB263',
    },
    {
      percentage:
        (breakdown.mortgage_insurance * 100) / breakdown.total_monthly_payment,
      color: '#3ACBE9',
    },
    {
      percentage:
        (breakdown.hazard_insurance * 100) / breakdown.total_monthly_payment,
      color: '#EB4949',
    },
  ];

  const shareOptions = {
    title: 'Share via',
    url: pdf_url,
  };

  function ShareFile() {
    Share.open(shareOptions)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        err && console.log(err);
      });
  }

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

  const renderPageRedirect = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.redirectCell}
        onPress={() => {
          item.redirect === 'Amortization' && props.setLoaderTrue();
          ROUTER.navigate(item.redirect, {
            details: details,
            amortization: amortization,
          });
        }}
      >
        <View style={styles.saperator} />
        <Text style={styles.pageTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  const renderPie = () => {
    return (
      <View style={styles.chartContainer}>
        <Pie
          radius={80}
          sections={props.calculatedData ? chartData : []}
          strokeCap={'butt'}
        />
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => ShareFile()}
          style={[
            styles.shareButton,
            {
              backgroundColor: COLOR.getTheme(),
            },
          ]}
        >
          <Image
            source={IMAGES.IC_RESULT_SHARE}
            style={styles.icon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (pdf_url && pdf_url !== '') {
              // downloadFile();
              if (Platform.OS === 'ios') {
                setLoading(true);
              }
              downloadFile(pdf_url, pdf_url?.split('/').pop());
            }
          }}
          style={[styles.downloadButton, { backgroundColor: COLOR.getTheme() }]}
        >
          <Image
            source={IMAGES.IC_RESULT_DOWNLOAD}
            style={styles.icon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        {!isSaved && !props.isGuest && (
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: COLOR.getTheme() }]}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.saveText}>SAVE</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const renderRedirectPage = () => {
    return (
      <FlatList
        scrollEnabled={false}
        data={detailData}
        style={styles.flatlistStyle}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => renderPageRedirect(item)}
      />
    );
  };
  // const validateName = () => {
  //   if (fileName.trim() === '') {
  //     setAlertMessage(true);
  //     let obj = {
  //       message: 'Please enter a name to save calculation',
  //       type: 'failure',
  //     };
  //     props.OpenValidationAlert(obj);
  //   } else {
  //     setAlertMessage(false);
  //     setModalVisible(false);
  //     setTimeout(() => {
  //       setFileName('');
  //       navigation.navigate('SavedCalculationScreen', {
  //         screen: 'SavedCalculationBO',
  //         params: { isBack: true },
  //       });
  //     }, 500);
  //   }
  // };
  // const showAlertMessage = () => {
  //   return (
  //     <View style={styles.modalOverlay}>
  //       <View style={styles.modalContainer}>
  //         <Image
  //           source={IMAGES.IC_FAILURE}
  //           style={styles.popupImage}
  //           resizeMode={'contain'}
  //         />
  //         <Text style={styles.desc}>
  //           {'Please enter a name to save calculation'}
  //         </Text>
  //         <View style={styles.alertbuttonContainer}>
  //           <COMPONENT.Button
  //             title={'OK'}
  //             onPress={() => {
  //               setAlertMessage(false);
  //             }}
  //             type={'fill'}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };
  const getFileName = () => {
    return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.alertTitle}>Save Calculation</Text>
          <COMPONENT.TextField
            value={fileName}
            title={'Name'}
            placeholder={'Enter Here'}
            secureTextEntry={false}
            onChangeText={(name: string) => {
              setFileName(name);
            }}
          />
          <View style={styles.alertbuttonsContainer}>
            <COMPONENT.Button
              title={'SAVE'}
              type={'fill'}
              onPress={() => {
                if (fileName.trim() === '') {
                  setAlertMessage(true);
                  let obj = {
                    message: 'Please enter a name to save calculation',
                    type: 'failure',
                  };
                  props.OpenValidationAlert(obj);
                } else {
                  props.saveCalculation({ id: FHAData.id, name: fileName });
                  setAlertMessage(false);
                  setModalVisible(false);
                  setTimeout(() => {
                    setFileName('');
                  }, 500);
                }
              }}
            />
            <COMPONENT.Button
              title={'CANCEL'}
              type={'unfill'}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </View>
    );
  };
  const renderPopup = () => {
    return (
      <View style={styles.popupView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          {getFileName()}
          <COMPONENT.Popup />
        </Modal>
      </View>
    );
  };

  const getInfoMessage = (name: string) => {
    switch (name) {
      case 'saved_calculation':
        return props.infoMessages?.saved_calculations;
      case 'vaRefinance':
      case 'usdaRefinance':
      case 'jumboRefinance':
      case 'convetionalRefinance':
      case 'fhaRefinance':
        return props.infoMessages?.calculator_refinance_result;
      case 'vaPurchase':
      case 'usdaPurchase':
      case 'jumboPurchase':
      case 'conventionalPurchase':
      case 'fhaPurchase':
        return props.infoMessages?.calculator_purchase_result;
      default:
        return props.infoMessages?.saved_calculations;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Results'}
          infoMessage={getInfoMessage(
            param ? param.iType : 'saved_calculation',
          )}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
          rightTwoClick={() => ShareFile()}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        <ScrollView>
          {renderPopup()}
          <View style={styles.paymentContainer}>
            <Text style={styles.amount}>
              $
              {breakdown.total_monthly_payment &&
                numberWithCommas(breakdown.total_monthly_payment.toFixed(2))}
            </Text>
            <Text style={styles.amountDesc}>Total Payment Amount</Text>
          </View>
          {renderPie()}
          <COMPONENT.ChartDetail data={data} column={2} />
          {renderButtons()}
          {renderRedirectPage()}
          {disclaimer !== null && disclaimer !== undefined && (
            <View style={styles.descContainer}>
              <Text style={styles.descText}>{disclaimer}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <COMPONENT.Loader isLoading={loading} />
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = (state: IReduxState) => ({
  loading: state.calculation.loading,
  commonLoading: state.common.loading,
  calculatedData: state.calculation.calculatedData,
  infoMessages: state.auth.infoMessages,
  isGuest: state.common.isGuest,
});
export default connect(mapStateToProps, {
  OpenValidationAlert,
  saveCalculation,
  setLoaderTrue,
})(ResultBO);
