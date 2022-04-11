import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Info from "../Screens/Info";
import Weather from "../Screens/Weather";
import SignOut from "../Screens/SignOut";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "rgba(255, 165, 0, 0.7)",
          width: 220,
        },
        overlayColor: "transparent",
        drawerLabelStyle: {
          fontWeight: "bold",
          color: "white",
          fontSize: 29,
        },
      }}
    >
      <Drawer.Screen name="Weather" component={Weather} />
      <Drawer.Screen name="Info" component={Info} />
      <Drawer.Screen name="SignOut" component={SignOut} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
