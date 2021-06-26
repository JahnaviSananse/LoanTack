import { StyleSheet } from 'react-native';
import * as COLOR from '../../../constants/colors'
import * as FONT from 'src/assets/fonts'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: "column"
  },
  keyboardAware: {
    flex: 1
  },
  cellContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: "space-between",
    alignItems: 'center'
  },
  title: {
    fontFamily: FONT.ROBOTO,
    paddingLeft: 15,
    color: COLOR.THEME.LIGHT_GRAY,
    fontSize: 17
  },
  detail: {
    fontFamily: FONT.ROBOTO,
    paddingRight: 15,
    fontSize: 17
  },
  flatListStyle: {
    paddingTop: 20
  }
});
