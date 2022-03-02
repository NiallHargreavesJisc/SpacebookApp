import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileTopper from "../components/ProfileTopper";
import Posts from "../components/PostListComponent";

const Profile = ({navigation}) => {



    useEffect (async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
            navigation.navigate('Login');
        }
    }, []);

    const logout = async () => {
        let authToken = await AsyncStorage.getItem('@session_token');
        await AsyncStorage.removeItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/logout", {
            method: 'post',
            headers: {
                "X-Authorization": authToken
            }
        })
            .then((response) => {
                if(response.status === 200){
                    navigation.navigate("Login");
                }else if(response.status === 401){
                    navigation.navigate("Login");
                }else{
                    throw 'Something went wrong';
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ProfileTopper />
            <Posts />
            <Button
                title="Logout"
                onPress={() => logout()}/>
        </View>
    )



}

export default Profile