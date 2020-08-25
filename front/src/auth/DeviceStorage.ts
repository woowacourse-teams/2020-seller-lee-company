import AsyncStorage from "@react-native-community/async-storage";

const TOKEN_STORAGE = "@storage_key";
const EXPIRE_LENGTH = 18000000;

export const DeviceStorage = {
  storeToken: async (data: string) => {
    try {
      const expireTime = new Date().getTime() + EXPIRE_LENGTH;
      await AsyncStorage.setItem(
        TOKEN_STORAGE,
        JSON.stringify({
          token: data,
          expireTime: expireTime,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  },
  getToken: async () => {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (storedToken !== null) {
        const token = JSON.parse(storedToken);
        const now = new Date().getTime();
        console.log("---------token---------");
        console.log(token);
        console.log("---------now---------");
        console.log(now);
        console.log("---------valid expire time---------");
        console.log(token.expireTime >= now);
        if (token.expireTime >= now) {
          console.log("valid token");
          return token.token;
        }
      }
      return null;
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
