import * as React from 'react';

import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignupScreen from "./src/screens/SignupScreen";
import LoginScreen from "./src/screens/LogInScreen";
import EditPostScreen from "./src/screens/EditPostScreen";
import MainAppScreen from "./src/screens/MainAppScreen";
import CameraScreen from "./src/components/CameraComponent";
import EditProfileScreen from "./src/screens/EditProfileScreen";
import Profile from "./src/screens/Profile";
import PostScreen from "./src/screens/PostScreen";


const Stack = createNativeStackNavigator();

export const App = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={"Login"} component={LoginScreen} />
          <Stack.Screen name={"Main App"} component={MainAppScreen} />
          <Stack.Screen name={"Sign Up"} component={SignupScreen} />
          <Stack.Screen name={"Edit PostScreen"} component={EditPostScreen} />
          <Stack.Screen name={"Edit Profile"} component={EditProfileScreen} />
          <Stack.Screen name={"Camera"} component={CameraScreen} />
          <Stack.Screen name={"Friends Profile"} component={Profile} />
          <Stack.Screen name={"PostScreen"} component={PostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App