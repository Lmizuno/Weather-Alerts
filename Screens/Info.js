import React from "react";
import { Text, View, Button } from "react-native";
import { Styles } from "../Styles/Styles";
import MainGradient from "../Styles/MainGradient";
import MainGlassContainer from "../Styles/MainGlassContainer";
import { BlurView } from "expo-blur";

const Info = () => {
  return (
    <View style={Styles.mainScreen}>
      <MainGradient />

      <MainGlassContainer style={{ alignItems: "flex-start", height: "60%" }}>
        <Text style={[Styles.title]}>About</Text>
        <Text style={[Styles.h2]}>Final Project for INFO-3141</Text>
        <Text style={[Styles.h3]}>
          Created By:{"\n\n"}Luis Mizuno{"\n\n"}Matheus Simon{"\n\n"}Kamiar
          Sadighi
        </Text>
      </MainGlassContainer>
    </View>
  );
};

export default Info;
