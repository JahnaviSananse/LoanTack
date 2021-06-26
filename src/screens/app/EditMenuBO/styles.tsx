import { Dimensions, Platform, StyleSheet } from 'react-native';
import * as CONSTANT from 'src/constants/constant';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const cellWidth = SCREEN_WIDTH - 50;
export default styles = StyleSheet.create({
  container: {
    // height: 700,
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  keyboardAware: { flex: 1 },
  button: {
    width: 150,
    height: 100,
    backgroundColor: 'blue',
  },
  wrapper: {
    marginTop: Platform.OS === 'ios' ? 50 : 40,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  item_selectedtext: {
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
  },
  item_text: {
    fontSize: 13,
    marginTop: 10,
    textAlign: 'center',
    color: '#8D8E90',
  },
  icon: {
    height: 25,
    width: 25,
    marginTop: 10,
  },
  item: {
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    // marginTop: 100,
  },
  selected_item: {
    width: 80,
    height: 80,
    alignItems: 'center',
    // backgroundColor: 'red',
    top: Platform.OS === 'ios' ? 55 : 30,
  },
  whiteContainer: {
    height: 220,
    width: SCREEN_WIDTH - 20,
    borderRadius: 4,
    alignSelf: 'center',
    // marginTop: CONSTANT.IS_IPHONEX ? 100 : 80,
    marginTop: 80,
    position: 'absolute',
  },
  moreLinks: {
    color: 'black',
    marginLeft: 10,
    marginTop: -5,
    fontWeight: 'bold',
    fontSize: 17,
  },
  blackContainer: {
    height: 130,
    width: SCREEN_WIDTH - 20,
    borderRadius: 4,
    // backgroundColor: '#1F2428',
    alignSelf: 'center',
    top: CONSTANT.IS_IPHONEX ? 300 : 300,
    // top: Platform.OS === 'ios' ? 300 : 320,
    position: 'absolute',
  },
  mainLinks: {
    color: 'black',
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 17,
  },
  sep: {
    height: 0.5,
    backgroundColor: 'gray',
    width: '100%',
    position: 'absolute',
    // top: 0,
  },
});
