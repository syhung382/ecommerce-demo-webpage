import type { LoginRes, ProductTagRes } from "./responseUtils";

export interface FilterListPayload<T> {
  body: T;
  limit: number;
  page: number;
}

export interface DeletedRes {
  deletedIds?: string[];
  notFoundIds?: string[];
}

export interface authorUtils {
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
export interface typeSortUtils {
  typeSort: string | null;
  isDesc: boolean;
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

export interface CategoryFilter extends typeSortUtils {
  title?: string;
  status?: number;
  noParent?: boolean;
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

export interface RegisterReq {
  email: string;
  fullName?: string;
  userName: string;
  password: string;
  gender: number;
  codeInvite?: string;
}

export interface UserFilter extends typeSortUtils {
  fullName: string | null;
  status: number | null;
}
export interface UserReq {
  id: number | null;
  email: string;
  fullName: string;
  userName: string;
  password: string;
  avatar: string | null;
  gender: number;
  role: number;
  roleAdmin: number | null;
}

//tag
export interface TagOfProduct
  extends authorUtils,
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

export interface TagOfProductFilter extends typeSortUtils {
  title?: string;
  status?: number;
}

//image
export interface ImageUserFilter extends typeSortUtils {
  startDate: string | null;
  endDate: string | null;
}
export interface InfoProductUpdateImageReq {
  id?: string;
  imageId: string;
  imageUrl?: string;
}

//product
export interface ProductReq extends statusUtils {
  id?: string;
  categoryId: string;
  discountId?: string;
  title: string;
  description?: string;
  detail?: string;
  image?: string;
  price: number;
  priceSale?: number;
  listTagRes?: ProductTagRes[];
  listProductImage?: InfoProductUpdateImageReq[];
}
export interface ProductFilter extends typeSortUtils {
  categoryId: string | null;
  title?: string;
  startPrice: number | null;
  endPrice: number | null;
  status: number | null;
}
