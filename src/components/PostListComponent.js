import React, {useEffect, useState} from 'react';
import {Text, View, Button, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "../assets/styles/Style";

const Posts = (profileId) => {

    const [isLoading, setIsLoading] = useState(true);

    const [posts, setPosts] = useState([]);

    const navigation = useNavigation();

    useEffect(async () => {
        const authToken = await AsyncStorage.getItem('@session_token');
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

    const editPost = (item) => {
        navigation.navigate("Edit Post");
    }

    const deletePost = async (post) => {
        let authToken = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/" + post.author.user_id + "/post/" + post.post_id, {
            method: 'delete',
            headers: {
                "X-Authorization": authToken
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    navigation.navigate("Profile");
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

    if (isLoading === false) {
        return (
            <View>
                <FlatList
                    data={posts}
                    renderItem={({item}) => (
                        <View>
                            <Text>{item.text}</Text>
                            <Text>{item.numLikes}</Text>
                            <Button
                                title="Edit Post"
                                style={styles.button}
                                onPress={() => editPost(item)}/>
                            <Button
                                title="Delete Post"
                                style={styles.button}
                                onPress={() => deletePost(item)}/>
                        </View>)}
                    keyExtractor={(item) => item.post_id.toString()}
                />
            </View>
        )
    } else return (
        <View>
            <Text>Loading</Text>
        </View>
    )


}

export default Posts