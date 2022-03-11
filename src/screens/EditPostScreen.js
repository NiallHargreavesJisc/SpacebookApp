import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Header from "../components/Header";
import styles from "../assets/styles/Style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditPostScreen = ({route}) => {

    const profileId = route.params.post.author.user_id;
    const postId = route.params.post.post_id;

    const [postText, setPostText] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
                await setPostText(responseJson.text);
                await setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    },[profileId])

    const updatePost = async () => {

        const authToken = await AsyncStorage.getItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/user/" + profileId + "/post/" + postId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': authToken
            },
            body: {
                postText
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
                await setPostText(responseJson.text);
                await setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if(isLoading != true){
        return (

            <View style={styles.container}>
                <Header />
                <TextInput
                    placeholder= {postText}
                    onChangeText={setPostText}/>
                <TouchableOpacity
                    onPress={() => updatePost()}
                    style={styles.button}><Text style={styles.buttonText}>Update Post</Text></TouchableOpacity>
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

export default EditPostScreen