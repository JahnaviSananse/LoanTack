import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import { IReduxState } from 'src/redux/reducers';
import * as modalInfo from 'src/redux/types/modalDescription';
import styles from './styles';

interface IDetailBOProps {
  loading: boolean;
  loanprogramDetail: any;
  infoMessages: any;
}
const LoanProgramDetailBO = (props: IDetailBOProps) => {
  const navigation = useNavigation();
  console.log(props.loanprogramDetail.description);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAwareL}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={
            props.loanprogramDetail
              ? props.loanprogramDetail.name
              : 'Loan Programs'
          }
          infoMessage={props.infoMessages?.loan_programs_info}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
          rightOneClick={() => setShowAlert(true)}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
          popupInfo={{
            title: modalInfo.default.learningCenterTitle,
            description: modalInfo.default.learningCenterDescription,
          }}
        />
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}> */}

        <WebView
          source={{
            html:
              Object.entries(props.loanprogramDetail).length > 0
                ? props.loanprogramDetail.description
                : '',
          }}
          style={{ margin: 15 }}
          scrollEnabled={true}
        />

        {/* {Object.entries(props.loanprogramDetail).length > 0 && (
            <HTML
              html={props.loanprogramDetail.description}
              allowFontScaling={true}
              imagesMaxWidth={300}
              tagsStyles={{
                br: {margin: 0},
                p: {margin: 0},
                img: {flex: 1, alignSelf: 'center', margin: 0},
                // em: { margin: 0 },
                // u: { margin: 0 },
                // strong: { margin: 0 },
              }}
              ignoredStyles={['width', 'height']}
              ignoredTags={['br']}
              classesStyles={{
                'ql-size-huge': {
                  fontSize: 30,
                },
                'ql-size-small': {
                  fontSize: 10,
                },
                'ql-size-large': {
                  fontSize: 20,
                },
              }}
            />
          )} */}
        {/* </ScrollView> */}
        <COMPONENT.Loader isLoading={props.loading} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.guide.loading,
  loanprogramDetail: state.guide.loanprogramDetail,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {})(LoanProgramDetailBO);
