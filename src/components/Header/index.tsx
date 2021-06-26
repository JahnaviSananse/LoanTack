import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import styles from './style';
interface IHeaderProps {
  leftImg?: any;
  rightImg?: any;
  leftClick?: any;
  rightClick?: any;
  title: string;
}
// This will help you to render custom navigation bar.
// Its defualt component for my structure. We can modify as per requirement
const Header = (props: IHeaderProps) => {
  const { leftImg, rightImg, leftClick, rightClick, title } = props;
  let headerTitle = title ? title : '';
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftImgContainer} onPress={leftClick}>
        <Image
          source={leftImg}
          style={styles.img}
          resizeMode={'contain'}
        ></Image>
      </TouchableOpacity>
      <Text style={[styles.headerText, { color: COLOR.getTheme() }]}>
        {headerTitle}
      </Text>
      <TouchableOpacity style={styles.leftImgContainer} onPress={rightClick}>
        <Image
          source={rightImg}
          style={styles.rightImage}
          resizeMode={'contain'}
        ></Image>
      </TouchableOpacity>
      <Text style={styles.versionText}>{DeviceInfo.getVersion()}</Text>
    </View>
  );
};
export default Header;
