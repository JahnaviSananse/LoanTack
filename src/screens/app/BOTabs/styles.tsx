import { StyleSheet } from 'react-native';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';
const optionContainerWidth = CONSTANT.SCREEN_WIDTH - 80;
const optionWidth = optionContainerWidth / 7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.THEME.WHITE,
    // backgroundColor: "#1F2428",
    flexDirection: 'column',
  },
  invisibleView: {
    backgroundColor: 'transparent',
    //backgroundColor: 'green',
    height: 40,
  },
  transparentView: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
  },
  bottomSafeareaview: {
    height: CONSTANT.IPHONE && CONSTANT.IS_IPHONEX ? 40 : 0,
    width: '100%',
    position: 'absolute',
    bottom: -4,
  },
  bottomContainerStyle: {
    backgroundColor: 'transparent',
    // height: 500,
  },
  openButton: {
    height: 20,
  },
  openButtonContainer: {
    width: '100%',
    alignItems: 'center',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    backgroundColor: 'red',
  },
  openButton2: {
    height: 15,
    width: '100%',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    marginBottom: 100,
  },
  closeButton: {
    height: 25,
    width: 100,
    position: 'absolute',
    // backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    alignSelf: 'center',
  },
  tabContainer: {
    //height: 80,
    width: '100%',
    // alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red',
    paddingBottom: 10,
    // paddingTop: 5,
  },
  hiddenSheet: {
    height: 85,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  singalTab: {
    // flex: 1,
    height: 60,
    width: CONSTANT.SCREEN_WIDTH / 4,
    // backgroundColor: "red"
  },
  tabIcon: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    // marginTop: 5
  },
  tabTitle: {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 13,
    textAlign: 'center',
    color: 'white',
  },
  extraOptions: {
    height: CONSTANT.SCREEN_WIDTH / 4,
    width: CONSTANT.SCREEN_WIDTH / 4,
    justifyContent: 'center',
    alignItems: 'center',
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
  bottomSheetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  customStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: CONSTANT.IS_IPHONEX ? 105 : 70,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  sheetOptions: {
    width: '100%',
    paddingTop: 10,
    backgroundColor: 'white',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    height: CONSTANT.IS_IPHONEX ? '28%' : '35%',
    // paddingBottom: 10,
  },
  sheetCloseIcon: {
    height: 15,
    width: 15,
    alignSelf: 'center',
  },
  sheetOptionContainer: {
    position: 'absolute',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 50,
    top: 10,
    right: 10,
  },
  editText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  flatListStyles: {
    marginTop: 20,
  },
});
export default styles;
