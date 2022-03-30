import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Styles } from "../Styles/Styles";
import DashboardGradient from "../Styles/DashboardGradient";
import MainGlassContainer from "../Styles/MainGlassContainer";
import { auth } from "../FirebaseConfig";

import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    //Should we update the weather info?
    let now = Date.now();

    if (lastApiCall) {
      console.log(" Retrieve Weather from mobile");

      let minutesPassed = (now - lastApiCall) / (1000 * 60);

      if (minutesPassed <= 30) {
        //No Need to fetch again
        console.log(" No Need to fetch again");

        return await getDataObject("@weatherInfo");
      }
    }
    let locationObj = await LocationUpdate();

    // Prepare API request
    let lat = locationObj.coords.latitude;
    let lon = locationObj.coords.longitude;

    //Fetch API
    let weatherInfo = await FetchWeatherAPI(lat, lon);

    if (weatherInfo) {
      return weatherInfo;
    } else {
      throw "Failed to fetch weather info";
    }
  };
  const FetchWeatherAPI = async (lat, lon) => {
    console.log("FetchWeatherAPI");
    let apiKey = "38d8a275e1fedc1113729c773d7f9028";

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
  return (
    <View style={Styles.mainScreen}>
      <DashboardGradient color={currentColorScheme} />

      <Text>{currentUser.email}</Text>

      {/* <Text>Humidity: {weather}% </Text> */}

      <MainGlassContainer>
        <Text style={Styles.weatherTemperature}>{currentTemperature}°C </Text>
        <Text style={Styles.weatherTemperature}>{currentHumidity}% </Text>
      </MainGlassContainer>
    </View>
  );
};

export default Weather;
