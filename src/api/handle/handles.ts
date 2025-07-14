import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginReq } from "../../utils/requestUtils";
import { requestLogin, requestPing } from "../request/request";

export const handlePingAsync = createAsyncThunk("global/ping", async () => {
  const res = await requestPing();

  return res.data;
});

export const handleLoginAsync = createAsyncThunk(
  "user/login",
  async (body: LoginReq) => {
    const response = await requestLogin(body);
    return response.data;
  }
);
