import { Dimensions, StyleSheet } from 'react-native';
import * as COLOR from 'src/constants/colors';

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  keyboardAwareL: {
    flex: 1
  },
  scrollContainer: {
    width: '100%', 
    paddingHorizontal: 10,
    paddingBottom: 200,
  },
  cellContainer: {
    height: 60,
    width: Dimensions.get('screen').width - 30,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 4,
  },
  icon: {
    height: 25,
    width: 25,
    alignSelf: "center",
    marginLeft: 10
  },
  title: {
    alignSelf: "center",
    // marginLeft: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },
  saperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: "#CACACA",
    position: "absolute",
    bottom: 0
  }
});
