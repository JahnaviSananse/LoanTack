import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import * as IMAGES from 'src/assets/images';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import styles from './styles';

interface IButtonProps {
  visible: boolean;
  closeAlert: any;
  timeSlot: any;
  value: any;
}

const data = [{ title: 'Morning' }, { title: 'Evening' }, { title: 'ASAP' }];
const Popup = (props: IButtonProps) => {
  const { visible, closeAlert, timeSlot, value } = props;

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          closeAlert(false);
          timeSlot(item.title);
        }}
        style={[
          styles.cell,
          {
            backgroundColor: item.title === value ? COLOR.getTheme() : 'white',
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: item.title === value ? 'white' : 'black' },
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.popupView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => closeAlert(false)}
              style={styles.close}
            >
              <Image
                source={IMAGES.IC_CLOSE}
                style={styles.icon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <Text style={styles.desc}>{'Best Time to Call'}</Text>
            <FlatList
              scrollEnabled={true}
              data={data}
              style={styles.flatStyle}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => renderItem(item)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Popup;
