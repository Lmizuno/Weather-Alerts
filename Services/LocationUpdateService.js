import * as Location from "expo-location";
const localStorage  = require("./LocalStorageService.js");
const { LAST_LOCATION } = require("./LocalStorageKeys");

const LocationUpdate = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }

  locationObj = await Location.getCurrentPositionAsync({});
  localStorage.storeDataObject(LAST_LOCATION, locationObj);
  return locationObj;
};

export default LocationUpdate;
