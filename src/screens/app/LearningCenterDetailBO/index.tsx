import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import { getLearningCenterDetail } from 'src/redux/actions/guide';
import { IReduxState } from 'src/redux/reducers';
import * as modalInfo from 'src/redux/types/modalDescription';
import styles from './styles';

interface ILearningCenterBOProps {
  loading: boolean;
  learningcenterDetail: any;
  getLearningCenterDetail: Function;
  infoMessages: any;
}
const LearningCenterDetailBO = (props: ILearningCenterBOProps) => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAwareL}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={
            props.learningcenterDetail
              ? props.learningcenterDetail.title
              : 'Learning Center'
          }
          infoMessage={props.infoMessages?.learning_center}
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
        <WebView
          source={{
            html:
              Object.entries(props.learningcenterDetail).length > 0
                ? props.learningcenterDetail.description
                : '',
          }}
          style={{ margin: 15 }}
          scrollEnabled={true}
        />
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          {Object.entries(props.learningcenterDetail).length > 0 && (
            <HTML
              html={props.learningcenterDetail.description}
              allowFontScaling={true}
              tagsStyles={{
                br: {margin: 0},
                p: {margin: 0},
                em: {margin: 0},
                u: {margin: 0},
                strong: {margin: 0},
              }}
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
          )}
        </ScrollView> */}
        <COMPONENT.Loader isLoading={props.loading} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.guide.loading,
  learningcenterDetail: state.guide.learningcenterDetail,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, { getLearningCenterDetail })(
  LearningCenterDetailBO,
);
