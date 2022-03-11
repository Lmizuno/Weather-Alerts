import React from "react";
import { Text, View } from "react-native";
import { Styles } from "../Styles/Styles";
import DashboardGradient from "../Styles/DashboardGradient";
import MainGlassContainer from "../Styles/MainGlassContainer";
import GlassButton from "../Styles/GlassButton";
import { Alert } from "react-native";

import { auth } from "../FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";


// onAuthStateChanged(auth, (user) => {
//     console.log("Auth State change observer called");
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       setUser(user);
//     } else {
//     }
//   });

const Weather = (props) => {
  const [currentUser, setUser] = React.useState({});
  const [currentTemperature, setTemperature] = React.useState(0); //temp in C
  const [currentColorScheme, setColorScheme] = React.useState('cold'); 
  
  FetchWeatherInfo = () => {
    
    //DashboardGradientColors types, 'cold', 'neutral', 'warm'
    if(temp < 0 ){
        setColorScheme('cold');
    }else if(temp < 20){
        setColorScheme('neutral');
    }else if(temp > 20){
        setColorScheme('warm');
    }
  };

  React.useEffect(() => {
    //==MOUNT==

    //Set User
    setUser(auth.currentUser);
    
    //Grab Weather Info
    FetchWeatherInfo();
    return () => {
        //==UN MOUNT==
    };
  }, []);

  

  signoutWithFirebase = () => {
    signOut(auth).then(function () {
      // if logout was successful
      if (!currentUser) {
        Alert.alert("Logged out!");
        //Redirect to login page
        props.navigation.navigate('Login');

      }
    });
  };

  return (
    <View style={Styles.mainScreen}>
        <DashboardGradient color={currentColorScheme}/>
      <Text>Welcome to the Weather Dashboard!</Text>
      <Text>{currentUser.email}</Text>
    </View>
  );
};

export default Weather;
