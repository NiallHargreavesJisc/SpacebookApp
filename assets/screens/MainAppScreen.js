import * as React from 'react';
import Profile from "./Profile";
import SearchScreen from "./SearchScreen";
import FriendsScreen from "./FriendsScreen";
import SettingsAndInfoScreen from "./SettingsAndInfoScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const MainAppScreen = ({navigation}) => {

    useEffect (async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
            navigation.navigate('Login');
        }
    }, []);

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Friends" component={FriendsScreen} />
            <Tab.Screen name="Settings" component={SettingsAndInfoScreen} />
        </Tab.Navigator>
    )

}
export default MainAppScreen;