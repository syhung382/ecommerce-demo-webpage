import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestCheckUser, requestUserFromId } from "../request/requestUser";

export const handleUserCheckAsync = createAsyncThunk("user/check", async () => {
  const res = await requestCheckUser();

  return res.data;
});

export const handleUserGetFromIdAsync = createAsyncThunk(
  "user/get-id",
  async (payload: number) => {
    const res = await requestUserFromId(payload);

    return res.data;
  }
);
