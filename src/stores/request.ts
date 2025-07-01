import type {
  CategoryFilter,
  FilterListPayload,
  LoginReq,
} from "../utils/request";
import { axiosInstance } from "./api/axiosInstance";

export function requestLogin(data: LoginReq) {
  return axiosInstance.post("/User/UserLoginByUsernamePassword", data);
}

export function requestPing() {
  return axiosInstance.get("/Global/ping");
}

export function requestCheckUser() {
  return axiosInstance.get("/UserAdmin/check_user_by_token");
}

export function getListCategory(payload: FilterListPayload<CategoryFilter>) {
  return axiosInstance.post(
    `/MstCategoryAdmin/list?limit=${payload.limit}&page=${payload.page}`,
    payload.body
  );
}
