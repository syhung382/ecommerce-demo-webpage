import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestCheckUser,
  requestUserAdd,
  requestUserDelete,
  requestUserDetail,
  requestUserFromId,
  requestUserList,
  requestUserUpdate,
} from "../request/requestUser";
import type {
  FilterListPayload,
  UserFilter,
  UserReq,
} from "../../utils/requestUtils";

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

export const handleUserListAsync = createAsyncThunk(
  "User/list",
  async (payload: FilterListPayload<UserFilter>) => {
    const res = await requestUserList(payload);
    return res.data;
  }
);

export const handleUserAddAsync = createAsyncThunk(
  "User/add",
  async (payload: UserReq) => {
    const res = await requestUserAdd(payload);
    return res.data;
  }
);

export const handleUserUpdateAsync = createAsyncThunk(
  "User/update",
  async (payload: UserReq) => {
    const res = await requestUserUpdate(payload);
    return res.data;
  }
);

export const handleUserDetailAsync = createAsyncThunk(
  "User/detail",
  async (payload: number) => {
    const res = await requestUserDetail(payload);
    return res.data;
  }
);

export const handleUserDeleteAsync = createAsyncThunk(
  "User/delete",
  async (payload: number[]) => {
    const res = await requestUserDelete(payload);
    return res.data;
  }
);
