import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  FilterListPayload,
  UserFilter,
  UserReq,
} from "../../utils/requestUtils";
import {
  requestCustomerAdd,
  requestCustomerDelete,
  requestCustomerDetail,
  requestCustomerList,
  requestCustomerUpdate,
} from "../request/requestCustomer";

export const handleCustomerListAsync = createAsyncThunk(
  "customer/list",
  async (payload: FilterListPayload<UserFilter>) => {
    const res = await requestCustomerList(payload);
    return res.data;
  }
);

export const handleCustomerAddAsync = createAsyncThunk(
  "customer/add",
  async (payload: UserReq) => {
    const res = await requestCustomerAdd(payload);
    return res.data;
  }
);

export const handleCustomerUpdateAsync = createAsyncThunk(
  "customer/update",
  async (payload: UserReq) => {
    const res = await requestCustomerUpdate(payload);
    return res.data;
  }
);

export const handleCustomerDetailAsync = createAsyncThunk(
  "customer/detail",
  async (payload: number) => {
    const res = await requestCustomerDetail(payload);
    return res.data;
  }
);

export const handleCustomerDeleteAsync = createAsyncThunk(
  "customer/delete",
  async (payload: number[]) => {
    const res = await requestCustomerDelete(payload);
    return res.data;
  }
);
