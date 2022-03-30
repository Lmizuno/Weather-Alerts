// Weather  Update
import * as localStorageKeys from "../Services/LocalStorageKeys";
import * as localStorage from "./LocalStorageService";
import LocationUpdate from "./LocationUpdateService";

const WeatherUpdate = async () => {
  console.log("Weather Update");
  console.log(localStorageKeys.LAST_WEATHER_API_CALL);
  let lastApiCall = await localStorage.getDataString(
    localStorageKeys.LAST_WEATHER_API_CALL
  );

  //Should we update the weather info?
  let now = Date.now();

  if (lastApiCall) {
    let minutesPassed = (now - lastApiCall) / (1000 * 60);

    if (minutesPassed <= 30) {
      //No Need to fetch again
      return await localStorage.getDataObject(localStorageKeys.WEATHER_INFO);
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
  }else{
    throw "Failed to fetch weather info";
  }
};

const FetchWeatherAPI = async (lat, lon) => {
  let apiKey = "38d8a275e1fedc1113729c773d7f9028";

  if (lat && lon) {
    let apiURL = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  
    return await fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        // Note last api call, we will make 1 call every 30 minutes
        localStorage.storeDataString(
          localStorageKeys.LAST_WEATHER_API_CALL,
          Date.now().toString()
        );

        localStorage.storeDataObject(localStorageKeys.WEATHER_INFO, data);
        return data; // local
      });

  } else {
    console.log("Failed to Fetch Weather API");
    return null;
  }
};

export default WeatherUpdate;
