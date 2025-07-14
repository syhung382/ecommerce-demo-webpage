import type {
  FilterListPayload,
  TagOfProduct,
  TagOfProductFilter,
  TagOfProductReq,
} from "../../utils/requestUtils";
import { axiosInstance } from "../axiosInstance";

export function requestTagAddNew(payload: TagOfProductReq) {
  return axiosInstance.post("/MstTagOfProductAdmin/create", payload);
}
export function requestTagGetDetail(payload: string) {
  return axiosInstance.get(`/MstTagOfProductAdmin/detail/${payload}`);
}
export function requestTagGetList(
  payload: FilterListPayload<TagOfProductFilter>
) {
  return axiosInstance.post(
    `/MstTagOfProductAdmin/list?limit=${payload.limit}&page=${payload.page}`,
    payload.body
  );
}
export function requestTagUpdate(payload: TagOfProduct) {
  return axiosInstance.put("/MstTagOfProductAdmin/update", payload);
}
export function requestTagDelete(payload: string[]) {
  return axiosInstance.delete("/MstTagOfProductAdmin/delete", {
    data: payload,
  });
}
export function requestTagListDropdown(payload: TagOfProductFilter) {
  return axiosInstance.post("/MstTagOfProductAdmin/list-dropdown", payload);
}
