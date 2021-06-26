import { StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as COLOR from 'src/constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  leftImgContainer: {
    width: 35,
    height: 35,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLOR.getTheme(),
    fontFamily: FONT.ROBOTO,
  },
  rightImage: {
    width: 20,
    height: 20,
  },
  img: {
    width: 20,
    height: 20,
  },
  versionText: {
    color: COLOR.getTheme(),
    paddingRight: 20,
    fontSize: 8,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
export default styles;
