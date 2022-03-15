import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { TextInput } from 'react-native-web';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import styles from "../assets/styles/Style";

const EditProfileScreen = () => {



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

                } else {
                    throw 'Something went wrong';
                }
            })
            .then((responseJson) => {
                console.log(responseJson);
                setCurrentFirstName(responseJson.first_name);
                setCurrentLastName(responseJson.last_name);
                setCurrentEmail(responseJson.email)
            })
            .catch((error) => {
                console.log(error);
            })
    },[])

    const [currentFirstName, setCurrentFirstName] = useState(null)
    const [currentLastName, setCurrentLastName] = useState(null)
    const [currentEmail, setCurrentEmail] = useState(null)

    let [firstName, setFirstName] = useState(currentFirstName);
    let [lastName, setLastName] = useState(currentLastName);
    let [email, setEmail] = useState(currentEmail);
    let [password, setPassword] = useState("");
    let [oldPassword, setOldPassword] = useState("");



    const updateDetails = async () => {

        console.log("editing details")

        const updatedDetailsData = {};

        if (firstName != currentFirstName && firstName != null&& firstName != '') {
            updatedDetailsData['first_name'] = firstName;
        }
        if (lastName != currentLastName && lastName != null && lastName != '') {
            updatedDetailsData['last_name'] = lastName;
        }
        if (email != currentEmail && email != null && email != '') {
            updatedDetailsData['email'] = email;
        }

        console.log(JSON.stringify(updatedDetailsData));

        const authToken = await AsyncStorage.getItem('@session_token');
        const userId = await AsyncStorage.getItem('@user_id');

        return fetch("http://localhost:3333/api/1.0.0/user/" + userId, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': authToken
            },
            body: JSON.stringify(updatedDetailsData)
        })
        .then((response) => {
            if (response.status === 200) {
                    return response
                } else if (response.status === 401) {
    
                } else {
                    throw 'Something went wrong';    
                }
        })
        .catch((error) => {
            console.log(error);
        })
        .then((responseJson) => {
            console.log(responseJson)
        })
        .catch((error) => {
            console.log(error);
        });

    }

    return(
        <View style={styles.container}>
            <Header />
            <Text style={styles.pageHeadings}>Update User</Text>
            <Text>First Name</Text>
            <TextInput
                style={styles.textInput}
                placeholder="First Name"
                onChangeText={setFirstName}/>
            <Text>Last Name</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Last Name"
                onChangeText={setLastName}/>
            <Text>Email</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Email Address"
                onChangeText={setEmail}/>
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => updateDetails()}
                ><Text style={styles.buttonText}>Update Details</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default EditProfileScreen