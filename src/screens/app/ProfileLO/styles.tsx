import { StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as COLOR from '../../../constants/colors';

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  btnCencel: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#4FB263',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    height: 40,
    width: 180,
    marginTop: 15,
    marginBottom: 20,
  },
  btnCancelText: {
    color: '#4FB263',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnSave: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#4FB263',
    height: 40,
    borderRadius: 4,
    width: 180,
    marginTop: 40,
  },
  btnSaveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  profileContainer: {
    marginTop: 20,
    flexDirection: 'column',
    width: '90%',
    alignSelf: 'center',
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
  profileText: {
    fontFamily: FONT.ROBOTO,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#8D8E90',
  },
  btnAddPic: {
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    height: 125,
    width: 125,
    marginTop: 15,
    borderRadius: 5,
  },
  add: {
    height: 30,
    width: 30,
  },
  bioContainer: {
    marginTop: 20,
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'center',
  },
  bioText: {
    fontFamily: FONT.ROBOTO,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#8D8E90',
  },
  textField: {
    height: 100,
    marginTop: 15,
    borderRadius: 4,
    borderColor: COLOR.THEME.LIGHT_GRAY,
    borderWidth: 0.5,
    paddingLeft: 10,
    fontStyle: 'italic',
    textAlignVertical: 'top',
  },
  textFieldSmall: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    marginBottom: 10,
    fontStyle: 'normal',
    // marginBottom: 10,
  },
  btnContainer: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: '30%',
  },
  keyboardAware: {
    flex: 1,
  },
});
