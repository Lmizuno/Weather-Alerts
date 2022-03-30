import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MapComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let stringObj = await AsyncStorage.getItem("@weatherInfo");
        let parsedInfo = JSON.parse(stringObj);
        setData({
          latitude: parsedInfo.location.lat,
          longitude: parsedInfo.location.lon,
          city: parsedInfo.location.name,
        });
      } catch (e) {
        console.log(`Error`);
        return null;
      }
    };

    // call the function
    getLocation();
  }, []);

  console.log(data);

  return (
    <View style={styles.container}>
      {data.latitude != null && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }}
          provider="google"
        >
          <Marker
            coordinate={{ latitude: data.latitude, longitude: data.longitude }}
            title={data.city}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  map: {
    width: 300,
    height: 300,
  },
});

export default MapComponent;
