import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import Image from 'src/components/Image';
import { updateInfoModal } from 'src/redux/actions/modal';
import { IReduxState } from 'src/redux/reducers';
import styles from './style';

interface IInfoPopupProps {
  isInfo: boolean;
  description: string;
  closeAlert?: any;
  title: string;
  updateInfoModal: Function;
}

const InfoPopup = (props: IInfoPopupProps) => {
  const { isInfo, description, title } = props;

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isInfo}
      onRequestClose={() => {}}
    >
      <TouchableOpacity
        onPress={() => {
          props.updateInfoModal(false, '', '');
        }}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{description}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              props.updateInfoModal(false, '', '');
            }}
          >
            <Image
              source={IMAGES.IC_CLOSE}
              style={styles.icon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
const mapStateToProps = (state: IReduxState) => ({
  isInfo: state.modal.isInfo,
  title: state.modal.title,
  description: state.modal.description,
});

export default connect(mapStateToProps, {
  updateInfoModal,
})(InfoPopup);
