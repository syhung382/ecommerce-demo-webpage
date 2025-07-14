import type {
  CategoryFilter,
  CategoryReq,
  FilterListPayload,
} from "../../utils/requestUtils";
import type { Category } from "../../utils/responseUtils";
import { axiosInstance } from "../axiosInstance";

export function getCategoryList(payload: FilterListPayload<CategoryFilter>) {
  return axiosInstance.post(
    `/MstCategoryAdmin/list?limit=${payload.limit}&page=${payload.page}`,
    payload.body
  );
}
export function requestCategoryDropdownList(payload: CategoryFilter) {
  return axiosInstance.post(`/MstCategoryAdmin/list-dropdown`, payload);
}
export function requestCategoryAddNew(payload: CategoryReq) {
  return axiosInstance.post("/MstCategoryAdmin/create", payload);
}
export function requestCategoryGetDetail(payload: string) {
  return axiosInstance.get(`/MstCategoryAdmin/detail/${payload}`);
}
export function requestCategoryUpdate(payload: Category) {
  return axiosInstance.put("/MstCategoryAdmin/update", payload);
}
export function requestCategoryDelete(payload: string[]) {
  return axiosInstance.delete("/MstCategoryAdmin/delete", { data: payload });
}
