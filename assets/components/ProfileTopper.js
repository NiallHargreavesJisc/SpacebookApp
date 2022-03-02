import React, {useEffect, useState} from 'react';
import {Text, View, Image, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileTopper = () => {


    const [profilePicture, setProfilePicture] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [friends, setFriends] = useState(null);


    useEffect(async () => {
        const authToken = await AsyncStorage.getItem('@session_token');
        const userId = await AsyncStorage.getItem('@user_id');
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/photo", {
            method: 'GET',
            headers: {
                'X-Authorization': authToken
            }
        }).then((response) => {
            if (response.status === 200) {
                return response.blob();
            } else if (response.status === 401) {
            } else {
                throw 'Something went wrong';
            }
        })
            .then((responseBlob) => {
                let data = URL.createObjectURL(responseBlob)
                console.log(data);
                setProfilePicture(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(async () => {
        const authToken = await AsyncStorage.getItem('@session_token');
        const userId = await AsyncStorage.getItem('@user_id');
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId, {
            headers: {
                'X-Authorization': authToken
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else if (response.status === 401) {
                    navigation.navigate("Login");
                } else {
                    throw 'Something went wrong';
                }
            })
            .then((responseJson) => {
                console.log(responseJson);
                setFirstName(responseJson.first_name);
                setLastName(responseJson.last_name);
                setFriends(responseJson.friend_count);
            })
            .catch((error) => {
                console.log(error);
            })
    },[])



    return(
        <View>
            <Text>{firstName} {lastName}</Text>
            <Image
                source={{uri: profilePicture}}
                style={{width: 60, height: 60}}
            ></Image>
            <Text>Friends: {friends}</Text>
        </View>
    )



}

export default ProfileTopper