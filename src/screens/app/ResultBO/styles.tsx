import { Dimensions, StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';

const height = Dimensions.get('screen').height;
const saveButtonWidth = CONSTANT.SCREEN_WIDTH - 150;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  emptyContainer: {
    height: height,
    backgroundColor: COLOR.THEME.WHITE,
  },
  keyboardAware: {
    flex: 1,
  },
  paymentContainer: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 10,
  },
  amount: {
    fontFamily: FONT.ROBOTO,
    marginRight: 5,
    color: COLOR.THEME.BLACK,
    fontWeight: 'bold',
    fontSize: 15,
  },
  amountDesc: {
    fontSize: 15,
    color: COLOR.THEME.LIGHT_GRAY,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  cellContainer: {
    width: '50%',
    height: 40,
    marginLeft: 15,
    marginTop: 15,
  },
  colorContainer: {
    flexDirection: 'row',
  },
  colorBox: {
    height: 12,
    width: 12,
    alignSelf: 'center',
  },
  cellAmount: {
    fontFamily: FONT.ROBOTO,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 10,
  },
  cellDesc: {
    fontFamily: FONT.ROBOTO,
    fontSize: 15,
    marginLeft: 22,
    color: COLOR.THEME.LIGHT_GRAY,
    marginTop: 5,
  },
  flatlistStyle: {
    marginTop: 25,
  },
  buttonContainer: {
    height: 60,
    marginLeft: 15,
    //justifyContent: 'center',
    alignItems: 'center',
    width: CONSTANT.SCREEN_WIDTH - 30,
    marginTop: 30,
    flexDirection: 'row',
  },
  shareButton: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    width: 42,
    marginLeft: 5,
    borderRadius: 4,
  },
  icon: {
    height: 20,
    width: 20,
  },
  downloadButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    borderRadius: 4,
  },
  saveButton: {
    height: 42,
    width: saveButtonWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    borderRadius: 4,
  },
  saveText: {
    fontFamily: FONT.ROBOTO,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.THEME.WHITE,
  },
  redirectCell: {
    width: CONSTANT.SCREEN_WIDTH - 30,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  descContainer: {
    alignSelf: 'center',
    width: CONSTANT.SCREEN_WIDTH,
    justifyContent: 'center',
    backgroundColor: COLOR.THEME.LIGHT_BLUE,
    paddingVertical: 30,
    alignItems: 'center',
  },
  descText: {
    color: COLOR.THEME.TITLE_GRAY,
    textAlign: 'center',
    paddingHorizontal: 15,
    fontSize: 13,
  },
  saperator: {
    height: 0.5,
    backgroundColor: '#CACACA',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  pageTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    // marginLeft: 15,
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
  popupImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
  desc: {
    alignSelf: 'center',
    fontSize: 17,
    marginTop: 20,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  alertbuttonContainer: {
    marginTop: 10,
    marginBottom: 30,
    height: 50,
    justifyContent: 'space-between',
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
    // marginTop: 22,
  },
  closeIcon: {
    height: 30,
    width: 30,
  },
  alertTitle: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 17,
    fontWeight: 'bold',
  },
  alertbuttonsContainer: {
    marginVertical: 10,
    height: 140,
    justifyContent: 'space-between',
  },
});
export default styles;
