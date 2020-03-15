import { AsyncStorage } from "react-native";

export const AsyncStorageWrapper = {
  getItem: async key => {
    const valueString = await AsyncStorage.getItem(key);
    const value = JSON.parse(valueString);
    return value;
  },
  setItem: (key, value) => {
    const valueString = JSON.stringify(value);
    AsyncStorage.setItem(key, valueString);
  }
};
