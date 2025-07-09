import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategoryList,
  requestCategoryAddNew,
  requestCategoryDelete,
  requestCategoryGetDetail,
  requestCategoryNoParentList,
  requestCategoryUpdate,
  requestCheckUser,
  requestDeleteImage,
  requestListImageUser,
  requestLogin,
  requestPing,
  requestTagAddNew,
  requestTagDelete,
  requestTagGetDetail,
  requestTagGetList,
  requestTagUpdate,
  requestUploadImage,
  requestUserFromId,
} from "./request";
import type {
  CategoryFilter,
  CategoryReq,
  FilterListPayload,
  ImageUserFilter,
  LoginReq,
  TagOfProduct,
  TagOfProductFilter,
  TagOfProductReq,
} from "../utils/requestUtils";
import type { Category, UploadImageRes } from "../utils/responseUtils";

export const handlePingAsync = createAsyncThunk("global/ping", async () => {
  const res = await requestPing();

  return res.data;
});

//user
export const handleUserCheckAsync = createAsyncThunk("user/check", async () => {
  const res = await requestCheckUser();

  return res.data;
});

export const handleLoginAsync = createAsyncThunk(
  "user/login",
  async (body: LoginReq) => {
    const response = await requestLogin(body);
    return response.data;
  }
);

export const handleUserGetFromIdAsync = createAsyncThunk(
  "user/get-id",
  async (payload: number) => {
    const res = await requestUserFromId(payload);

    return res.data;
  }
);

//category
export const handleCategoryGetListAsync = createAsyncThunk(
  "category/list",
  async (payload: FilterListPayload<CategoryFilter>) => {
    const res = await getCategoryList(payload);

    return res.data;
  }
);

export const handleCategoryNoParentListAsync = createAsyncThunk(
  "category/list-no-parent",
  async (payload: CategoryFilter) => {
    const res = await requestCategoryNoParentList(payload);

    return res.data;
  }
);

export const handleCategoryAddNewAsync = createAsyncThunk(
  "category/add",
  async (payload: CategoryReq) => {
    const res = await requestCategoryAddNew(payload);

    return res.data;
  }
);

export const handleCategoryUpdateAsync = createAsyncThunk(
  "category/update",
  async (payload: Category) => {
    const res = await requestCategoryUpdate(payload);

    return res.data;
  }
);

export const handleCategoryGetDetailAsync = createAsyncThunk(
  "category/detail",
  async (payload: string) => {
    const res = await requestCategoryGetDetail(payload);

    return res.data;
  }
);

export const handleCategoryDeleteAsync = createAsyncThunk(
  "category/delete",
  async (payload: string[]) => {
    const res = await requestCategoryDelete(payload);

    return res.data;
  }
);

//image
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

//tag
export const handleTagOfProductAddNewAsync = createAsyncThunk(
  "tag/add",
  async (payload: TagOfProductReq) => {
    const res = await requestTagAddNew(payload);

    return res.data;
  }
);
export const handleTagOfProductDetail = createAsyncThunk(
  "tag/detail",
  async (payload: string) => {
    const res = await requestTagGetDetail(payload);

    return res.data;
  }
);
export const handleTagOfProductList = createAsyncThunk(
  "tag/list",
  async (payload: FilterListPayload<TagOfProductFilter>) => {
    const res = await requestTagGetList(payload);

    return res.data;
  }
);

export const handleTagOfProductUpdateAsync = createAsyncThunk(
  "tag/update",
  async (payload: TagOfProduct) => {
    const res = await requestTagUpdate(payload);

    return res.data;
  }
);

export const handleTagDeleteAsync = createAsyncThunk(
  "tag/delete",
  async (payload: string[]) => {
    const res = await requestTagDelete(payload);

    return res.data;
  }
);
