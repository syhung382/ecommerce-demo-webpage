import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  FilterListPayload,
  TagOfProduct,
  TagOfProductFilter,
  TagOfProductReq,
} from "../../utils/requestUtils";
import {
  requestTagAddNew,
  requestTagDelete,
  requestTagGetDetail,
  requestTagGetList,
  requestTagListDropdown,
  requestTagUpdate,
} from "../request/requestTag";

export const handleTagOfProductAddNewAsync = createAsyncThunk(
  "tag/add",
  async (payload: TagOfProductReq) => {
    const res = await requestTagAddNew(payload);

    return res.data;
  }
);
export const handleTagOfProductDetailAsync = createAsyncThunk(
  "tag/detail",
  async (payload: string) => {
    const res = await requestTagGetDetail(payload);

    return res.data;
  }
);
export const handleTagOfProductListAsync = createAsyncThunk(
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
export const handleTagListDropdownAsync = createAsyncThunk(
  "tag/dropdown-list",
  async (payload: TagOfProductFilter) => {
    const res = await requestTagListDropdown(payload);

    return res.data;
  }
);
