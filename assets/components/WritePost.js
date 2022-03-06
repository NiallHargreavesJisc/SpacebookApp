import {Button, Text, TextInput, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react";

const WritePost = () => {

    const [postText, setPostText] = useState(null);

    const postData = {
        "text": postText
    }

    const post = async () => {

        const authToken = await AsyncStorage.getItem('@session_token');
        const userId = await AsyncStorage.getItem('@user_id');
        return fetch("http://localhost:3333/api/1.0.0/user/" + userId + "/post", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': authToken
            },
            body: JSON.stringify(postData)
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
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return(
        <View>
            <Text>New Post</Text>
            <TextInput
                placeholder="New post.."
                onChangeText={setPostText}/>
            <Button title="Post" onPress={() => post()} />
        </View>
    )
}

export default WritePost