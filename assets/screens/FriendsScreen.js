import {View} from "react-native";
import FriendsList from "../components/FriendsList";
import FriendRequests from "../components/FriendRequests";
import Header from "../components/Header";
import React from "react";
import styles from "../styles/Style";

const FriendsScreen = () => {

    return (
        <View style={styles.container}>
            <Header />
            <FriendsList />
            <FriendRequests />
        </View>
    )

}

export default FriendsScreen