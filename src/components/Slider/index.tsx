import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import CustomSlider from 'react-native-slider';
import * as COLOR from 'src/constants/colors';
import styles from './styles';

interface IProps {
  value: any;
  onValueChange: any;
  minValue: any;
  maxValue: any;
  percentage: any;
  showPercentage: boolean;
}
const Slider = (props: IProps) => {
  const { value, onValueChange, minValue, maxValue } = props;
  let sliderWidth = Dimensions.get('screen').width - 90;
  let percentage = (100 * value) / maxValue;
  let left = (sliderWidth * percentage) / 100;
  let totalPer = 0;
  if (props.percentage) {
    totalPer = props.percentage;
  }
  return (
    <View style={{ height: 50, marginTop: 5 }}>
      <CustomSlider
        value={value}
        onValueChange={onValueChange}
        minimumValue={minValue}
        maximumValue={maxValue}
        trackStyle={styles.track}
        thumbStyle={styles.thumb}
        thumbTouchSize={styles.thumbSize}
        minimumTrackTintColor={COLOR.getTheme()}
      />
      {props.showPercentage && (
        <Text style={[styles.percentageStyles, { left: left }]}>
          {totalPer.toFixed(2) + '%'}
        </Text>
      )}
    </View>
  );
};

export default Slider;
