import { StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as COLOR from '../../../constants/colors';

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  cellContainer: {
    paddingVertical: 20,
    width: '90%',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  avatar: {
    height: 30,
    width: 30,
    // marginLeft: 10,
    alignSelf: 'center',
  },
  nameText: {
    fontFamily: FONT.ROBOTO,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: COLOR.THEME.BLACK,
    fontSize: 20,
    marginLeft: 15,
  },
  timeText: {
    fontFamily: FONT.ROBOTO,
    fontStyle: 'italic',
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
    color: COLOR.THEME.LIGHT_GRAY,
    fontSize: 13,
    marginLeft: 15,
  },
  separetor: {
    height: 0.5,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: COLOR.THEME.SEPARETOR,
    position: 'absolute',
    bottom: 0,
  },
  messagePoint: {
    backgroundColor: COLOR.THEME.GREEN,
    height: 10,
    width: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 30,
    left: -5,
    top: -5,
  },
  avatarContainer: {
    flexDirection: 'column',
  },
  keyboardAware: {
    // flex: 1,
    height: '100%',
    width: '100%',
  },
  flatListContainer: {
    height: '93%',
    width: '100%',
  },
  FloatButton: {
    height: 50,
    width: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.THEME.GREEN,
    position: 'absolute',
    right: 20,
    bottom: 35,
  },
  floatAdd: {
    height: 30,
    width: 30,
  },
});
