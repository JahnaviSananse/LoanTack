import { Dimensions, Platform, StyleSheet } from 'react-native';
import * as CONSTANTS from 'src/constants/constant';
import * as COLOR from '../../../constants/colors';

const ScreenHeight = Dimensions.get('screen').height;
const cellWidht = CONSTANTS.SCREEN_WIDTH * 0.7;
const MARGIN = Platform.OS === 'ios' ? CONSTANTS.TAB_HEIGHT : 90;
const modalHeight = ScreenHeight - MARGIN;

export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: 'column',
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  msgImage: {
    height: 100,
    width: 100,
  },
  attachmentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 30,
  },
  iconAttachment: {
    height: 22,
    width: 11,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  sendContainer: {
    height: 45,
    width: 45,
    marginLeft: 5,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAware: {
    flex: 1,
  },
  iconSend: {
    marginLeft: 5,
    height: 30,
    width: 30,
  },
  optionContainer: {
    height: modalHeight,
    width: '100%',
  },
  optionBox: {
    bottom: 60,
    right: 60,
    position: 'absolute',
    height: 80,
    width: 150,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonCotainer: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
  },
  optionIcons: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginLeft: 10,
  },
  optionText: {
    paddingLeft: 10,
    alignSelf: 'center',
  },
  left: {
    backgroundColor: COLOR.getLightTheme(),
    borderRadius: 4,
  },
  right: {
    backgroundColor: '#F5F6FA',
    borderRadius: 4,
  },
  bubbleText: {
    color: '#1F2428',
  },
  righttimeText: {
    color: '#8A8A8A',
    // backgroundColor: 'red',
    position: 'absolute',
    top: 5,
    fontSize: 14,
    right: -10,
  },
  lefttimeText: {
    color: '#8A8A8A',
    // backgroundColor: 'red',
    position: 'absolute',
    top: 5,
    fontSize: 14,
    left: -10,
  },
  bottomContainer: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'red'
    // position: 'absolute',
    // bottom: 60
  },
  textFieldContainer: {
    // height: 45,
    width: CONSTANTS.SCREEN_WIDTH - 60,
    marginLeft: 5,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#CACACA',
    flexDirection: 'row',
  },
  textFieldStyle: {
    height: 45,
    paddingLeft: 10,
    width: CONSTANTS.SCREEN_WIDTH - 125,
    marginRight: 30,
  },
  rightTime: {
    color: '#8D8E90',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  leftTime: {
    color: '#8D8E90',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  leftBubble: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 10,
    borderRadius: 4,
    maxWidth: '60%',
  },
  rightBubble: {
    alignSelf: 'flex-end',
    marginRight: 5,
    marginBottom: 10,
    backgroundColor: '#F5F6FA',
    borderRadius: 4,
    maxWidth: '60%',
  },
  imageRight: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#F5F6FA',
    borderRadius: 4,
    height: 60,
    width: cellWidht,
    // flexDirection: 'row',
  },
  imageLeft: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 4,
    height: 60,
    width: cellWidht,
    flexDirection: 'row',
  },
  normalText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  linkText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#166BCF',
    borderBottomColor: '#166BCF',
    textDecorationLine: 'underline',
  },
  mainContainer: {
    flexDirection: 'column',
    // height: CONSTANTS.SCREEN_HEIGHT - 130,
    height: '100%',
    width: '100%',
  },
  flatlistContainer: {
    // height: CONSTANTS.SCREEN_HEIGHT - 150,
    width: '100%',
  },
  dateSaperator: {
    height: 1,
    marginVertical: 20,
    width: CONSTANTS.SCREEN_WIDTH,
    backgroundColor: '#D4D5DB',
  },
  dateText: {
    color: '#1F2428',
    fontSize: 17,
    fontWeight: '600',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  cellImage: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    marginLeft: 10,
  },
  cellText: {
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 10,
    width: cellWidht - 105,
  },
  flatStyle: {
    marginBottom: 60,
  },
  footerContainer: {
    height: 70,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  cellContainer: {
    marginBottom: 10,
  },
  imageContanier: {
    alignSelf: 'center',
  },
  progressContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 10,
    marginLeft: 10,
  },
});
