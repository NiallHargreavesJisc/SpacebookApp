import React, {useEffect, useState} from 'react';
import {Text, View, Button, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "../assets/styles/Style";

const Posts = (profileId) => {

    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState([]);

    const navigation = useNavigation();

    useEffect(async () => {
        const authToken = await AsyncStorage.getItem('@session_token');
        console.log("http://localhost:3333/api/1.0.0/user/" + profileId.profileId + "/post");
        return fetch("http://localhost:3333/api/1.0.0/user/" + profileId.profileId + "/post", {
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
                await setPosts(responseJson);
                await setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    },[profileId])

    const likePost = async (postId) => {
        const authToken = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/" + profileId.profileId + "/post/" + postId + "/like", {
            method: 'POST',
            headers: {
                'X-Authorization': authToken
            }
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
                console.log(response.json())
            } else if (response.status === 401) {
                throw '401 response'
            } else {
                throw 'Something went wrong';
            }
        })
            .then((responseJson) => {

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const unlikePost = async (postId) => {
        const authToken = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/" + profileId.profileId + "/post/" + postId + "/like", {
            method: 'DELETE',
            headers: {
                'X-Authorization': authToken
            }
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
                console.log(response.json())
            } else if (response.status === 401) {
                throw '401 response'
            } else {
                throw 'Something went wrong';
            }
        })
            .then((responseJson) => {

            })
            .catch((error) => {
                console.log(error);
            })
    }



    if (isLoading === false) {
        return (
            <ScrollView>
                <FlatList
                    data={posts}
                    renderItem={({item}) => (
                        <View>
                            <Text>{item.text}</Text>
                            <Text>{item.numLikes}</Text>
                            <View style={styles.postButtons}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => likePost(item.post_id)}><Text style={styles.buttonText}>Like Post</Text></TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => unlikePost(item.post_id)}><Text style={styles.buttonText}>Unlike Post</Text></TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => navigation.navigate("Post", {profileId: profileId.profileId, postId: item.post_id})}><Text style={styles.buttonText}>View Post</Text></TouchableOpacity>
                            </View>

                        </View>)}
                    keyExtractor={(item) => item.post_id.toString()}
                />
            </ScrollView>
        )
    } else return (
        <View>
            <Text>Loading</Text>
        </View>
    )


}

export default Posts