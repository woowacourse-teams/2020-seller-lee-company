import AsyncStorage from "@react-native-community/async-storage";

const TOKEN_STORAGE = "@storage_key";

export const DeviceStorage = {
  storeToken: async (key: string) => {
    try {
      await AsyncStorage.setItem(TOKEN_STORAGE, key);
    } catch (error) {
      console.log(error);
    }
  },
  getToken: async () => {
    try {
      return await AsyncStorage.getItem(TOKEN_STORAGE);
    } catch (error) {
      console.log(error);
    }
  },
  clearToken: async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_STORAGE);
    } catch (error) {
      console.log(error);
    }
  },
};
