import React, {useState} from 'react';
import {Text, View, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from "../assets/styles/Style";

const PostList = ({profileId, posts, isLoading, setIsLoading}) => {

    const navigation = useNavigation();

    const [buttonError, setButtonError] = useState('');

    const likePost = async (postId) => {
        const authToken = await AsyncStorage.getItem('@session_token');
        const userId = await AsyncStorage.getItem('@user_id')
        console.log("Auth Token", authToken);

        if(userId === profileId){
            setButtonError("You cannot like your own post.")
            setIsLoading(true)
        }else {
            return fetch("http://localhost:3333/api/1.0.0/user/" + profileId + "/post/" + postId + "/like", {
                method: 'POST',
                headers: {
                    'X-Authorization': authToken
                }
            }).then((response) => {
                console.log("RESPONSE", response);
                if (response.status === 200) {
                    setIsLoading(true)
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

    }

    const unlikePost = async (postId) => {
        const authToken = await AsyncStorage.getItem('@session_token');
        const userId = await AsyncStorage.getItem('@user_id')
        console.log("AUTH TOKEN", authToken);
        if(userId === profileId){
            setButtonError("You cannot unlike your own post.")
            setIsLoading(true)
        }else {
            return fetch("http://localhost:3333/api/1.0.0/user/" + profileId + "/post/" + postId + "/like", {
                method: 'DELETE',
                headers: {
                    'X-Authorization': authToken
                }
            }).then((response) => {
                console.log("RESPONSE ", response);
                if (response.status === 200) {
                    setIsLoading(true)
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

    }

    const editPost = async (author, profileId, postId) => {
        const userId = await AsyncStorage.getItem('@user_id')
        //both user id and profile id are printing as 12
        console.log("User ID = " + userId + " ProfileId = " + profileId)
        if (userId != author) {
            setButtonError("You can only edit/delete posts you are the author of.")
            setIsLoading(true)
        } else {
            navigation.navigate("PostScreen", {profileId: profileId, postId: postId})
        }
    }

    const getDateOfPost = (timestamp) => {

        const d = new Date(timestamp);
        let date = d.getDate() + "-" + d.getUTCMonth()  + "-" + d.getFullYear();
        return date;

    }

    if (isLoading === false) {
        return (
            <ScrollView style={styles.container}>
                {buttonError.length >0 &&
                <Text style={styles.errorText}>{buttonError}</Text>}
                <FlatList
                    data={posts}
                    renderItem={({item}) => (
                        <View style={styles.postListItem}>
                            <Text style={styles.postText}>{item.text}</Text>
                            <Text style={styles.postAuthor}>{item.author.first_name} {item.author.last_name} - {getDateOfPost(item.timestamp).toString()}</Text>
                            <Text>Likes: {item.numLikes}</Text>
                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => likePost(item.post_id)}
                                ><Text style={styles.buttonText}>Like Post</Text></TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => unlikePost(item.post_id)}
                                ><Text style={styles.buttonText}>Unlike Post</Text></TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => editPost(item.author.user_id, profileId, item.post_id) }
                                ><Text style={styles.buttonText}>View Post</Text></TouchableOpacity>
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

export default PostList