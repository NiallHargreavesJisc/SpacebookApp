import React, {useEffect, useState} from 'react';
import { Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-web';
import LoginScreen from "./LogInScreen"
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = ({navigation}) => {

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const logIn = () => {

        const loginData = {
            email: email,
            password: password
        }
        console.log(JSON.stringify(loginData));
        return fetch("http://localhost:3333/api/1.0.0/login",{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
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
            .then(async (responseJson) => {
                console.log(responseJson);
                await AsyncStorage.setItem('@user_id', responseJson.id);
                await AsyncStorage.setItem('@session_token', responseJson.token);
                navigation.navigate("Main App");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const signUp = () => {

        const signUpData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        }
        console.log(JSON.stringify(signUpData));
        return fetch("http://localhost:3333/api/1.0.0/user",{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpData)
        })
            .then((response) => {
                if (response.status === 201){
                    return response.json()

                } else if (response.status === 400 ){
                    navigation.navigate("Login");
                } else {
                    throw 'Something went wrong';
                }

            })
            .then((responseJson) => {
                console.log(responseJson)
                logIn()
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return(
        <View>
            <Text>First Name</Text>
            <TextInput
                placeholder="First Name"
                onChangeText={setFirstName}></TextInput>
            <Text>Last Name</Text>
            <TextInput
                placeholder="Last Name"
                onChangeText={setLastName}></TextInput>
            <Text>Email</Text>
            <TextInput
                placeholder="Email Address"
                onChangeText={setEmail}></TextInput>
            <Text>Password</Text>
            <TextInput
                secureTextEntry
                placeholder="Password"
                onChangeText={setPassword}></TextInput>
            <Button
                title="Sign Up"
                onPress={() => signUp()}/>
        </View>
    )
}

export default SignupScreen