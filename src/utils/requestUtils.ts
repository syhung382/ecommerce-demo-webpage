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

export interface userAuthorCreateUtils {
  createdAt: string;
  createdBy: number;
  updatedAt?: string;
  updatedBy?: number;
}
export interface deleteFlagUtils {
  deleteFlag: boolean;
}
export interface statusUtils {
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
export interface TagOfProduct
  extends userAuthorCreateUtils,
    deleteFlagUtils,
    statusUtils {
  id: string;
  title: string;
  status: number;
}

export interface TagOfProductReq extends deleteFlagUtils {
  title: string;
  status: number;
}

export interface TagOfProductFilter {
  title?: string;
  status?: number;
  typeSort?: string;
  isDesc?: boolean;
}

//image
export interface ImageUserFilter {
  startDate: string | null;
  endDate: string | null;
  typeSort: string;
  isDesc?: boolean;
}
