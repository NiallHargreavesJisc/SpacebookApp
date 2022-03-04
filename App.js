import * as React from 'react';

import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignupScreen from "./assets/screens/SignupScreen";
import LoginScreen from "./assets/screens/LogInScreen";
import EditPostScreen from "./assets/screens/EditPostScreen";
import MainAppScreen from "./assets/screens/MainAppScreen";


const Stack = createNativeStackNavigator();

export const App = () => {

  return (
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}>
          <Stack.Screen name={"Login"} component={LoginScreen} />
          <Stack.Screen name={"Main App"} component={MainAppScreen} />
          <Stack.Screen name={"Sign Up"} component={SignupScreen} />
          <Stack.Screen name={"Edit Post"} component={EditPostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App