import { StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as CONSTANT from 'src/constants/constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 70,
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
    width: CONSTANT.SCREEN_WIDTH,
    marginTop: 40
  },
  btnProceed: {
    justifyContent: "center",
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#4FB263',
    height: 40,
    width: 180,
  },
  btnProceedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13
  },
  buttonsContainer: {
    paddingBottom: 130,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
  },
  proceedContainer: {
    height: 50,
    width: '100%',
    marginTop: 50
  },
  keyboardAware: {
    flex: 1
  }
});
export default styles