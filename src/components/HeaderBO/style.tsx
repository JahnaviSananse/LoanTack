import { Platform, StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  leftImgContainer: {
    width: 35,
    height: 35,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
  },
  headerTitleContainer: {
    width: '65%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: FONT.ROBOTO,
    width: '95%',
    textAlign: 'center',
  },
  versionText: {
    color: COLOR.getTheme(),
    paddingRight: 20,
    fontSize: 8,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  rightImage: {
    width: 20,
    height: 20,
  },
  img: {
    width: 20,
    height: 20,
  },
  rightOneContainer: {
    width: 35,
    height: 35,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 50,
  },
  rightTwoContainer: {
    width: 35,
    height: 35,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  title: {
    fontSize: 17,
  },
  saperator: {
    height: 0.5,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: '#D4D5DB',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  flatlistContainer: {
    height: 150,
    width: 130,
    top: Platform.OS === 'ios' ? (CONSTANT.IS_IPHONEX ? 90 : 70) : 50,
    left: 12,
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: 3,
    elevation: 3,
  },
});
export default styles;
