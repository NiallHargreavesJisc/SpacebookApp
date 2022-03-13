import {FlatList, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";
import styles from "../assets/styles/Style";


const FriendsList = () => {

    const [friends, setFriends] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(async () => {
        const authToken = await AsyncStorage.getItem('@session_token');
        const userId = await AsyncStorage.getItem('@user_id');
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/friends", {
            method: 'GET',
            headers: {
                'X-Authorization': authToken
            }
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
            } else if (response.status === 401) {
                throw '401 response'
            } else {
                throw 'Something went wrong';
            }
        })
            .then(async (responseJson) => {
                console.log(responseJson);
                await setFriends(responseJson);
                await setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    },[])

    const goToProfile = (userId) => {
        console.log("navigating")
        navigation.navigate("Friends Profile", {profileId: userId} );
        console.log("navigated")
    }

    if (isLoading == false) {
        if (friends.length == 0) {
            return (
                <Text>You have no friends</Text>
            )
        } else {
            return (
                <FlatList
                    data={friends}
                    renderItem={({item}) => (
                        <View>
                            <Text>{item.user_givenname} {item.user_familyname}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => goToProfile(item.user_id)}
                            ><Text>Visit Profile</Text></TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item.user_id.toString()}>

                </FlatList>
            )
        }

    } else {
        return (null);
    }

}

export default FriendsList