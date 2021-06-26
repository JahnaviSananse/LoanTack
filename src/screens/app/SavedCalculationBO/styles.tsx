import { StyleSheet } from 'react-native';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  keyboardAwareL: {
    flex: 1,
  },
  cellContainer: {
    height: 75,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLOR.THEME.WHITE,
  },
  title: {
    marginLeft: 15,
    fontSize: 17,
    marginTop: 10,
    fontWeight: 'bold',
  },
  date: {
    marginLeft: 15,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
    fontStyle: 'italic',
    color: COLOR.THEME.LIGHT_GRAY,
  },
  saperator: {
    height: 0.5,
    alignSelf: 'center',
    width: CONSTANT.SCREEN_WIDTH - 30,
    backgroundColor: COLOR.THEME.TRACK_COLOR_FALSE,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginTop: 5,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#FFCCCF',
    top: 10,
    height: 40,
    width: 40,
    borderRadius: 4,
    marginRight: 10,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    // backgroundColor: 'red',
    right: 0,
  },
  nullContainer: {
    alignItems: 'center',
    height: CONSTANT.SCREEN_HEIGHT - 250,
    justifyContent: 'center',
  },
});
