import { StyleSheet, Dimensions, Platform } from 'react-native';
import * as COLOR from 'src/constants/colors'
import * as FONT from 'src/assets/fonts'
import * as CONSTANT from 'src/constants/constant'

let buttonSize = CONSTANT.SCREEN_WIDTH / 2 - 30
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.THEME.WHITE,
    flexDirection: "column",
  },
  keyboardAware: {
    flex: 1
  },
  popupView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textField: {
    height: 100,
    marginTop: 15,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 4,
    borderColor: "#CACACA",
    fontSize: 16,
    borderWidth: 0.5,
    paddingLeft: 10,
    fontStyle: "italic",
    textAlignVertical: 'top'
  },
  timeContainer: {
    marginTop: 10,
    height: 45,
    width: '90%',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#CACACA',
    alignSelf: 'center',
  },
  placeholderText: {
    fontFamily: FONT.ROBOTO,
    fontWeight: "bold",
    fontSize: 15,
    color: '#8D8E90',
    marginTop: 15,
    marginLeft: "5%"
  },
  modalOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: '#00000095',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 4,
    overflow: 'hidden'
  },
  closeContainer: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    paddingVertical: 50
  },
  desc: {
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 30
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
    height: 100,
    justifyContent: "space-between"
  },
  flatStyle: {
    marginTop: 25,
    borderTopColor: '#CACACA',
    borderTopWidth: 0.5
  },
  icon: {
    height: 30,
    width: 30
  },
  close: {
    height: 30,
    width: 30,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: "center",
    right: 10,
    top: 10
  },
  cell: {
    height: 50,
    borderBottomColor: "#CACACA",
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: "flex-start",
    paddingLeft: 15
  },
  title: {
    fontSize: 15
  },
  slotText: { position: 'absolute', left: 10, fontSize: 16, top: 12, },
  imgDropdown: { height: 10, width: 10, position: 'absolute', right: 15, marginTop: 17 },
  buttonPadding: {
    marginTop: 50
  }
});
