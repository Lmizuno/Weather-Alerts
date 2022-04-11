import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./Navigation/AppNavigator";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  ]);
  //LogBox.ignoreAllLogs();
  return <AppNavigator></AppNavigator>;
}
