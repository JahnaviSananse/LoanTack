import { StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  loader: {
    width: '100%',
    height: 270,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardAwareL: {
    flex: 1,
  },
  cellContainer: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginEnd: 5,
  },
  title: {
    marginLeft: 15,
    fontSize: 17,
    marginTop: 10,
    fontWeight: 'bold',
  },
  date: {
    marginLeft: 15,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 20,
    fontStyle: 'italic',
    color: COLOR.THEME.LIGHT_GRAY,
  },
  saperator: {
    height: 0.5,
    alignSelf: 'center',
    width: CONSTANT.SCREEN_WIDTH - 30,
    backgroundColor: COLOR.THEME.TRACK_COLOR_FALSE,
  },
  dataCellContainer: {
    width: '30%',
    height: 25,
    marginLeft: 15,
    marginTop: 15,
  },
  dataContainer: {
    flexDirection: 'row',
  },
  colorBox: {
    height: 12,
    width: 12,
    alignSelf: 'center',
  },
  colorText: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 10,
  },
  rowContainer: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTextIndex: {
    fontFamily: FONT.ROBOTO,
    width: '10%',
    color: '#8D8E90',
  },
  headerTextData: {
    fontFamily: FONT.ROBOTO,
    width: '20%',
    fontWeight: 'bold',
    color: '#8D8E90',
  },
  textIndex: {
    fontFamily: FONT.ROBOTO,
    width: '10%',
  },
  textData: {
    textAlign: 'center',
    fontFamily: FONT.ROBOTO,
    width: '20%',
  },
  rowSaperator: {
    height: 0.5,
    width: CONSTANT.SCREEN_WIDTH - 30,
    backgroundColor: '#CACACA',
    position: 'absolute',
    bottom: 0,
  },
  headerContainer: {
    height: 40,
    backgroundColor: '#F2F2F2',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flatlistStyle: {
    // marginTop: 10
  },
  lineChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  tableContainer: {
    marginTop: 10,
  },
  colorContainer: {
    flexDirection: 'row',
  },
  colorBoxLegend: {
    height: 10,
    width: 10,
    alignSelf: 'center',
  },
  cellAmount: {
    fontFamily: FONT.ROBOTO,
    fontSize: 13,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 7,
    paddingVertical: 5,
  },
  cellDesc: {
    fontFamily: FONT.ROBOTO,
    fontSize: 15,
    marginLeft: 22,
    color: COLOR.THEME.LIGHT_GRAY,
  },
  extraPadding: {
    paddingBottom: 400,
  },
  firstComponent: {
    height: 300,
    paddingLeft: 10,
  },
  secComponent: {
    height: CONSTANT.SCREEN_HEIGHT - 100,
    // height: '100%',
  },
  scroll: {
    paddingBottom: 400,
  },
  flatScroll: {
    paddingBottom: 400,
  },
  lagendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
