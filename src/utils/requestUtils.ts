import type { LoginRes } from "./responseUtils";

export interface FilterListPayload<T> {
  body: T;
  limit: number;
  page: number;
}

export interface DeletedRes {
  deletedIds?: string[];
  notFoundIds?: string[];
}

interface userAuthorCreate {
  createdAt: string;
  createdBy: number;
  updatedAt?: string;
  updatedBy?: number;
}
interface deleteFlag {
  deleteFlag: boolean;
}
interface status {
  status: number;
}

//category
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

//user
export interface UserRes {
  id: number;
  email?: string;
  fullName?: string;
  userName: string;
  avatar?: string;
  gender: number;
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

//tag
export interface TagOfProduct extends userAuthorCreate, deleteFlag, status {
  id: string;
  title: string;
  status: number;
}

export interface TagOfProductReq extends deleteFlag {
  title: string;
  status: number;
}

export interface TagOfProductFilter {
  title?: string;
  status?: number;
  typeSort?: string;
  isDesc?: boolean;
}
