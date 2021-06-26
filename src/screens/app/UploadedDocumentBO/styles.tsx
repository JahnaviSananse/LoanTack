import { StyleSheet } from 'react-native';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';

let cellWidth = CONSTANT.SCREEN_WIDTH - 20;
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  nullContainer: {
    alignItems: 'center',
    height: CONSTANT.SCREEN_HEIGHT - 250,
    justifyContent: 'center',
  },
  keyboardAware: {
    flex: 1,
  },
  cellContainer: {
    height: 60,
    width: cellWidth,
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#CACACA',
    alignItems: 'center',
    overlayColor: 'white',
  },
  docImage: {
    height: 25,
    width: 25,
  },
  title: {
    fontSize: 17,
    color: 'black',
    marginLeft: 0,
  },
  nameContainer: {
    width: '60%',
    marginStart: 20,
  },
  timeContainer: {
    width: '25%',
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#8D8E90',
  },
  saperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#CACACA',
    position: 'absolute',
    bottom: 0,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
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
});
