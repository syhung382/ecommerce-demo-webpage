import type {
  FilterListPayload,
  UserFilter,
  UserReq,
} from "../../utils/requestUtils";
import { axiosInstance } from "../axiosInstance";

//user
export function requestCheckUser() {
  return axiosInstance.get("/MstUserAdmin/check_user_by_token");
}
export function requestUserFromId(payload: number) {
  return axiosInstance.get(`User/get-user?userId=${payload}`);
}

export function requestUserList(payload: FilterListPayload<UserFilter>) {
  return axiosInstance.post(
    `/MstUserAdmin/list?limit=${payload.limit}&page=${payload.page}`,
    payload.body
  );
}

export function requestUserAdd(payload: UserReq) {
  return axiosInstance.post("/MstUserAdmin/create", payload);
}

export function requestUserUpdate(payload: UserReq) {
  return axiosInstance.put("/MstUserAdmin/update", payload);
}

export function requestUserDetail(payload: number) {
  return axiosInstance.get(`/MstUserAdmin/detail?id=${payload}`);
}

export function requestUserDelete(payload: number[]) {
  return axiosInstance.delete("/MstUserAdmin/delete", { data: payload });
}
