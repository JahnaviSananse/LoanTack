import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';

interface IWebviewProps {
  customLink: string;
}
const Webview = (props: IWebviewProps) => {
  const navigation = useNavigation();
  var params: any = useRoute().params;
  const [redirect, setRedirect] = React.useState('');
  React.useEffect(() => {
    if (props.customLink) {
      setRedirect(props.customLink);
    }
  }, [props.customLink]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={params ? params.title : ''}
          leftImg={params.url && IMAGES.IC_BACK}
          leftClick={() => params.url && navigation.goBack()}
        />
        <WebView
          source={{ uri: params.url ? params.url : redirect }}
          allowFileAccess
          allowFileAccessFromFileURLs
          allowUniversalAccessFromFileURLs
          startInLoadingState
          // allowingReadAccessToURL
          scrollEnabled={true}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  customLink: state.common.customLink,
});

export default connect(mapStateToProps, {})(Webview);
