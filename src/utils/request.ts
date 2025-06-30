export interface ResponseResult<T> {
  retCode: number;
  retText: string;
  data: T;
}

export interface UserSliceProps {
  isLoading: boolean;
  user: LoginRes;
  serverError: boolean;
  errorMessage?: string;
}

export interface LoginRes {
  email?: string;
  fullname?: string;
  avatar?: string;
  gender?: number;
  lastLoginDate?: string;
  token?: string;
}

export interface LoginReq {
  username: string;
  password: string;
}
