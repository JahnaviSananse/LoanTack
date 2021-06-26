import { StyleSheet } from 'react-native';
import * as COLOR from 'src/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  track: {
    height: 6,
    borderRadius: 10,
    backgroundColor: COLOR.THEME.THUMB_COLOR,
  },
  thumb: {
    width: 4,
    height: 24,
    borderRadius: 5,
    backgroundColor: COLOR.THEME.BLACK,
    // backgroundColor: 'red',
  },
  thumbSize: { width: 40, height: 40 },
  percentageStyles: {
    width: 60,
    textAlign: 'left',
    fontSize: 12,
    position: 'absolute',
    bottom: 0,
  },
});
export default styles;
