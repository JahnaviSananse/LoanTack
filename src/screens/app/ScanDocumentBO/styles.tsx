import { StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';

let buttonSize = CONSTANT.SCREEN_WIDTH / 2 - 30;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  container2: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  close: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  keyboardAware: {
    flex: 1,
  },
  mainContainer: {
    // justifyContent: "space-between"
  },
  title: {
    marginLeft: 15,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: FONT.ROBOTO,
  },
  extraPadding: {
    paddingBottom: 150,
  },
  img: {
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  uploadDocumentContainer: {
    marginTop: '25%',
  },
  uploadDocumentButton: {
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  uploadDocumentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 20,
    fontFamily: FONT.ROBOTO,
  },
  buttonTitle: {
    alignSelf: 'center',
    fontSize: 17,
    marginTop: 10,
    color: 'red',
    fontFamily: FONT.ROBOTO,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    borderStyle: 'dashed',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
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
    backgroundColor: COLOR.getTheme(),
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    color: '#1F2428',
    // fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 10,
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
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
    height: 100,
    justifyContent: 'space-between',
  },
  alertbuttonContainer: {
    marginTop: 10,
    marginBottom: 30,
    height: 50,
    justifyContent: 'space-between',
  },
  closeIcon: { height: 30, width: 30 },
});
