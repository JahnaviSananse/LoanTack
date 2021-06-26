import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as COLOR from 'src/constants/colors'
import * as FONT from 'src/assets/fonts'
import * as CONSTANT from 'src/constants/constant'

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
    width: CONSTANT.SCREEN_WIDTH - 30,
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
  buttonContainer: {
    marginTop: 180
  },
  contentStyle: {
    paddingBottom: 300
  },
  detailContainer: {
    width: '85%',
    marginTop: 20,
    alignSelf: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center'
  },
  desc: {
    fontSize: 15,
    color: COLOR.THEME.LIGHT_GRAY,
    marginTop: 15,
    textAlign: "center"
  },
  formContainer: {
    height: 180,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 100
  }
});
