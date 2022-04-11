import React, { useState, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import { Styles } from "../Styles/Styles";
import DashboardGradient from "../Styles/DashboardGradient";
import MainGlassContainer from "../Styles/MainGlassContainer";
import { auth } from "../FirebaseAuth";
import AlertTemperatureService from "../Services/AlertTemperatureService";
import * as Location from "expo-location";
import * as MailComposer from "expo-mail-composer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapComponent from "./MapComponent";
import GlassButton from "../Styles/GlassButton";

const Weather = (props) => {
  const [currentUser, setUser] = useState({});
  const [currentTemperature, setTemperature] = useState(0); //temp in C
  const [currentHumidity, setHumidity] = useState(0);
  const [currentColorScheme, setColorScheme] = useState("cold");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    setUser(auth.currentUser);

    (async () => {
      try {
        let weatherInfo = await WeatherUpdate();
        setWeather(weatherInfo);

        setTemperature(weatherInfo.current.temp_c);
        setHumidity(weatherInfo.current.humidity);

        if (weatherInfo.current.temp_c < 0) {
          setColorScheme("cold");
        } else if (weatherInfo.current.temp_c < 20) {
          setColorScheme("neutral");
        } else if (weatherInfo.current.temp_c > 20) {
          setColorScheme("warm");
        }
        //Added an alert service to handle the temperature
        AlertTemperatureService(currentTemperature);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const LocationUpdate = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw "Permission to access location was denied";
    }

    locationObj = await Location.getCurrentPositionAsync({});
    if (locationObj) {
      storeDataObject("@lastLocation", locationObj);
      return locationObj;
    } else {
      throw "Failed to get location";
    }
  };

  const WeatherUpdate = async () => {
    console.log("Weather Update");
    let lastApiCall = await getDataString("@lastApiCall");
    let now = Date.now();

    if (lastApiCall) {
      console.log(" Retrieve Weather from mobile");
      let minutesPassed = (now - lastApiCall) / (1000 * 60);
      if (minutesPassed <= 30) {
        console.log(" No Need to fetch again");

        return await getDataObject("@weatherInfo");
      }
    }

    let locationObj = await LocationUpdate();
    let lat = locationObj.coords.latitude;
    let lon = locationObj.coords.longitude;
    let weatherInfo = await FetchWeatherAPI(lat, lon);

    if (weatherInfo) {
      return weatherInfo;
    } else {
      throw "Failed to fetch weather info";
    }
  };
  const FetchWeatherAPI = async (lat, lon) => {
    console.log("FetchWeatherAPI");
    let apiKey = "38d8a275e1fedc1113729c773d7f9028"; //Since this is a student project, this api key is set to expire in 20 days after the project is due

    if (lat && lon) {
      let apiURL = `api.openweathermap.org/data/2.5/weather?lat=${lat.toFixed(
        2
      )}&lon=${lon.toFixed(2)}&appid=${apiKey}`;

      let apiURL2 = `https://api.weatherapi.com/v1/current.json?key=1c7f1173f1b2415098034527223003&q=${lat.toFixed(
        2
      )},${lon.toFixed(2)}&aqi=yes
      `;

      let data = await fetch(apiURL2)
        .then((response) => response.json())
        .then((data) => data);

      storeDataString("@lastApiCall", Date.now().toString());
      storeDataObject("@weatherInfo", data);

      return data;
    } else {
      console.log("Failed to Fetch Weather API");
      return null;
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
  const storeDataObject = async (key, object) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(object));
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
  const getDataObject = async (key) => {
    try {
      let stringObj = await AsyncStorage.getItem(key);
      return JSON.parse(stringObj);
    } catch (e) {
      console.log(`Error getting key ${key}: ${e.message} `);
      return null;
    }
  };

  const sendEmail = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      var options = {
        recipients: [currentUser.email],
        subject: "Temperature and Humidity Guidelines",
        body: `Today's temperature is ${currentTemperature}oC and Humidity is ${currentHumidity}%`,
      };
      MailComposer.composeAsync(options).then((result) => {
        console.log(result.status);
      });
    } else {
      Alert.alert("Email is not available");
    }
  };

  return (
    <View style={Styles.mainScreen}>
      <DashboardGradient color={currentColorScheme} />
      <MapComponent style={Styles.map} />
      <View style={Styles.email}>
        <GlassButton text="Share" onPress={sendEmail} />
      </View>
      <MainGlassContainer>
        <Text style={Styles.weatherTemperature}>{currentTemperature}°C </Text>
        <Text style={Styles.weatherTemperature}>{currentHumidity}% </Text>
      </MainGlassContainer>
    </View>
  );
};

export default Weather;
