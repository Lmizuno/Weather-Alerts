import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from "../Screens/Menu";
import Register from "../Screens/Register";
import Login from "../Screens/Login";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
