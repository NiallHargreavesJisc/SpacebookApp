import {View} from "react-native";
import FriendsList from "../components/FriendsList";
import FriendRequests from "../components/FriendRequests";
import Header from "../components/Header";
import React from "react";

const FriendsScreen = () => {

    return (
        <View>
            <Header />
            <FriendsList />
            <FriendRequests />
        </View>
    )

}

export default FriendsScreen