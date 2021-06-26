import { Dimensions, StyleSheet } from 'react-native';
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
    minHeight: 60,
    width: Dimensions.get('screen').width - 30,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 4,
  },
  icon: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    marginLeft: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    width: '90%',
  },
  saperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#CACACA',
    position: 'absolute',
    bottom: 0,
  },
  checkBoxContainer: {
    height: 30,
    marginLeft: 20,
    width: '100%',
    marginTop: 3,
    flexDirection: 'row',
  },
  checkBox: {
    height: 20,
    width: 20,
  },
  checkBoxIcon: {
    height: 20,
    width: 20,
  },
  checkBoxText: {
    fontSize: 17,
    marginLeft: 15,
  },
  cell: {
    borderBottomColor: '#CACACA',
    width: CONSTANT.SCREEN_WIDTH - 20,
    alignSelf: 'center',
    borderBottomWidth: 0.5,
  },
  arrow: {
    height: 15,
    width: 15,
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
  },
  flatlist: {
    width: '100%',
    marginBottom: 15,
  },
  descText: {
    fontSize: 15,
    paddingHorizontal: 15,
  },
});
