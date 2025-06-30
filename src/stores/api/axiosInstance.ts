import axios from "axios";
import { localStorageName } from "../../utils/constants";

const getToken = () => localStorage.getItem(localStorageName.USERTOKEN);

export const axiosInstance = axios.create({
  baseURL: "https://localhost:44371/api",
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
