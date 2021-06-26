import {StyleSheet} from 'react-native';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';

let flatlistWidth = CONSTANT.SCREEN_WIDTH - 20;
let cellWidth = flatlistWidth / 2 - 20;
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  keyboardAware: {
    flex: 1,
  },
  flatlistStyle: {
    marginTop: 10,
    width: flatlistWidth,
    alignSelf: 'center',
  },
  cellContainer: {
    width: cellWidth,
    height: cellWidth + 50,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 4,
    backgroundColor: '#F9F9F9',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxContaier: {
    height: 20,
    marginLeft: 16,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkBox: {
    height: 16,
    width: 16,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#8D8E90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  combineText: {
    marginLeft: 10,
    color: '#8D8E90',
    alignSelf: 'center',
    fontSize: 16,
  },
  deleteButton: {
    height: 40,
    width: 40,
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  deleteIcon: {
    height: 20,
    width: 20,
  },
  imagePlaceholder: {
    width: cellWidth,
    height: cellWidth + 50,
  },
  FloatButton: {
    height: 50,
    width: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 25,
  },
  floatAdd: {
    height: 30,
    width: 30,
  },
});
