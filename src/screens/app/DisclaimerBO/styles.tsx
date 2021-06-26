import { StyleSheet } from 'react-native';
import * as COLOR from '../../../constants/colors'
import * as FONT from 'src/assets/fonts'

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: "column"
  },
  cellContainer: {
    paddingVertical: 20,
    width: '90%',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  text: {
    paddingHorizontal: 15,
    marginTop: 20,
    fontFamily: FONT.ROBOTO,
    fontSize: 17
  },
  keyboardAware: {
    flex: 1
  }

});
