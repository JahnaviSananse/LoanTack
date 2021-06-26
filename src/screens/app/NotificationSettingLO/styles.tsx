import { StyleSheet } from 'react-native';
import * as COLOR from '../../../constants/colors'
import * as FONT from 'src/assets/fonts'
import * as CONSTANT from 'src/constants/constant'

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: "column"
  },
  cellContainer: {
    paddingVertical: 20,
    width: '90%',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  nameText: {
    fontFamily: FONT.ROBOTO,
    alignSelf: 'center',
    color: COLOR.THEME.BLACK,
    fontSize: 17,
  },
  separetor: {
    height: 0.5,
    width: CONSTANT.SCREEN_WIDTH - 30,
    alignSelf: 'center',
    left: 15,
    backgroundColor: COLOR.THEME.SEPARETOR,
    position: 'absolute',
    bottom: 0
  },
  flatlistContainer: {
    height: '100%',
    width: '100%'
  },
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center'
  },
  nameContainer: {
    width: "80%",
    paddingVertical: 20,
    left: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  switchContainer: {
    width: "80%",
    paddingVertical: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  keyboardAware: {
    flex: 1
  },
  switchStyle: {
    transform: [{ scaleX: .8 }, { scaleY: .8 }]
  }
});
