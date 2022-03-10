import * as React from 'react';
import Profile from "./Profile";
import SearchScreen from "./SearchScreen";
import FriendsScreen from "./FriendsScreen";
import SettingsAndInfoScreen from "./SettingsAndInfoScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Text} from "react-native";


const MainAppScreen = ({navigation}) => {

    const [profileId, setProfileId] = useState();

    useEffect (async () => {
        const value = await AsyncStorage.getItem('@session_token');
        const id = await AsyncStorage.getItem('@user_id');
        if (value == null) {
            navigation.navigate('Login');
        }
        if (id != null){
            setProfileId(id);
        }
    }, []);



    const Tab = createBottomTabNavigator();

    if(profileId != null){
        return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Tab.Screen name="Profile" component={Profile} initialParams={{ profileId: profileId }} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Friends" component={FriendsScreen} />
                <Tab.Screen name="Settings" component={SettingsAndInfoScreen} />
            </Tab.Navigator>
        )
    } else {
        return ( <Text>Loading</Text>)
    }


}
export default MainAppScreen;