import axios from "axios";
import { localStorageName } from "../utils/constants";

const getToken = () => localStorage.getItem(localStorageName.USERTOKEN);

// const proUrl = "https://ecommerce-dev.somee.com";
//"https://localhost:44371"
//https://iamkazu.bsite.net
export const currentUrl = "https://localhost:44371";
export const currentUrlImage = currentUrl + "/api/Global/view-image?imageUrl=";
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
