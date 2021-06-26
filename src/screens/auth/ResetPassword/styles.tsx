import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    height: 40,
    width: '100%'
  },
  keyboardAware: {
    height: "100%",
    width: '100%',
  },
  textField: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  proceedContainer: {
    width: '100%',
    marginTop: 50
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
    color: '#1F2428',
    fontSize: 18,
    fontWeight: 'bold'
  },
  scrollView: {
    width: '100%',
    // marginTop: 20
  },
  btnProceed: {
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#4FB263',
    height: 40,
    width: 180,
    marginTop: 40
  },
  btnProceedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13
  },
});
export default styles