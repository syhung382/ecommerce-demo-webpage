import axios from "axios";
import { localStorageName } from "../../utils/constants";

const getToken = () => localStorage.getItem(localStorageName.USERTOKEN);

const proUrl = "http://ecommerce-be-api.runasp.net/api";
// const devUrl = "https://localhost:44371/api";

export const axiosInstance = axios.create({
  baseURL: proUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
