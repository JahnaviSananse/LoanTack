import { StyleSheet } from 'react-native';
import * as COLOR from 'src/constants/colors';


const styles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderColor: COLOR.THEME.SEPARETOR,
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        // fontStyle: 'italic'

    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: COLOR.THEME.SEPARETOR,
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
    iconContainer: {
        width: 10,
        height: 10,
        top: 8,
        right: 8,
        resizeMode: 'contain'
    },
    pickerContainer: {
        borderWidth: 0.5,
        borderColor: "#CACACA",
        borderRadius: 4
    }
});
export default styles;