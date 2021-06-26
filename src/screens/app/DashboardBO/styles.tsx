import {StyleSheet} from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';
const optionContainerWidth = CONSTANT.SCREEN_WIDTH - 50;
const optionWidth = optionContainerWidth / 4;

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  dataContainer: {
    marginBottom: 130,
  },
  containStyle: {
    marginBottom: 20,
  },
  htmlContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  htmlContainer2: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: 50,
    width: CONSTANT.SCREEN_WIDTH - 30,
  },
  htmlmodalContainer: {
    paddingHorizontal: 10,
    height: 200,
    marginTop: 40,
  },
  optionContainer: {
    backgroundColor: 'white',
  },
  cellContainer: {
    height: 60,
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: COLOR.THEME.CEll_BG,
    flexDirection: 'row',
    borderRadius: 3,
  },
  selectOfficeContainer: {
    height: 60,
    marginTop: 10,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2428',
    flexDirection: 'row',
    borderRadius: 3,
  },
  cellTitle: {
    color: COLOR.THEME.BLACK,
    fontFamily: FONT.ROBOTO,
    marginHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  loanOfficeText: {
    color: '#FFFFFF',
    fontFamily: FONT.ROBOTO,
    marginHorizontal: 15,
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center',
  },
  cellDesc: {
    fontFamily: FONT.ROBOTO,
    color: COLOR.THEME.LIGHT_GRAY,
    paddingHorizontal: 10,
    fontSize: 14,
    marginVertical: 10,
  },
  cellTime: {
    fontFamily: FONT.ROBOTO,
    fontStyle: 'italic',
    color: COLOR.THEME.LIGHT_GRAY,
    paddingHorizontal: 10,
    fontSize: 14,
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    justifyContent: 'center',
    width: '100%',
    height: 120,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  popupView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  toucableButton: {
    height: 40,
    width: '50%',
    backgroundColor: COLOR.THEME.GREEN,
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: '#00000095',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'red',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 4,
  },
  readmoremodalContainer: {
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
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
  keyboardAwareL: {
    flex: 1,
  },
  modalTitle: {
    fontFamily: FONT.ROBOTO,
    alignSelf: 'center',
    marginTop: 35,
    fontSize: 17,
    fontWeight: 'bold',
  },
  modalDesc: {
    fontFamily: FONT.ROBOTO,
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 14,
    paddingHorizontal: 15,
    textAlign: 'center',
    color: COLOR.THEME.LIGHT_GRAY,
  },
  modalSep: {
    height: 0.5,
    width: '90%',
    backgroundColor: COLOR.THEME.SEPARETOR,
    alignSelf: 'center',
    marginVertical: 30,
  },
  useCodeText: {
    fontFamily: FONT.ROBOTO,
    alignSelf: 'center',
    fontSize: 14,
    paddingHorizontal: 15,
    textAlign: 'center',
    color: COLOR.THEME.BLACK,
  },
  codeText: {
    fontFamily: FONT.ROBOTO,
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  codeDesc: {
    fontFamily: FONT.ROBOTO,
    alignSelf: 'center',
    fontSize: 14,
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 30,
    textAlign: 'center',
    color: COLOR.THEME.BLACK,
  },
  closeIcon: {
    height: 30,
    width: 30,
  },
  cellImage: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginLeft: 10,
  },
  ofcContainer: {
    height: 200,
    width: '100%',
    marginTop: 20,
  },
  ofcSubContainer: {
    height: 180,
    width: CONSTANT.SCREEN_WIDTH - 20,
    borderRadius: 4,
    position: 'absolute',
    bottom: 0,
    marginHorizontal: 10,
  },
  detailConatainer: {
    height: 80,
    width: CONSTANT.SCREEN_WIDTH - 140,
    right: 0,
    position: 'absolute',
  },
  ofcName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ofcDesignation: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'normal',
    marginTop: 5,
  },
  ofcCode: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'normal',
    marginTop: 5,
  },
  ofcButtonContainer: {
    height: 70,
    marginTop: 100,
    width: optionContainerWidth,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  ofcIcon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  ofcButton: {
    height: 50,
    width: optionWidth,
    flexDirection: 'column',
  },
  ofcButtonText: {
    fontSize: 15,
    color: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 10,
  },
  introContainer: {
    width: '100%',
    overflow: 'hidden',
    // marginHorizontal: 10,
  },
  readMoreButton: {
    // paddingRight: 15,
    width: 150,
    height: 40,
    paddingVertical: 10,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  readmoreContainer: {
    width: '100%',
    backgroundColor: 'white',
  },
  introTitle: {
    fontFamily: FONT.ROBOTO,
    fontSize: 20,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  introDetail: {
    fontFamily: FONT.ROBOTO,
    fontSize: 17,
    color: '#000000',
    marginTop: 10,
    paddingHorizontal: 10,
    // backgroundColor: "red",
  },
  readMoreText: {
    fontFamily: FONT.ROBOTO,
    fontSize: 17,
    position: 'absolute',
    left: 10,
    fontWeight: 'bold',
  },
  closeButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  image: {
    height: 40,
    width: 40,
  },
});