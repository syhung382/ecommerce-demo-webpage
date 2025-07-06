import type { LoginRes } from "./responseUtils";

export interface FilterListPayload<T> {
  body: T;
  limit: number;
  page: number;
}

export interface UserSliceProps {
  isLoading: boolean;
  user: LoginRes;
  serverError: boolean;
  errorMessage?: string;
}

export interface LoginReq {
  username: string;
  password: string;
}

export interface CategoryReq {
  parentId?: string;
  title: string;
  description?: string;
  image?: string;
  status?: number;
  deleteFlag?: boolean;
}

export interface CategoryFilter {
  title?: string;
  status?: number;
  typeSort?: string;
  isDesc?: boolean;
}

export interface UserRes {
  id: number;
  email?: string;
  fullName?: string;
  userName: string;
  avatar?: string;
  gender: number;
}
