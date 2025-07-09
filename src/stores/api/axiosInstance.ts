import axios from "axios";
import { localStorageName } from "../../utils/constants";

const getToken = () => localStorage.getItem(localStorageName.USERTOKEN);

// const proUrl = "https://ecommerce-dev.somee.com/";
export const currentUrl = "https://localhost:44371";
export const currentUrlApi = currentUrl + "/api";

export const axiosInstance = axios.create({
  baseURL: currentUrlApi,
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
