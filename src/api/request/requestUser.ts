import { axiosInstance } from "../axiosInstance";

//user
export function requestCheckUser() {
  return axiosInstance.get("/UserAdmin/check_user_by_token");
}
export function requestUserFromId(payload: number) {
  return axiosInstance.get(`User/get-user?userId=${payload}`);
}
