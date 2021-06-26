import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import { getDisclaimer } from 'src/redux/actions/guide';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';

const data =
  'A volutpat neque augue dolor egestas fusce in. Velit sed facilisi vehicula vestibulum malesuada tellus, purus vestibulum, mauris. Facilisis viverra nec orci interdum metus. Et tellus leo enim imperdiet enim at. Gravida quis pulvinar tincidunt nisl nunc mauris. Vitae tellus in enim ultrices scelerisque et massa vestibulum, arcu. Sit elit, lectus sagittis facilisis elit cras tortor consectetur tellus. Nec, cras nulla lobortis ac sodales. Massa id aliquam a, tellus ipsum arcu praesent. Nunc vitae dui nisl est, id et praesent morbi. Eleifend vitae proin tortor vel massa nisi, facilisis consectetur enim. Interdum sed a cras habitant scelerisque. Fringilla suspendisse dictum quam eu egestas quis molestie arcu.';
interface IDisclaimerBOProps {
  loading: boolean;
  disclaimer: any;
  getDisclaimer: Function;
}

const DisclaimerBO = (props: IDisclaimerBOProps) => {
  const navigation = useNavigation();
  React.useEffect(() => {
    props.getDisclaimer();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={'Disclaimer'}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
        />
        <WebView
          source={{
            html:
              Object.entries(props.disclaimer).length > 0
                ? props.disclaimer.description
                : '',
          }}
          style={{ margin: 15 }}
          scrollEnabled={true}
        />
        {/* <ScrollView contentContainerStyle={{ paddingBottom: 200, paddingHorizontal: 10}}>
          {
            Object.keys(props.disclaimer).length > 0 &&
            <HTML
            html={props.disclaimer.description}
            allowFontScaling={true}
            tagsStyles={{
              br: { margin: 0 },
              p: { margin: 0 },
              em: { margin: 0 },
              u: { margin: 0 },
              strong: { margin: 0 },
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
          }
        </ScrollView> */}
        <COMPONENT.Loader isLoading={props.loading} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.guide.loading,
  disclaimer: state.guide.disclaimer,
});

export default connect(mapStateToProps, { getDisclaimer })(DisclaimerBO);
