import type {
  FilterListPayload,
  ProductFilter,
  ProductReq,
} from "../../utils/requestUtils";
import { axiosInstance } from "../axiosInstance";

export function requestProductAdd(payload: ProductReq) {
  return axiosInstance.post("/MstProductAdmin/create", payload);
}
export function requestProductList(payload: FilterListPayload<ProductFilter>) {
  return axiosInstance.post(
    `/MstProductAdmin/list?limit=${payload.limit}&page=${payload.page}`,
    payload.body
  );
}
export function requestProductDetail(payload: string) {
  return axiosInstance.get(`/MstProductAdmin/detail/${payload}`);
}
export function requestProductUpdate(payload: ProductReq) {
  return axiosInstance.put("/MstProductAdmin/update", payload);
}
export function requestProductDelete(payload: string[]) {
  return axiosInstance.delete("/MstProductAdmin/delete", { data: payload });
}
