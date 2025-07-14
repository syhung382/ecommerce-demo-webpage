import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestDeleteImage,
  requestImageView,
  requestListImageUser,
  requestUploadImage,
} from "../request/requestImage";
import type {
  FilterListPayload,
  ImageUserFilter,
} from "../../utils/requestUtils";
import type { UploadImageRes } from "../../utils/responseUtils";

interface UploadImageParams {
  formData: FormData;
  onProgress?: (percent: number) => void;
}
export const handleImageUploadAsync = createAsyncThunk<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  UploadImageParams
>(
  "global/image-upload",
  async ({ formData, onProgress }, { rejectWithValue }) => {
    try {
      const res = await requestUploadImage(formData, onProgress);
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("Lỗi không xác định khi upload");
    }
  }
);
export const handleImageDeleteAsync = createAsyncThunk(
  "global/image-delete",
  async (payload: UploadImageRes) => {
    const res = await requestDeleteImage(payload);

    return res.data;
  }
);
export const handleImageGetListByUser = createAsyncThunk(
  "image/image-user",
  async (payload: FilterListPayload<ImageUserFilter>) => {
    const res = await requestListImageUser(payload);

    return res.data;
  }
);
export const handleImageView = createAsyncThunk(
  "image/view",
  async (payload: string) => {
    const res = await requestImageView(payload);

    return res.data;
  }
);
