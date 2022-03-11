import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
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
        alignItems: "center",
        justifyContent: "flex-end"
    },
    button: {
        flex: 0.4,
        flexDirection: "row",
        alignSelf: 'center',
        color: 'green',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,

    },
    buttonText: {
        color: 'white',
        alignSelf: "center",
        justifyContent: 'center',
    },
    searchButton: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    loginButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",

    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    fixedRatio:{
        flex: 1,
        aspectRatio: 1
    },
    header:{
        flex: 0.075,
        backgroundColor: 'blue',
    },
    headerText: {
        color: 'white',
        fontSize: 40,
        fontWeight: "bold",
        alignItems: "center",
    },
    profilePicture: {
        height: 150,
        width: 150
    },
    postButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
    }
});

export default styles;