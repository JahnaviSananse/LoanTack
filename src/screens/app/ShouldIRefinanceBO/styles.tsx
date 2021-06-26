import {Dimensions, StyleSheet} from 'react-native';
import * as COLOR from 'src/constants/colors';
const height = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOR.THEME.WHITE,
  },
  keyboardAware: {
    flex: 1,
  },
  emptyContainer: {
    height: height,
    backgroundColor: COLOR.THEME.WHITE,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  text: {
    fontSize: 17,
    color: COLOR.THEME.TAB_DEACTIVE,
    alignSelf: 'center',
  },
  title: {
    fontSize: 17,
    color: COLOR.THEME.TAB_DEACTIVE,
    paddingVertical: 10,
  },
  hzLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: COLOR.THEME.SEPARETOR,
  },
  boldTitle: {
    fontSize: 17,
    color: COLOR.THEME.TAB_BLACK,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  taxMainContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
  },
  taxContainer: {
    width: '49%',
    height: 60,
  },
  textInputCustom: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginVertical: 30,
  },
  signContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLOR.THEME.LIGHT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  signatureText: {
    fontSize: 16,
    color: COLOR.THEME.LIGHT_GRAY,
  },
  textInputContainer: {
    flexDirection: 'row',
    borderColor: COLOR.THEME.SEPARETOR,
    borderWidth: 1,
    borderRadius: 4,
  },
});
export default styles;
