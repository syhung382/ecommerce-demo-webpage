import type { LoginReq } from "../../utils/requestUtils";
import { axiosInstance } from "../axiosInstance";

export function requestLogin(data: LoginReq) {
  return axiosInstance.post("/User/UserLoginByUsernamePassword", data);
}

export function requestPing() {
  return axiosInstance.get("/Global/ping");
}
