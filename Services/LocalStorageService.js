//Make it easier to update!
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeDataString = async (key, value) => {
  try {
    if (LocalKeys[key]) {
      await AsyncStorage.setItem(key, value);
      return true;
    }
  } catch (e) {
    console.log(`Error saving key ${key}: ${e.message} `);
    return false;
  }
};

const storeDataObject = async (key, object) => {
  try {
    if (LocalKeys[key]) {
      await AsyncStorage.setItem(key, JSON.stringify(object));
      return true;
    }
  } catch (e) {
    console.log(`Error saving key ${key}: ${e.message} `);
    return false;
  }
};

const getDataString = async (key, value) => {
  try {
    if (LocalKeys[key]) {
      return await AsyncStorage.getItem(key, value);
    }
  } catch (e) {
    console.log(`Error getting key ${key}: ${e.message} `);
    return false;
  }
};

const getDataObject = async (key, value) => {
  try {
    if (LocalKeys[key]) {
      let stringObj = await AsyncStorage.getItem(key, value);
      return JSON.parse(stringObj);
    }
  } catch (e) {
    console.log(`Error getting key ${key}: ${e.message} `);
    return null;
  }
};

// module.exports = {
//   storeDataString,
//   storeDataObject,
//   getDataObject,
//   getDataString,
// };

export default [storeDataString,
     storeDataObject,
     getDataObject,
     getDataString,];