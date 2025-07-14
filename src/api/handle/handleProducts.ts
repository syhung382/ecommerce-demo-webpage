import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  FilterListPayload,
  ProductFilter,
  ProductReq,
} from "../../utils/requestUtils";
import {
  requestProductAdd,
  requestProductDelete,
  requestProductDetail,
  requestProductList,
  requestProductUpdate,
} from "../request/requestProduct";

export const handleProductAddAsync = createAsyncThunk(
  "product/add",
  async (payload: ProductReq) => {
    const res = await requestProductAdd(payload);

    return res.data;
  }
);

export const handleProductListAsync = createAsyncThunk(
  "product/list",
  async (payload: FilterListPayload<ProductFilter>) => {
    const res = await requestProductList(payload);

    return res.data;
  }
);

export const handleProductDetailAsync = createAsyncThunk(
  "product/detail",
  async (payload: string) => {
    const res = await requestProductDetail(payload);

    return res.data;
  }
);

export const handleProductUpdateAsync = createAsyncThunk(
  "product/update",
  async (payload: ProductReq) => {
    const res = await requestProductUpdate(payload);
    return res.data;
  }
);

export const handleProductDeleteAsync = createAsyncThunk(
  "product/delete",
  async (payload: string[]) => {
    const res = await requestProductDelete(payload);
    return res.data;
  }
);
