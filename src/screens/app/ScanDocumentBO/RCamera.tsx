import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as IMAGE from '../../../assets/images';
import { Image } from '../../../components';
import * as COLOR from '../../../constants/colors';
import styles from './styles';

interface IButtonProps {
  visible: boolean;
  takePicture: Function;
  closeAlert: any;
}

const RCamera = (props: IButtonProps) => {
  const { visible, takePicture, closeAlert } = props;

  const PendingView = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    ></View>
  );
  return (
    <View style={styles.popupView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={() => closeAlert(false)}
      >
        <View style={styles.container2}>
          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          >
            {({ camera, status, recordAudioPermissionStatus }) => {
              if (status !== 'READY') return <PendingView />;
              return (
                <>
                  <View
                    style={{
                      flex: 0,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => takePicture(camera)}
                      style={styles.capture}
                    >
                      <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                  </View>
                </>
              );
            }}
          </RNCamera>
          <TouchableOpacity
            onPress={() => closeAlert(false)}
            style={styles.close}
          >
            <Image
              style={styles.closeIcon}
              source={IMAGE.IC_CLOSE}
              tintColor={COLOR.THEME.WHITE}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
export default RCamera;
