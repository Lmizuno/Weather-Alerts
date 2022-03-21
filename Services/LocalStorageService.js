import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalKeys from "./LocalStorageKeys";

export const storeDataString = async (key, value) => {
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

export const storeDataObject = async (key, object) => {
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

export const getDataString = async (key) => {
    try {
        if (LocalKeys[key]) {
            return await AsyncStorage.getItem(key, value);
        }
    } catch (e) {
        console.log(`Error getting key ${key}: ${e.message} `);
        return false;
    }
};

export const getDataObject = async (key) => {
    try {
        if (LocalKeys[key]) {
        let stringObj = await AsyncStorage.getItem(key, value);
        return JSON.parse(stringObj);
        }
    } catch (e) {
        console.log(`Error getting key ${key}: ${e.message} `);
        return null;
    }
}