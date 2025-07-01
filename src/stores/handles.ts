import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getListCategory,
  requestCheckUser,
  requestLogin,
  requestPing,
} from "./request";
import type {
  CategoryFilter,
  FilterListPayload,
  LoginReq,
} from "../utils/request";

export const handleLoginAsync = createAsyncThunk(
  "user/login",
  async (body: LoginReq) => {
    const response = await requestLogin(body);
    return response.data;
  }
);

export const handlePingAsync = createAsyncThunk("global/ping", async () => {
  const res = await requestPing();

  return res.data;
});

export const handleCheckUserAsync = createAsyncThunk("user/check", async () => {
  const res = await requestCheckUser();

  return res.data;
});

export const getListCategoryAsync = createAsyncThunk(
  "category/list",
  async (payload: FilterListPayload<CategoryFilter>) => {
    const res = await getListCategory(payload);

    return res.data;
  }
);
