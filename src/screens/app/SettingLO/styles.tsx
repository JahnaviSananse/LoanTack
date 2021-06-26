import { StyleSheet } from 'react-native';
import * as COLOR from '../../../constants/colors'
import * as FONT from 'src/assets/fonts'

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
  avatar: {
    height: 30,
    width: 30,
    // marginLeft: 10,
    alignSelf: 'center'
  },
  nameText: {
    fontFamily: FONT.ROBOTO,
    alignSelf: 'center',
    // fontWeight: 'bold',
    color: COLOR.THEME.BLACK,
    fontSize: 17,
    // marginLeft: 10
  },
  timeText: {
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
    color: COLOR.THEME.LIGHT_GRAY,
    fontSize: 12,
    marginLeft: 15
  },
  separetor: {
    height: 0.5,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: COLOR.THEME.SEPARETOR,
    position: 'absolute',
    bottom: 0
  },
  messagePoint: {
    backgroundColor: COLOR.THEME.GREEN,
    height: 10,
    width: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 30,
    left: -10
  },
  flatlistContainer: {
    height: '100%',
    width: '100%'
  },
  keyboardAware: {
    flex: 1
  }

});
