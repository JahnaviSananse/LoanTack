import { StyleSheet, Dimensions } from 'react-native';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant'
import * as FONT from 'src/assets/fonts'

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  keyboardAwareL: {
    flex: 1
  },
  cellContainer: {
    height: 60,
    width: Dimensions.get('screen').width - 30,
    alignSelf: 'center',
    flexDirection: 'row',
    // backgroundColor: "#E5E5E5",
    backgroundColor: COLOR.THEME.CEll_BG,
    borderRadius: 4,
    marginTop: 15
  },
  icon: {
    height: 25,
    width: 25,
    alignSelf: "center",
    marginLeft: 10
  },
  title: {
    alignSelf: "center",
    marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold'
  }
});
