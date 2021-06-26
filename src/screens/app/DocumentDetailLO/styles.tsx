import {StyleSheet} from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as COLOR from '../../../constants/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  flatlistContainer: {
    height: '100%',
    width: '100%',
    paddingBottom: 20,
  },
  keyboardAware: {flex: 1},
  cellContainer: {
    // width: "100%",
    // marginRight: 10,
    marginLeft: 10,
    marginVertical: 5,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  detailContainer: {
    width: '80%',
    marginLeft: 10,
  },
  downloadIcon: {
    height: 25,
    width: 25,
  },
  nameText: {
    fontFamily: FONT.ROBOTO,
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  timeText: {
    fontFamily: FONT.ROBOTO,
    fontStyle: 'italic',
    fontSize: 13,
    paddingTop: 10,
    paddingBottom: 20,
    color: COLOR.THEME.LIGHT_GRAY,
  },
  downloadContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnDownload: {
    width: 42,
    height: 42,
    alignSelf: 'center',
    backgroundColor: '#4FB263',
    justifyContent: 'center',
    borderRadius: 4,
    alignItems: 'center',
  },
  separtor: {
    height: 0.5,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#CACACA',
    position: 'absolute',
    right: 10,
    left: 10,
    bottom: 0,
  },
});
