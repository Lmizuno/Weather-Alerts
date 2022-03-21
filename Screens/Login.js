import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import GlassButton from "../Styles/GlassButton";
import GlassInput from "../Styles/GlassInput";
import MainGradient from "../Styles/MainGradient";
import MainGlassContainer from "../Styles/MainGlassContainer";
import { Styles } from "../Styles/Styles";
import { auth } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { CheckBox } from "react-native-elements";
import localStorageKeys from "../Services/LocalStorageService";
import {getDataString,storeDataString } from "../Services/LocalStorageService";

// Register
const Login = (props) => {
  const [login, onChangeLogin] = React.useState("");
  const [passw, onChangePassw] = React.useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const login = await getDataString(localStorageKeys.LOGIN);
        const passw = await getDataString(localStorageKeys.PASSW);
        const saveInfo = await getDataString(
          localStorageKeys.SAVE_INFO
        );

        if (login !== null) {
          onChangeLogin(login);
        }
        if (passw !== null) {
          onChangePassw(passw);
        }
        if (saveInfo !== null) {
          setToggleCheckBox(saveInfo === "true");
        }
      } catch (e) {
        console.log("failed retrieving login info");
        console.log(e);
      }
    })();
  }, []);

  const onPress = async () => {
    //Login on Firebase
    console.log("User Login Started.");

    if (login.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }

    if (passw.length < 4) {
      Alert.alert("Please enter a password.");
      return;
    }

    try {
      if (toggleCheckBox) {
        await storeDataString(localStorageKeys.LOGIN, login);
        await storeDataString(localStorageKeys.PASSW, passw);
        await storeDataString(
          localStorageKeys.SAVE_INFO,
          toggleCheckBox.toString()
        );
      }
    } catch (err) {
      console.log(err);
    }

    signInWithEmailAndPassword(auth, login, passw)
      .then(function (_firebaseUser) {
        Alert.alert("User logged in!");

        // load data
        //retrieveDataFromFirebase();

        // Redirect to Dashboard
        props.navigation.navigate("Weather");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          Alert.alert("Wrong password.");
        } else {
          Alert.alert(errorMessage);
        }
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
        <Text style={Styles.label}>Login</Text>
        <Text style={Styles.label}>Email</Text>
        <GlassInput
          value={login}
          onChangeText={onChangeLogin}
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

        {/*https://firebase.google.com/docs/auth/web/auth-state-persistence*/}

        <CheckBox
          center
          title="Save Login Info"
          checked={toggleCheckBox}
          onPress={() => setToggleCheckBox(!toggleCheckBox)}
        />
        <GlassButton
          style={[{ marginTop: 10 }]}
          text="Login"
          onPress={onPress}
        />
      </MainGlassContainer>
    </View>
  );
};

export default Login;
