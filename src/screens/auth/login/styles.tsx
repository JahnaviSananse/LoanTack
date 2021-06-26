import {Dimensions, StyleSheet} from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as COLOR from '../../../constants/colors';

const screenWidth = Dimensions.get('screen').width;
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
    // marginBottom: 10,
  },
  logoContainer: {
    marginTop: 50,
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    height: '70%',
    width: '100%',
  },
  loginTextContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#1F2428',
    fontFamily: FONT.ROBOTO,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    // backgroundColor: 'red',
    width: screenWidth,
    // height: 200,
    // marginTop: 40
  },
  forgotPassContainer: {
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'flex-end',
    marginRight: 20,
    alignItems: 'flex-end',
    height: 20,
    marginTop: 10,
  },
  forgotPassText: {
    fontFamily: FONT.ROBOTO,
    fontStyle: 'italic',
    color: '#EB4949',
    fontSize: 13,
  },
  btnLogin: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.getTheme(),
    height: 40,
    borderRadius: 4,
    width: 180,
    marginTop: 40,
  },
  btnLoginText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnGuest: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: COLOR.getTheme(),
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    height: 40,
    width: 180,
    marginTop: 10,
    marginBottom: 20,
  },
  btnGuestText: {
    color: COLOR.getTheme(),
    fontWeight: 'bold',
    fontSize: 13,
  },
  signContainer: {
    height: 20,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  signupExtraText: {
    fontFamily: FONT.ROBOTO,
    fontSize: 15,
  },
  signupText: {
    fontFamily: FONT.ROBOTO,
    paddingLeft: 7,
    fontSize: 15,
    fontWeight: 'bold',
    color: COLOR.THEME.RED,
  },
  keyboardAware: {
    flex: 1,
  },
  buttonsContainer: {
    marginTop: 30,
    // height: 180,
  },
  extraPadding: {
    paddingBottom: 100,
  },
});
export default styles;
