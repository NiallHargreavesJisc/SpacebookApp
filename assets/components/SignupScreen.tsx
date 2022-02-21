import React, {useEffect, useState} from 'react';
import { Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-web';
import { signUp } from '../../services/users';

const SignupScreen = ({navigation}) => {

    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");



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
                    onPress={() => signUp({navigation}, firstName, lastName, email, password)}/>
            </View>
        )
}

export default SignupScreen
