import {StyleSheet} from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as COLOR from 'src/constants/colors';
export default styles = StyleSheet.create({
  containerStyle: {
    height: '100%',
    width: '90%',
    alignSelf: 'center',
  },
  keyboardAware: {
    flex: 1,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
});
