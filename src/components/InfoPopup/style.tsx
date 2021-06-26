import { StyleSheet } from 'react-native';
import * as FONT from 'src/assets/fonts'
import * as COLOR from 'src/constants/colors'

const styles = StyleSheet.create({
    container: {
        height: 44,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    popupView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    toucableButton: {
        height: 40,
        width: '50%',
        backgroundColor: COLOR.THEME.GREEN,
        borderRadius: 4,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
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
    title: {
        alignSelf: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: "center",
        paddingHorizontal: 20,
        marginTop: 30
    },
    desc: {
        alignSelf: 'center',
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 30
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 30
    },
    closeButton: {
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 10,
        right: 10
    },
    icon: {
        height: 30,
        width: 30
    }
});
export default styles; 