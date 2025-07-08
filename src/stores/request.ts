import type {
  CategoryFilter,
  CategoryReq,
  FilterListPayload,
  LoginReq,
  TagOfProduct,
  TagOfProductFilter,
  TagOfProductReq,
} from "../utils/requestUtils";
import type { Category, UploadImageRes } from "../utils/responseUtils";
import { axiosInstance } from "./api/axiosInstance";

export function requestLogin(data: LoginReq) {
  return axiosInstance.post("/User/UserLoginByUsernamePassword", data);
}

export function requestPing() {
  return axiosInstance.get("/Global/ping");
}

//user
export function requestCheckUser() {
  return axiosInstance.get("/UserAdmin/check_user_by_token");
}
export function requestUserFromId(payload: number) {
  return axiosInstance.get(`User/get-user?userId=${payload}`);
}

//category
export function getCategoryList(payload: FilterListPayload<CategoryFilter>) {
  return axiosInstance.post(
    `/MstCategoryAdmin/list?limit=${payload.limit}&page=${payload.page}`,
    payload.body
  );
}

export function requestCategoryNoParentList(payload: CategoryFilter) {
  return axiosInstance.post(`/MstCategoryAdmin/list-no-parent`, payload);
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

//image
export function requestUploadImage(
  payload: FormData,
  onProgress?: (percent: number) => void
) {
  return axiosInstance.post("/Global/upload-image", payload, {
    onUploadProgress: (progressEvent) => {
      if (!progressEvent.total) return;
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgress?.(percentCompleted);
    },
  });
}

interface ImageDeleteUrl {
  imageUrl: string;
}
export function requestDeleteImage(payload: UploadImageRes) {
  if (payload.id === null || payload.id === undefined || payload.id === "") {
    const newPayload: ImageDeleteUrl = {
      imageUrl: payload.imageUrl,
    };
    return axiosInstance.delete("/Global/delete-image", { data: newPayload });
  } else {
    return axiosInstance.delete("/Global/delete-image", { data: payload });
  }
}

//tag
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
