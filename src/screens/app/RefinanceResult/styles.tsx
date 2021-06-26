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
  modalOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: '#00000095',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 4,
  },
  closeContainer: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  closeIcon: {
    height: 30,
    width: 30,
  },
  alertTitle: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 17,
    fontWeight: "bold"
  },
  alertbuttonsContainer: {
    marginVertical: 10,
    height: 140,
    justifyContent: 'space-between'
  }
});
