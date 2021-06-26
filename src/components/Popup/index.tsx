import React from 'react';
import { Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import { closeModal } from 'src/redux/actions/common';
import { IReduxState } from 'src/redux/reducers';
import * as ROUTER from 'src/routes/router';
import styles from './style';
interface IButtonProps {
  modalVisible: boolean;
  message: string;
  type: string;
  closeModal: Function;
  redirect: string;
}
const Popup = (props: IButtonProps) => {
  const { modalVisible, type, message } = props;
  let popupImage = type === 'failure' ? IMAGES.IC_FAILURE : IMAGES.IC_SUCCESS;
  return (
    <View style={styles.popupView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Image
              source={popupImage}
              style={styles.popupImage}
              resizeMode={'contain'}
            />
            <Text style={styles.desc}>{message}</Text>
            <View style={styles.buttonContainer}>
              <COMPONENT.Button
                title={'OK'}
                onPress={() => {
                  if (props.redirect) {
                    props.closeModal();
                    if (props.redirect === 'Login') {
                      setTimeout(() => {
                        ROUTER.replace(props.redirect, {});
                      }, 1000);
                    } else if (props.redirect === 'goback') {
                      ROUTER.goBack();
                    } else {
                      setTimeout(() => {
                        ROUTER.navigate(props.redirect, {});
                      }, 1000);
                    }
                  } else {
                    props.closeModal();
                  }
                }}
                type={'fill'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const mapStateToProps = (state: IReduxState) => ({
  message: state.common.message,
  type: state.common.type,
  modalVisible: state.common.modalVisible,
  redirect: state.common.redirect,
});
export default connect(mapStateToProps, {
  closeModal,
})(Popup);
