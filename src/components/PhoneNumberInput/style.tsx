import { StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts';

export default styles = StyleSheet.create({
  containerStyle: {
    marginTop: 20,
    height: 70,
    width: '90%',
    alignSelf: 'center',
  },
  extraPadding: {
    borderColor: '#CACACA',
    borderWidth: 0.5,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  textInput: {
    // backgroundColor: 'red',
    height: 40,
    marginLeft: 10,
    width: '80%',
  },
  placeHolder: {
    color: '#8D8E90',
    position: 'absolute',
    marginTop: 2,
    fontSize: 10,
    paddingLeft: 15,
  },
  mainContainer: {
    height: 80,
    width: '80%',
    marginBottom: 15,
    flexDirection: 'column',
  },
  placeholderText: {
    fontFamily: FONT.ROBOTO,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#8D8E90',
    marginBottom: 10,
  },
  countryCodeContainer: {
    height: '100%',
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saperator: {
    height: '100%',
    width: 0.5,
    backgroundColor: '#CACACA',
    marginLeft: 20,
  },
  closeIcon: {
    height: 24,
    width: 24,
    // tintColor: '#000000',
    // backgroundColor: 'black',
  },
});
