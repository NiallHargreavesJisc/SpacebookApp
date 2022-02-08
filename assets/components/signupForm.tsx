import React from 'react';
import { Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-web';
import { useState } from 'react/cjs/react.production.min';

 let [firstName, setFirstName] = useState("");
 let [lastName, setLastName] = useState("");
 let [email, setEmail] = useState("");
 let [password, setPassword] = useState("");



const signUp = (firstName: String, lastName: String, email: String, password: String) => {
    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log(password)
    //login api call and load logged in page
}

const SignupForm = () => {
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
                    onPress={() => signUp(firstName, lastName, email, password)}/>
            </View>
        )
}

export default SignupForm
