import { StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as CONSTANT from 'src/constants/constant';
import * as COLOR from '../../../constants/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  cellContainer: {
    paddingVertical: 20,
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  cellContainer2: {
    paddingVertical: 20,
    width: '100%',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  flatlistContaier: {
    height: '100%',
    width: '100%',
  },
  keyboardAware: { flex: 1 },
  avatar: {
    height: 30,
    width: 30,
    alignSelf: 'center',
  },
  nameText: {
    fontFamily: FONT.ROBOTO,
    alignSelf: 'center',
    color: COLOR.THEME.BLACK,
    fontSize: 15,
    paddingBottom: 10,
  },
  nameText2: {
    fontFamily: FONT.ROBOTO,
    // alignSelf: 'center',
    color: COLOR.THEME.BLACK,
    fontSize: 15,
    paddingBottom: 10,
  },
  timeText: {
    fontFamily: FONT.ROBOTO,
    fontStyle: 'italic',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 10,
    color: COLOR.THEME.LIGHT_GRAY,
    fontSize: 12,
    marginLeft: 15,
    paddingBottom: 10,
  },
  timeText2: {
    fontFamily: FONT.ROBOTO,
    fontStyle: 'italic',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 10,
    bottom: 0,
    color: COLOR.THEME.LIGHT_GRAY,
    fontSize: 12,
    marginLeft: 15,
    paddingBottom: 10,
  },
  separetor: {
    height: 0.5,
    width: CONSTANT.SCREEN_WIDTH - 24,
    alignSelf: 'center',
    backgroundColor: '#CACACA',
    position: 'absolute',
    bottom: 0,
  },
  emptyContainer: { alignItems: 'center', marginTop: '80%' },
});
