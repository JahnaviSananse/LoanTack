import { StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts'
import * as COLOR from 'src/constants/colors'

const styles = StyleSheet.create({
    cellContainer: {
        width: '50%',
        // height: 40,
        marginLeft: 15,
        marginTop: 15
    },
    colorContainer: {
        flexDirection: 'row'
    },
    colorBox: {
        height: 12,
        width: 12,
        alignSelf: "center"
    },
    cellAmount: {
        fontFamily: FONT.ROBOTO,
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: "center",
        marginLeft: 10,
        paddingVertical: 5
    },
    cellDesc: {
        fontFamily: FONT.ROBOTO,
        fontSize: 15,
        marginLeft: 22,
        color: COLOR.THEME.LIGHT_GRAY,
        // marginTop: 5
    },
    flatlistStyle: {
        // height: 100,
        // backgroundColor: "red"
    }
});
export default styles; 