import { Dimensions, StyleSheet } from 'react-native';
import * as COLOR from 'src/constants/colors';
const height = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOR.THEME.WHITE,
    },
    emptyContainer: {
        height: height,
        backgroundColor: COLOR.THEME.WHITE,
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    viewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 10
    },
    text: {
        fontSize: 17,
        color: COLOR.THEME.TAB_DEACTIVE,
        alignSelf: 'center'
    },
    title: {
        fontSize: 17,
        color: COLOR.THEME.TAB_DEACTIVE,
        paddingVertical: 10

    },
    iconContainer: { height: 10, width: 10, position: "absolute", right: 10, top: 15 },
    advStyle: {
        marginTop: 20,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: COLOR.THEME.SEPARETOR
    },
    hzLine: {
        width: '100%',
        height: 0.5,
        backgroundColor: COLOR.THEME.SEPARETOR,

    },
    boldTitle: {
        fontSize: 17,
        color: COLOR.THEME.TAB_BLACK,
        fontWeight: 'bold',
        paddingVertical: 10
    },
    taxMainContainer: {
        width: '100%',
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between'
    },
    taxContainer: {
        width: '49%',
        height: 60
    },
    textInputCustom: {
        width: '100%',
        height: 50,
        paddingHorizontal: 10
    },
    buttonContainer: {
        marginVertical: 30
    }
});
export default styles;