import * as Location from "expo-location";
const localStorage  = require("./LocalStorageService.js");
const { LAST_LOCATION } = require("./LocalStorageKeys");

const LocationUpdate = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    throw "Permission to access location was denied";
  }

  locationObj = await Location.getCurrentPositionAsync({});
  if(locationObj){
    localStorage.storeDataObject(LAST_LOCATION, locationObj);
    return locationObj;
  }else{
    throw "Failed to get location"
  }
};

export default LocationUpdate;
