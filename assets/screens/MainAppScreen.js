import * as React from 'react';
// import {NavigationContainer} from "@react-navigation/native";
import Profile from "./Profile";
import SearchScreen from "./SearchScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const MainAppScreen = ({navigation}) => {

    const Tab = createBottomTabNavigator();

    return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="Search" component={SearchScreen} />
            </Tab.Navigator>
    )

}
export default MainAppScreen;