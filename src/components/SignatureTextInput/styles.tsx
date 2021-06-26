import { StyleSheet } from 'react-native';
import * as COLOR from 'src/constants/colors';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: COLOR.THEME.SEPARETOR,
        borderWidth: 1,
        borderRadius: 4
    },
    signContainer: {
        width: 50,
        height: 50,
        backgroundColor: COLOR.THEME.LIGHT_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4
    },
    signRightContainer: {
        width: 50,
        height: 48,
        backgroundColor: COLOR.THEME.LIGHT_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0
    },
    signatureText: {
        fontSize: 16,
        color: COLOR.THEME.LIGHT_GRAY,
    }

});
export default styles;