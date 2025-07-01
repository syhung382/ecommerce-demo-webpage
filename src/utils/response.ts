export interface ResponseResult<T> {
  retCode: number;
  retText: string;
  data: T;
}

export interface Pagin {
  totalRows: number;
  limitPage: number;
  curPage: number;
  totalPage: number;
  start: number;
  offset: number;
  startIndex: number;
}

export interface ResponseList<T> {
  paging: Pagin;
  listData: T;
}

export interface LoginRes {
  email?: string;
  fullname?: string;
  avatar?: string;
  gender?: number;
  lastLoginDate?: string;
  token?: string;
}

export interface CategoryRes {
  id: string;
  parentId?: string;
  title: string;
  description?: string;
  image?: string;
  status: number;
  deleteFlag: boolean;
  createdAt: string;
  createdBy: number;
  updatedAt?: string;
  updatedBy?: number;
}
