import {StyleSheet} from 'react-native';
import * as FONT from 'src/assets/fonts';

const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  blackContainer: {
    height: '35%',
    backgroundColor: 'white',
  },
  fillText: {
    fontFamily: FONT.ROBOTO,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
  unfillText: {
    fontFamily: FONT.ROBOTO,
    fontWeight: 'bold',
    fontSize: 17,
  },
  fillButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 4,
    width: 200,
    marginTop: 20,
  },
  unfillButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    height: 40,
    width: 200,
    marginTop: 10,
    marginBottom: 20,
  },
});
export default styles;
