import { Alert } from "react-native";

const AlertTemperatureService = (temperature) => {
  let textTemperature;
  if (temperature < 0) {
    textTemperature = "Cold weather, be careful!";
  } else if (temperature < 20) {
    textTemperature = "Mild weather";
  } else {
    textTemperature = "Temperature might get high during the day";
  }
  Alert.alert("Temperature and Humidity Info.", textTemperature, [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
};

export default AlertTemperatureService;
