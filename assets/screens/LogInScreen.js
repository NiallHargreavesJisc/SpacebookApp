import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../styles/Style";

const LoginScreen = ({navigation}) => {

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
                await navigation.navigate("Main App");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(


        <View style={styles.loginView}>
            <Text>Email</Text>
            <TextInput
                placeholder="Email Address"
                onChangeText={setEmail}/>
            <Text>Password</Text>
            <TextInput
                secureTextEntry
                placeholder="Password"
                onChangeText={setPassword}/>
            <Button
                title="Log In"
                style={styles.button}
                onPress={() => logIn()}/>
            <Button
                title="No Account? Sign Up"
                style={styles.button}
                onPress={() => {navigation.navigate('Sign Up');}}/>
        </View>
    )
}

export default LoginScreen