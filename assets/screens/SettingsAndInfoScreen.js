import {Button, View} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/Style";
import {useNavigation} from "@react-navigation/native";
import Header from "../components/Header";

const SettingsAndInfoScreen = () => {

    const navigation = useNavigation();

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
                    navigation.goBack();
                }else{
                    throw 'Something went wrong';
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <View>
            <Header />
            <Button
                title="Edit Profile"
                onPress={() => navigation.navigate("Edit Profile")}/>
            <Button
                title="Take New Photo"
                onPress={() => navigation.navigate("Camera")}/>
            <Button
                title="Logout"
                style={styles.button}
                onPress={() => logout()}/>
        </View>
    )
}
export default SettingsAndInfoScreen