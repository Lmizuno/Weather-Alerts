import React, { useState, useEffect } from "react";
import { Text, TextPropTypes, View } from "react-native";
import GlassButton from "../Styles/GlassButton";
import GlassInput from "../Styles/GlassInput";
import MainGradient from "../Styles/MainGradient";
import MainGlassContainer from "../Styles/MainGlassContainer";
import { Styles } from "../Styles/Styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";
import { CheckBox } from "react-native-elements";
import { app } from "../FirebaseConfig";
import { auth } from "../FirebaseAuth";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const db = getFirestore(app);

// Register
const Login = (props) => {
  const [login, onChangeLogin] = React.useState("");
  const [passw, onChangePassw] = React.useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const login = await getDataString("@login");
        const passw = await getDataString("@passw");
        const saveInfo = await getDataString("@saveInfo");

        if (login !== null && login !== undefined) {
          onChangeLogin(login);
        }
        if (passw !== null && passw !== undefined) {
          onChangePassw(passw);
        }
        if (saveInfo !== null && saveInfo !== undefined) {
          setToggleCheckBox(saveInfo === "true");
        }

      } catch (e) {
        console.log("Failed retrieving login info");
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
        await storeDataString("@login", login);
        await storeDataString("@passw", passw);
        await storeDataString("@saveInfo", toggleCheckBox.toString());
      }
    } catch (err) {
      console.log("Fail to store data from login");
    }

    signInWithEmailAndPassword(auth, login, passw)
      .then(function (_firebaseUser) {
        Alert.alert("User logged in!");

        // Redirect to Dashboard
        props.navigation.navigate("DrawerNavigator");
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

    console.log("PUSH TO DB");
    try {
      await setDoc(doc(db, "last-logins", login), {
        name: login,
        timestamp: new Date().toString(),
      });
    } catch (err) {
      console.log("Fail to push to DB");
    }
  };

  const storeDataString = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.log(`Error saving key ${key}: ${e.message} `);
      return false;
    }
  };
  const getDataString = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log(`Error getting key ${key}: ${e.message} `);
      return false;
    }
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
