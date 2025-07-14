import type {
  FilterListPayload,
  ImageUserFilter,
} from "../../utils/requestUtils";
import type { UploadImageRes } from "../../utils/responseUtils";
import { axiosInstance } from "../axiosInstance";

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
export function requestListImageUser(
  payload: FilterListPayload<ImageUserFilter>
) {
  return axiosInstance.post(
    `/InfoImage/list-user?limit=${payload.limit}&page=${payload.page}`,
    payload.body
  );
}
export function requestImageView(payload: string) {
  return axiosInstance.get(`/Global/get-image?imageUrl=${payload}`);
}
