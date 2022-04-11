import React from "react";
import { Text, View } from "react-native";
import GlassButton from "../Styles/GlassButton";
import GlassInput from "../Styles/GlassInput";
import MainGradient from "../Styles/MainGradient";
import MainGlassContainer from "../Styles/MainGlassContainer";
import { Styles } from "../Styles/Styles";
import { Alert } from "react-native";
import { auth } from "../FirebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Register
const Register = (props) => {
  const [name, onChangeName] = React.useState("");
  const [passw, onChangePassw] = React.useState("");

  const onPress = () => {
    //Register on Firebase
    console.log("User Registration Started.");

    //make better validation
    if (name.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }

    //make better validation
    if (passw.length < 4) {
      Alert.alert("Please enter a password.");
      return;
    }

    createUserWithEmailAndPassword(auth, name, passw)
      .then(function (_firebaseUser) {
        const user = _firebaseUser.user.email;

        Alert.alert(`User ${user} registered!`);

        onChangeName("");
        onChangePassw("");

        //Redirect to login
        props.navigation.navigate("Login");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == "auth/weak-password") {
          Alert.alert("The password is too weak.");
        } else {
          Alert.alert(errorMessage);
        }

        console.log(error);
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
        <Text style={[Styles.title, { marginBottom: 30 }]}>Weather Alerts</Text>
        <Text style={Styles.label}>Create a new Account</Text>
        <Text style={Styles.label}>Email</Text>
        <GlassInput
          value={name}
          onChangeText={onChangeName}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="email"
          keyboardType="email-address"
        />

        <Text></Text>
        <Text style={Styles.label}>Password</Text>
        <GlassInput
          value={passw}
          onChangeText={onChangePassw}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          autoCompleteType="password"
          keyboardType="visible-password"
        />

        <GlassButton
          style={[{ marginTop: 10 }]}
          text="Register"
          onPress={onPress}
        />
      </MainGlassContainer>
    </View>
  );
};

export default Register;
