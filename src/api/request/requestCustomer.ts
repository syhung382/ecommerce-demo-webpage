import type {
  FilterListPayload,
  UserFilter,
  UserReq,
} from "../../utils/requestUtils";
import { axiosInstance } from "../axiosInstance";

export function requestCustomerList(payload: FilterListPayload<UserFilter>) {
  return axiosInstance.post(
    `/MstCustomerAdmin/list?limit=${payload.limit}&page=${payload.page}`,
    payload.body
  );
}

export function requestCustomerAdd(payload: UserReq) {
  return axiosInstance.post("/MstCustomerAdmin/create", payload);
}

export function requestCustomerUpdate(payload: UserReq) {
  return axiosInstance.put("/MstCustomerAdmin/update", payload);
}

export function requestCustomerDetail(payload: number) {
  return axiosInstance.get(`/MstCustomerAdmin/detail?id=${payload}`);
}

export function requestCustomerDelete(payload: number[]) {
  return axiosInstance.delete("/MstCustomerAdmin/delete", { data: payload });
}
