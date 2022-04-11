import React, { useEffect } from "react";
import { Text, View } from "react-native";
import GlassButton from "../Styles/GlassButton";
import MainGradient from "../Styles/MainGradient";
import MainGlassContainer from "../Styles/MainGlassContainer";
import { Styles } from "../Styles/Styles";
import { getAuth, signOut } from "firebase/auth";
import { Alert } from "react-native";

const SignOut = (props) => {
  useEffect(() => {}, []);

  const onPress = async () => {
    console.log("User Logout Started.");
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Alert.alert("User logged out!");

        props.navigation.navigate("Menu");
      })
      .catch(function (error) {
        var errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  return (
    <View
      style={[
        Styles.mainScreen,
        { justifyContent: "space-between" },
        { paddingTop: 60 },
      ]}
    >
      <MainGradient />
      <MainGlassContainer>
        <Text style={[Styles.title, { marginBottom: 30 }]}>See you Soon!</Text>
        <GlassButton
          style={[{ marginTop: 10 }]}
          text="Logout"
          onPress={onPress}
        />
      </MainGlassContainer>
    </View>
  );
};

export default SignOut;
