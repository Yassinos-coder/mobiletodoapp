import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AxiosConfig = axios.create({
  baseURL: "http://192.168.3.194:8009/",
});

AxiosConfig.interceptors.request.use(
  async(config) => {
    let token;
    token = await AsyncStorage.getItem("tokenKey");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Store JWT token
// const storeToken = async (token) => {
//     try {
//       await AsyncStorage.setItem('tokenKey', token)
//     } catch (e) {
//       console.log('Error storing token:', e)
//     }
//   }

export default AxiosConfig;
