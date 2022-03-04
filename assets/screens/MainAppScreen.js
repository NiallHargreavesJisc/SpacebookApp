import * as React from 'react';
import Profile from "./Profile";
import SearchScreen from "./SearchScreen";
import FriendsScreen from "./FriendsScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


const MainAppScreen = () => {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Friends" component={FriendsScreen} />
        </Tab.Navigator>
    )

}
export default MainAppScreen;