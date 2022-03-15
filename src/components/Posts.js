import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WritePost from './WritePost';
import PostList from './PostList';
import {Text} from "react-native";
import styles from "../assets/styles/Style";

const Posts = ({profileId}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [buttonError, setButtonError] = useState('');

    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        console.log("LOADING POSTS");
        if(isLoading){
            const authToken = await AsyncStorage.getItem('@session_token');
            console.log("http://localhost:3333/api/1.0.0/user/" + profileId + "/post");
            return fetch("http://localhost:3333/api/1.0.0/user/" + profileId + "/post", {
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
        }
    },[isLoading, buttonError])

    return (
        <>
            <WritePost profileId={profileId} setIsLoading={setIsLoading} />
            <PostList profileId={profileId} posts={posts} isLoading={isLoading} setIsLoading={setIsLoading}/>
        </>

    )
}

export default Posts