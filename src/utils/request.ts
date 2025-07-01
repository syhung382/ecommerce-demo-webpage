import type { LoginRes } from "./response";

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
  parrentId?: string;
  title: string;
  description?: string;
  image?: string;
  status: number;
  deleteFlag: boolean;
}

export interface CategoryFilter {
  title?: string;
  status?: number;
  typeSort?: string;
  isDesc?: boolean;
}
