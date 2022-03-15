import {FlatList, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../assets/styles/Style";


const FriendRequests = () => {

    const [friendRequests, setFriendRequests] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        const authToken = await AsyncStorage.getItem('@session_token');

        return fetch("http://localhost:3333/api/1.0.0/friendrequests", {
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
                await setFriendRequests(responseJson);
                await setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    },[])

    const requestResponse = async (method, userId) => {
        let authToken = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + userId, {
            method: method,
            headers: {
                "X-Authorization": authToken
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    if (method == "POST"){
                        console.log("Request Accepted")
                    } else {
                        console.log("Request Rejected")
                    }

                } else if (response.status === 401) {
                    console.log("Post Could not be deleted")
                } else {
                    throw 'Something went wrong';
                }
            }).then(

            )
            .catch((error) => {
                console.log(error);
            })
    }

    if (isLoading == false) {
        if (friendRequests.length == 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.pageHeadings}>Friend Requests</Text>
                    <Text>You have no friend requests</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.pageHeadings}>Friend Requests</Text>
                    <FlatList
                        data={friendRequests}
                        renderItem={({item}) => (
                            <View>
                                <Text>{item.first_name} {item.last_name}</Text>
                                <TouchableOpacity
                                    title="Accept"
                                    onPress={() => requestResponse("POST", item.user_id)}
                                ><Text>Accept</Text></TouchableOpacity>
                                <TouchableOpacity
                                    title="Reject"
                                    onPress={() => requestResponse("DELETE", item.user_id)}
                                ><Text>Reject</Text></TouchableOpacity>
                            </View>)}
                        keyExtractor={(item) => item.user_id.toString()} />
                </View>

            )
        }

    } else {
        return (null);
    }

}

export default FriendRequests