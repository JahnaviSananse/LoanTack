import { StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as COLOR from '../../../constants/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  keyboardAware: { flex: 1 },
  cellContainer: {
    paddingVertical: 20,
    width: '90%',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  flatlistContainer: {
    height: '100%',
    width: '100%',
  },
  avatar: {
    height: 30,
    width: 30,
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
    right: 10,
    color: COLOR.THEME.LIGHT_GRAY,
    fontSize: 12,
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
});
