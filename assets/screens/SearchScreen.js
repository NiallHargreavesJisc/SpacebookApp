import React, {useState} from "react";
import {Button, FlatList, Text, TextInput, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchScreen = () => {

    const [searchParam, setSearchParam] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [searchLoading, setSearchLoading] = useState(true);
    let fetchUrl = "http://localhost:3333/api/1.0.0/search";

    const searchFriends = async () => {
        const authToken = await AsyncStorage.getItem('@session_token');
        if(searchParam){
            fetchUrl = fetchUrl + "?q=" + searchParam
        }
        return fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'X-Authorization': authToken
            }
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
            } else if (response.status === 401) {
                throw '401 response'
            } else {
                throw 'Something went wrong';
            }
        })
            .then(async (responseJson) => {
                setSearchResults(responseJson);
                setSearchLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <View>
            <Text>Search Screen</Text>
            <TextInput
                placeholder="Search..."
                onChangeText={setSearchParam}/>
            <Button
                title={"Search"}
                onPress={() => searchFriends()}/>
            <FlatList
                data={searchResults}
                extraData={searchLoading}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.user_givenname} {item.user_familyname}</Text>
                    </View>)}
                keyExtractor={(item) => item.user_id.toString()}
            />
        </View>
    )
}
export default SearchScreen