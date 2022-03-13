import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
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
        flex: 1,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        margin: 5
    },
    buttonText: {
        color: 'white',
        alignSelf: "center",
        justifyContent: 'center',
    },
    searchButton: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    loginButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",

    },
    settingsButtonView: {
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
    profileTopper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 15,
        borderRadius: 4,
    },
    profilePicture: {
        height: 100,
        width: 100,
    },
    profileNameText: {
        fontSize: 22
    },
    postText: {
        fontSize: 14,
    },
    postAuthor: {
        fontSize: 10,
        alignSelf: "flex-end"
    },
    postButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 5,
    },
    postListItem: {
        padding: 5,
        borderWidth: 1,
        borderStyle: "dotted",
        borderColor: "blue",
        margin: 2,
    },
    writePost: {
        padding: 5,
    },
});

export default styles;