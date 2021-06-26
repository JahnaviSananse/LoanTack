import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#ececec',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        height: "40%",
        width: '100%',
        top: 5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    keyboardAware: { flex: 1 },
    logo: {
        height: 40,
        width: '100%',
    },
    splashContainer: {
        height: "100%",
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    splash: {
        height: '100%',
        width: '100%'
    },
    overlay: {
        height: '100%',
        width: "100%",
        backgroundColor: '#00000095',
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        height: 150,
        width: "90%",
        backgroundColor: "white",
        borderRadius: 4
    },
    downloadText: {
        fontSize: 20,
        alignSelf: "center",
        marginTop: 20
    },
    progressContainer: {
        marginTop: 40,
        alignSelf: "center"
    }
});
export default styles