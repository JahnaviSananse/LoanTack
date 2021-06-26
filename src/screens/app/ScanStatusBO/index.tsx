import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import styles from './styles';

interface IScanStatusBOProps {
  // toggleSettingOption: any;
  // showOptions: boolean;
}
const ScanStatusBO = (props: IScanStatusBOProps) => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  React.useEffect(() => {}, []);
  const renderDetail = () => {
    return (
      <View style={styles.detailContainer}>
        <Text style={styles.emailText}>Verify Email</Text>
        <Text style={styles.emailDetail}>
          A verification email has been sent to abc@xyz.com, please click the
          link in your email to continue.
        </Text>
      </View>
    );
  };
  const renderBlackBox = () => {
    return (
      <View style={styles.blackBoxContainer}>
        <View>
          <Text style={styles.purchasePriceText}>Status</Text>
          <Text style={styles.purchasePriceAmount}>WAITING</Text>
        </View>
      </View>
    );
  };
  const renderButtonWithInfo = () => {
    return (
      <View style={styles.buttonInfoContainer}>
        <Text style={styles.info}>
          Didn't receive the email or need to change the email address?
        </Text>
        <View style={styles.startAgainContainer}>
          <COMPONENT.Button
            title={'START AGAIN'}
            type={'unfill'}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}>
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Scan'}
          leftImg={IMAGES.IC_HEADER_SETTING}
          // leftClick={() => props.toggleSettingOption(!props.showOptions)}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        <ScrollView contentContainerStyle={styles.contentStyle}>
          {renderDetail()}
          {renderBlackBox()}
          {renderButtonWithInfo()}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

// const mapStateToProps = (state: IReduxState) => ({
//   showOptions: state.common.showOptions
// });

// export default connect(mapStateToProps, {
//   toggleSettingOption
// })(ScanStatusBO);

export default ScanStatusBO;
