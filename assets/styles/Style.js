import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loginView: {
        flex: 1
    },
    friendsList: {
        flex: 1,
        justifyContent :"space-between"
    },
    friendRequests: {
        flex: 1,
        justifyContent :"space-between"
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

export default styles;