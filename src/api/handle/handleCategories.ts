import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategoryList,
  requestCategoryAddNew,
  requestCategoryDelete,
  requestCategoryDropdownList,
  requestCategoryGetDetail,
  requestCategoryUpdate,
} from "../request/requestCategory";
import type { Category } from "../../utils/responseUtils";
import type {
  CategoryFilter,
  CategoryReq,
  FilterListPayload,
} from "../../utils/requestUtils";

export const handleCategoryGetListAsync = createAsyncThunk(
  "category/list",
  async (payload: FilterListPayload<CategoryFilter>) => {
    const res = await getCategoryList(payload);

    return res.data;
  }
);

export const handleCategoryDropdownListAsync = createAsyncThunk(
  "category/list-no-parent",
  async (payload: CategoryFilter) => {
    const res = await requestCategoryDropdownList(payload);

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
