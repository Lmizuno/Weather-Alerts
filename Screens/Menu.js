import React from "react";
import { Text, View, Button } from "react-native";
import { Styles } from "../Styles/Styles";
import MainGradient from "../Styles/MainGradient";
import MainGlassContainer from "../Styles/MainGlassContainer";
import GlassButton from "../Styles/GlassButton";

const Menu = (props) => {
  return (
    <View style={Styles.mainScreen}>
      <MainGradient />

      <MainGlassContainer>
        <Text style={[Styles.title, { marginBottom: 30 }]}>Weather Alerts</Text>
        <GlassButton
          style={{ marginBottom: 30 }}
          text="Register"
          onPress={() => props.navigation.navigate("Register")}
        />
        <GlassButton
          text="Log-In"
          onPress={() => props.navigation.navigate("Login")}
        />
      </MainGlassContainer>
    </View>
  );
};

export default Menu;
