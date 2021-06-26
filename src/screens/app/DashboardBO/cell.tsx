import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import * as IMAGES from 'src/assets/images';
import Image from 'src/components/Image';
import * as COLORS from 'src/constants/colors';
import styles from './styles';
interface ICellProps {
  item?: any;
  getChatID: Function;
}

const cell = (props: ICellProps) => {
  const { item, onPressMessage } = props;
  const navigation = useNavigation();
  let licenceNum = item.licence ? item.licence : '';
  return (
    <View style={styles.ofcContainer}>
      <View
        style={[
          styles.ofcSubContainer,
          { backgroundColor: item.role === 2 ? COLORS.getTheme() : '#1F2428' },
        ]}
      >
        <View style={styles.detailConatainer}>
          <Text style={styles.ofcName}>{item.name}</Text>
          <Text style={styles.ofcDesignation}>{item.designation}</Text>
          <Text style={styles.ofcCode}>{'NMLS: ' + licenceNum}</Text>
        </View>
        <View style={styles.ofcButtonContainer}>
          <TouchableOpacity
            style={styles.ofcButton}
            onPress={() => {
              navigation.navigate('BioBO', {
                item: item,
              });
            }}
          >
            <Image
              source={IMAGES.IC_BIO}
              style={styles.ofcIcon}
              resizeMode={'contain'}
            />
            <Text style={styles.ofcButtonText}>Bio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ofcButton}
            onPress={() => {
              Linking.openURL(
                'tel://' + '+' + item.contact_code + item.contact_number,
              );
            }}
          >
            <Image
              source={IMAGES.IC_CALL}
              style={styles.ofcIcon}
              resizeMode={'contain'}
            />
            <Text style={styles.ofcButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ofcButton}
            onPress={() => {
              Linking.openURL(
                'sms://' + '+' + item.contact_code + item.contact_number,
              );
            }}
          >
            <Image
              source={IMAGES.IC_TEXT}
              style={styles.ofcIcon}
              resizeMode={'contain'}
            />
            <Text style={styles.ofcButtonText}>Text</Text>
          </TouchableOpacity>
          {item.role === 2 && (
            <TouchableOpacity
              style={styles.ofcButton}
              onPress={() => {
                onPressMessage(item.name);
                // navigation.navigate('MessageScreen', {
                //   screen: 'ChatLO',
                //   params: {
                //     isBack: true,
                //     name: item.name,
                //   },
                // });
              }}
            >
              <Image
                source={IMAGES.IC_DM}
                style={styles.ofcIcon}
                resizeMode={'contain'}
              />
              <Text style={styles.ofcButtonText}>DM</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {item.profile_photo && (
        <Image
          source={{ uri: item.profile_photo }}
          style={{
            height: 100,
            width: 100,
            marginLeft: 20,
            position: 'absolute',
            top: 0,
          }}
        />
      )}
    </View>
  );
};
export default cell;
