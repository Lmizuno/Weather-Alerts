import { StyleSheet, Dimensions, Platform } from "react-native";

export const Styles = StyleSheet.create({
  mainScreen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("screen").height,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gradientFiller: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("screen").height,
    position: "absolute",
  },
  mainGlassContainer: {
    display: "flex",
    alignItems: "center",

    margin: 20,
    padding: 20,
    borderRadius: 15,
  },
  glassButtonStyle: {
    borderRadius: 10,
    padding: 10,
    alignSelf: "stretch",
  },
  h1: {
    fontSize: 50,
    textAlign: "center",
  },
  h2: {
    fontSize: 18,
    textAlign: "left",
    color: "white",
  },
  h3: {
    fontSize: 18,
    textAlign: "left",
    color: "white",
  },
  title: {
    color: "#fff",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  glassButtonText: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    fontSize: 25,
    color: "#fff",
  },
  weatherTemperature: {
    fontSize: 55,
    color: "#fff",
    fontWeight: "bold",
  },
  map: {
    padding: 10,
  },
  email: {
    padding: 15,
  },
});
