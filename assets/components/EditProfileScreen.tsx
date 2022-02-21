import React, { useState } from 'react';
import {Button, Text, View} from 'react-native';
import { TextInput } from 'react-native-web';

const EditProfileScreen = () => {

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [oldPassword, setOldPassword] = useState("");

    function updateDetails() {

        const currentFirstName: String = firstName;
        const currentLastName: String = lastName;
        const currentEmail: String = email;
        const currentPassword: String = password;

        const updatedDetailsData = {};

        if (firstName != currentFirstName){
            updatedDetailsData['first_name'] = firstName;
        }
        if (lastName != currentLastName){
            updatedDetailsData['last_name'] = lastName;
        }
        if (email != currentEmail){
            updatedDetailsData['email'] = email;
        }
        if (password != currentPassword){
            updatedDetailsData['password'] = password;
        }

        return fetch("http://localhost:3333/user",{
            method: 'patch',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedDetailsData)
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            })
            .catch((error) => {
                console.log(error);
            });
    }

        return(
            <View>
                <Text>Update User</Text>
                <Text>First Name</Text>
                <TextInput
                    placeholder="First Name"
                    onChangeText={setFirstName}/>
                <Text>Last Name</Text>
                <TextInput
                    placeholder="Last Name"
                    onChangeText={setLastName}/>
                <Text>Email</Text>
                <TextInput
                    placeholder="Email Address"
                    onChangeText={setEmail}/>
                <Text>Old Password</Text>
                <TextInput
                    secureTextEntry
                    placeholder="Old Password"
                    onChangeText={setOldPassword}/>
                <Text>New Password</Text>
                <TextInput
                    secureTextEntry
                    placeholder="New Password"
                    onChangeText={setPassword}/>
                <Button
                    title="Log In"
                    onPress={() => updateDetails}/>
            </View>
        )
}

export default EditProfileScreen
