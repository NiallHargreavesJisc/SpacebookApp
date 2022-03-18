import {FlatList, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import styles from "../assets/styles/Style";


const FriendsList = ({isLoading, friends}) => {


    const navigation = useNavigation();



    const goToProfile = (userId) => {
        navigation.navigate("Friends Profile", {profileId: userId} );
    }

    if (isLoading == false) {
        console.log(friends);
        if (friends.length == 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.pageHeadings}>Friends</Text>
                    <Text>You have no friends</Text>
                </View>

            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.pageHeadings}>Friends</Text>
                    <FlatList
                        data={friends}
                        renderItem={({item}) => (
                            <View>
                                <Text>{item.user_givenname} {item.user_familyname}</Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => goToProfile(item.user_id)}
                                ><Text style={styles.buttonText}>Visit Profile</Text></TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item) => item.user_id.toString()} />
                </View>

            )
        }

    } else {
        return (null);
    }

}

export default FriendsList