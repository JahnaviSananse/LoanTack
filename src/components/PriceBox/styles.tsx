import { StyleSheet } from 'react-native';
import * as COLOR from 'src/constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonView: {
        // width: 92,
        height: 44,
        backgroundColor: COLOR.THEME.WHITE,
        // backgroundColor: "red",
        borderRadius: 5,
        borderColor: COLOR.THEME.SEPARETOR,
        borderWidth: 1,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        // paddingHorizontal: 10,
        width: 120
    },
    signText: {
        height: 44,
        width: 30,
        alignSelf: "center",
        marginTop: 20,
        marginLeft: 5,
        fontSize: 17,
        color: COLOR.THEME.TAB_DEACTIVE,
    },
    text: {
        fontSize: 17,
        // color: COLOR.THEME.TAB_BLACK
        color: "#1F2428"
    },
    inputText: {
        height: 40,
        width: 95,
        borderColor: 'gray',
        position: 'absolute',
        // backgroundColor: "red",
        paddingLeft: 10,
        right: 0,
        fontSize: 14,
        color: "#1F2428"
    }
});
export default styles;