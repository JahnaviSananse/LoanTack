import { StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as CONSTANT from 'src/constants/constant';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    height: 40,
    width: '100%',
  },
  textField: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  logoContainer: {
    marginTop: 20,
    height: "15%",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginContainer: {
    height: "70%",
    width: '100%',
  },
  forgotPassTextContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  forgotPassText: {
    fontFamily: FONT.ROBOTO,
    color: '#1F2428',
    fontSize: 18,
    fontWeight: 'bold'
  },
  scrollView: {
    width: CONSTANT.SCREEN_WIDTH - 20,
    marginTop: 40
  },
  placeholderText: {
    fontFamily: FONT.ROBOTO,
    fontWeight: "bold",
    fontSize: 15,
    color: '#8D8E90',
    marginBottom: 10,
  },
  btnProceed: {
    justifyContent: "center",
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#4FB263',
    height: 40,
    width: 180,
    // marginTop: 100
  },
  btnProceedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13
  },
  btnResend: {
    justifyContent: "center",
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 40,
    width: 180,
    marginTop: 15
  },
  btnResendText: {
    color: '#4FB263',
    fontWeight: 'bold',
    fontSize: 13
  },
  buttonsContainer: {
    marginTop: 50,
    height: 180,
    width: '100%',
  },
  unfillButton: {
    justifyContent: "center",
    alignSelf: 'center',
    // borderColor: '#4FB263',
    // borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    height: 40,
    width: 180,
    marginTop: 15,
    marginBottom: 20
  },
  unfillText: {
    fontFamily: FONT.ROBOTO,
    color: '#4FB263',
    fontWeight: 'bold',
    fontSize: 17
  },
  keyboardAware: {
    height: '100%',
    width: '100%',
    // justifyContent: "center",
    alignItems: "center"
    // paddingBottom: 200
  },
  root: {
    flex: 1,
    padding: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 30
  },
  codeFieldRoot: {
    marginTop: 20
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#CACACA',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#4FB263',
  },
  toggle: {
    width: 55,
    height: 55,
    lineHeight: 55,
    fontSize: 24,
    textAlign: 'center',
  },
  dash: {
    height: 1,
    width: 8,
    backgroundColor: "#9F9F9F",
    position: 'absolute',
    right: 48,
    top: 20
  }
});
export default styles