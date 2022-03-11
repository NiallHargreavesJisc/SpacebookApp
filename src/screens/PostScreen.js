import {Button, Text, TouchableOpacity, View} from "react-native";
import styles from "../assets/styles/Style";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import {useNavigation} from "@react-navigation/native";


const PostScreen = ({route}) => {

    const profileId = route.params.profileId;
    const postId = route.params.postId;


    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(async () => {
        const authToken = await AsyncStorage.getItem('@session_token');
        console.log("Wait");
        console.log(profileId);
        console.log(postId);
        return fetch("http://localhost:3333/api/1.0.0/user/" + profileId + "/post/" + postId, {
            method: 'GET',
            headers: {
                'X-Authorization': authToken
            }
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
                console.log(response.json);
            } else if (response.status === 401) {
                throw '401 response'
            } else {
                throw 'Something went wrong';
            }
        })
            .then(async (responseJson) => {
                console.log(responseJson);
                await setPost(responseJson);
                await setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    },[profileId])

    const editPost = () => {
        navigation.navigate("Edit PostScreen", {post: post});
    }

    const deletePost = async () => {
        let authToken = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/" + post.author.user_id + "/post/" + post.post_id, {
            method: 'delete',
            headers: {
                "X-Authorization": authToken
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    navigation.goBack();
                } else if (response.status === 401) {
                    console.log("PostScreen Could not be deleted")
                } else {
                    throw 'Something went wrong';
                }
            }).then(

            )
            .catch((error) => {
                console.log(error);
            })
    }

    if(isLoading != true) {
        return (
            <View style={styles.container}>
                <Header/>
                <Text>{post.text}</Text>
                <Text>{post.numLikes}</Text>
                <View style={styles.postButtons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => editPost(post)}><Text>Edit Post</Text></TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => deletePost(post)}><Text>Delete Post</Text></TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}><Text>Back</Text></TouchableOpacity>

            </View>
        )
    } else {
        return(
                <View>
                    <Text>Loading</Text>
                </View>
            )
    }



}

export default PostScreen