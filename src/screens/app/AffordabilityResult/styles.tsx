import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as COLOR from 'src/constants/colors'
import * as FONT from 'src/assets/fonts'
import * as CONSTANT from 'src/constants/constant'

const saveButtonWidth = CONSTANT.SCREEN_WIDTH - 150
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: "column",
  },
  keyboardAware: {
    flex: 1
  },
  chartContainer: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 30
  },
  blackBoxContainer: {
    height: 117,
    width: '90%',
    backgroundColor: COLOR.THEME.BLACK,
    borderRadius: 4,
    marginTop: 25,
    alignSelf: "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  purchasePriceText: {
    fontFamily: FONT.ROBOTO,
    color: 'white',
    alignSelf: "center",
    fontSize: 17
  },
  purchasePriceAmount: {
    fontFamily: FONT.ROBOTO,
    color: 'white',
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
  },
  descContainer: {
    backgroundColor: COLOR.THEME.LIGHT_BLUE,
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  descText: {
    fontFamily: FONT.ROBOTO,
    paddingVertical: 20,
    paddingHorizontal: 15,
    textAlign: 'center',
    color: "#8D8E90",
    fontSize: 13
  },
  tabbarTopBorder: {
    borderWidth: 0.5,
    borderColor: COLOR.THEME.SEPARETOR,
    width: CONSTANT.SCREEN_WIDTH,
    alignSelf: "center"
  },
  scrollableTabViewStyle: {
    width: CONSTANT.SCREEN_WIDTH,
    alignSelf: 'center'
  },
  tabbarTextStyle: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  tabbarUnderlineStyle: {
    height: 3,
    backgroundColor: COLOR.THEME.GREEN,
  },
  tabbarPageContainer: {
    flex: 1
  },
  scrollViewContentStyle: {
    paddingBottom: 200
  }
});
