import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-web';

const LoginScreen = ({navigation}) => {

    const signUp = (email: String, password: String) => {
        console.log(email)
        console.log(password)
        //login api call and load logged in page
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(


        <View>
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
                onPress={() => signUp(email, password)}/>
            <Button
                title="No Account? Sign Up"
                onPress={() => {navigation.navigate('SignUp');}}/>
        </View>
    )
}

export default LoginScreen
