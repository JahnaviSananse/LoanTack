import { StyleSheet } from 'react-native';
import * as CONSTANT from 'src/constants/constant';

const styles = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: '#00000095',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    // backgroundColor: COLOR.THEME.BLACK,
    width: '90%',
    alignSelf: 'center',
  },
  closeContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  closeIcon: { width: 30, height: 30 },
  imageView: { width: '100%', height: CONSTANT.SCREEN_HEIGHT / 0.5 },
});
export default styles;
