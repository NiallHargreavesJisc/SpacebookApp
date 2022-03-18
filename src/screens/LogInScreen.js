import React, { useState } from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../assets/styles/Style";
import Header from "../components/Header";

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    let [emailValid, setEmailValid] = useState(false);
    let [passwordValid, setPasswordValid] = useState(false);
    let [invalidDetails, setInvalidDetails] = useState(false);

    const logIn = () => {

        if(email.length == 0){
            setEmailError("Email is required");
        }
        else if(email.length < 6){
            setEmailError("Email should be minimum 6 characters");
        }
        else if(email.indexOf(' ') >= 0){
            setEmailError('Email cannot contain spaces');
        }
        else if(email.indexOf('@') === -1){
            setEmailError('Email must contain an \'@\'');
        }
        else{
            setEmailError("")
            setEmailValid(true);
        }

        if(password.length === 0){
            setPasswordError("Password is required");
        }
        else if(password.length < 6){
            setPasswordError("Password should be minimum 6 characters");
        }
        else if(password.indexOf(' ') >= 0){
            setPasswordError('Password cannot contain spaces');
        }
        else{
            setPasswordError("")
            setPasswordValid(true);
        }

        const loginData = {
            email: email,
            password: password
        }

        if(emailValid === true && passwordValid === true) {
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
                    } else if (response.status === 400) {
                        setInvalidDetails(true)
                    } else {
                        throw 'Something went wrong';
                    }
                })
                .then(async (responseJson) => {
                    if(responseJson){
                        await AsyncStorage.setItem('@user_id', responseJson.id);
                        await AsyncStorage.setItem('@session_token', responseJson.token);
                        await navigation.navigate("Main App");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return(

        <View style={styles.container}>
            <Header />
            <Text>Email</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Email Address"
                onChangeText={setEmail}/>
            {emailError.length > 0 &&
            <Text style={styles.errorText}>{emailError}</Text>
            }
            <Text>Password</Text>
            <TextInput
                style={styles.textInput}
                secureTextEntry
                placeholder="Password"
                onChangeText={setPassword}/>
            {passwordError.length > 0 &&
            <Text style={styles.errorText}>{passwordError}</Text>
            }
            <View style={styles.loginButtonView}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => logIn()}>
                    <Text style = {styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {navigation.navigate('Sign Up');}}>
                    <Text style = {styles.buttonText}>No Account? Sign Up</Text>
                </TouchableOpacity>
            </View>
            {invalidDetails &&
            <Text style={styles.errorText}>Please double check email address and password</Text>
            }
        </View>
    )
}

export default LoginScreen