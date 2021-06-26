import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import * as COLOR from 'src/constants/colors';
import styles from './style';

interface IButtonProps {
  title: string;
  onPress: any;
  type: string;
}

const Button = (props: IButtonProps) => {
  const {title, onPress, type} = props;
  let btnStyle =
    type === 'fill'
      ? [styles.fillButton, {backgroundColor: COLOR.getTheme()}]
      : [styles.unfillButton, {borderColor: COLOR.getTheme()}];
  let textStyle =
    type === 'fill'
      ? styles.fillText
      : [styles.unfillText, {color: COLOR.getTheme()}];
  return (
    <TouchableOpacity style={btnStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};
export default Button;
