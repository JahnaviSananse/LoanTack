import { StyleSheet, Dimensions } from 'react-native';
import * as COLOR from 'src/constants/colors'
import * as CONSTANT from 'src/constants/constant'
import * as FONT from 'src/assets/fonts'

const screenHeight = Dimensions.get('screen').height
const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    width: "100%",
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // marginTop: 40,
    height: 40,
    width: '100%'
  },
  textField: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  logoContainer: {
    width: '100%',
    // backgroundColor: 'red',
    // marginTop: -30
  },
  loginContainer: {
    width: '100%',
  },
  loginTextContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    fontFamily: FONT.ROBOTO,
    color: '#1F2428',
    fontSize: 18,
    fontWeight: 'bold'
  },
  scrollView: {
    width: CONSTANT.SCREEN_WIDTH,
  },
  btnLogin: {
    justifyContent: "center",
    alignSelf: 'center',
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#4FB263',
    height: 40,
    width: 180,
    marginVertical: 20
  },
  btnLoginText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13
  },
  buttonContainer: {
    // height: 120,
    marginTop: 40,
    width: "100%"
  },
  signContainer: {
    height: 20,
    width: '90%',
    alignSelf: "center",
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    marginTop: 20
  },
  signupExtraText: {
    fontFamily: FONT.ROBOTO,
    fontStyle: 'normal',
    fontSize: 15
  },
  signupText: {
    fontFamily: FONT.ROBOTO,
    fontStyle: 'normal',
    paddingLeft: 7,
    fontSize: 15,
    fontWeight: 'bold',
    color: COLOR.THEME.RED
  },
  keyboardAware: {
    paddingBottom: 120
  }
});

export default styles