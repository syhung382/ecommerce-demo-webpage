import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestCheckUser, requestLogin, requestPing } from "./request";
import type { LoginReq } from "../utils/request";

export const handleLoginAsync = createAsyncThunk(
  "user/login",
  async (body: LoginReq) => {
    const response = await requestLogin(body);
    return response.data;
  }
);

export const handlePingAsync = createAsyncThunk("global/ping", async () => {
  const res = await requestPing();

  console.log(res.data);
});

export const handleCheckUserAsync = createAsyncThunk("user/check", async () => {
  const res = await requestCheckUser();

  return res.data;
});
