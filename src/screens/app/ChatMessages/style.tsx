import { StyleSheet } from 'react-native';
import * as CONSTANT from 'src/constants/constant';
export default StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white'
    },
    navigationBarContainerStyle: {
        width: '100%',
        backgroundColor: 'white',
        height: 80,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    leftButtonStyle: {
        width: 40,
        position: 'absolute',
        left: 15,
        bottom: 3,
        top: 20,
        justifyContent: 'flex-end',
    },
    rightButtonStyle: {
        width: 40,
        position: 'absolute',
        right: 20,
        bottom: 5,
        top: 20,
        justifyContent: 'flex-end',
    },
    navProfileStyle: {
        bottom: 6,
        position: 'absolute',
        marginLeft: 70,
        height: 40,
        width: 40,
        borderRadius: 20
    },
    navTitleStyle: {
        //fontSize: font.NAVIGATIONBAR_FONT_SIZE,
        color: 'red',
        //fontFamily: font.NAVIGATIONBAR_FONT,
        marginLeft: 10,
        position: 'absolute',
        bottom: 15,
        left: 110,
    },
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
    messageTitleStyle: {
        color: 'green',
        //fontFamily: font.MESSAGE_FONT,
        //fontSize: font.MESSAGE_FONT_SIZE,
        marginLeft: 10,
        paddingRight: 10,
        flex: 1
    },
    messageProfileImageStyle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        alignSelf: 'flex-start'
    },
    messageTimeTitleStyle: {
        color: 'green',
        //fontFamily: font.MESSAGE_FONT,
        //fontSize: font.MESSAGE_FONT_SIZE - 4,
        // marginLeft: 10,
        // marginRight: 10,
    },
    reportModalContainerStyle: {
        backgroundColor: 'transparent',
        // flex: 1,
        marginTop: 40,
        height: CONSTANT.SCREEN_HEIGHT * 0.80,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    reportButtonStyle: {
        width: '90%',
        height: CONSTANT.SCREEN_HEIGHT * 0.08,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    reportButtonTitleStyle: {
        // fontSize: font.SQUARE_BUTTON_FONT_SIZE,
        // fontFamily: font.SQUARE_BUTTON_FONT,
        // color: font.SQUARE_BUTTON_COLOR
    },
    feelContainerStyle: {
        paddingTop: 20,
        paddingBottom: 20,
        width: '90%',
        height: CONSTANT.SCREEN_HEIGHT * 0.40,
        backgroundColor: 'white',
        marginBottom: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    helplineButtonStyle: {
        marginBottom: 20,
        height: CONSTANT.SCREEN_HEIGHT * 0.08,
        width: '90%',
        //backgroundColor: colors.COLOR_BADGE,
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    helplineTextStyle: {
        fontSize: 15,
        color: 'white',
        //fontFamily: font.FONT_SOGUE_BOLD,
        alignSelf: 'center',
        marginLeft: 10
    },
    reportModalSubmitContainerStyle: {
        width: '60%',
        height: '17%',
    },
    reportTitleStyle: {
        textAlign: 'center',
        // fontFamily: font.CHAT_PREFE_TITLE_FONT,
        // color: font.CHAT_PREFE_TITLE_FONT_COLOR,
        // fontSize: font.CHAT_PREFE_TITLE_FONT_SIZE,
        backgroundColor: 'transparent',
    },
    emergencyButtonContainerStyle: {
        position: 'absolute',
        bottom: 5,
        marginLeft: 5,
        height: 35,
        width: 40,
        borderRadius: 5,
        //backgroundColor: colors.COLOR_BADGE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        flex: 1,
        width: CONSTANT.SCREEN_WIDTH,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },

});