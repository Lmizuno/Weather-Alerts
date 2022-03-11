import React from "react";
import { Text, View, Button } from "react-native";
import { Styles } from '../Styles/Styles';
import MainGradient from "../Styles/MainGradient";
import MainGlassContainer from "../Styles/MainGlassContainer";
import GlassButton from "../Styles/GlassButton";

// Menu
// If there is a saved login on the phone
//   Auto Fill
// Auto Login box is checked
//   Auto Login => Goto Dashboard
// No Saved login
//   Redirect to Register

const Menu = (props) => {
  return <View style={Styles.mainScreen}>
        <MainGradient/>
        
        <MainGlassContainer>
            <Text style={[Styles.title, {marginBottom:30}]}>Weather Alerts</Text>
            <GlassButton
                text="Register"
                onPress={() => props.navigation.navigate('Register')}
            />
            <Text></Text>
            <GlassButton
                text="Log-In"
                onPress={() => props.navigation.navigate('Login')}
            />
        </MainGlassContainer>
        
  </View>;
};

export default Menu;
