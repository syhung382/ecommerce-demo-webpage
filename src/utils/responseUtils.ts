import type { authorUtils, deleteFlagUtils, statusUtils } from "./requestUtils";

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

//category
export interface Category {
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

export interface CategoryRes {
  id: string;
  parentCategory?: Category;
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

//image
export interface UploadImageRes {
  id: string;
  imageUrl: string;
}
export interface ImageRes extends authorUtils, deleteFlagUtils {
  id: string;
  imageUrl: string;
}
export interface ImageInfo {
  fileName: string;
  sizeInBytes: number;
  sizeInKb: number;
  contentType: string;
  relativePath: string;
}

//product
export interface Product extends statusUtils, deleteFlagUtils, authorUtils {
  id: string;
  categoryId: string;
  discountId?: string;
  title: string;
  description?: string;
  detail?: string;
  image?: string;
  price: number;
  priceSale?: number;
}
export interface ProductRes extends Omit<Product, "categoryId"> {
  category: Category;
  listProductTag?: ProductTagRes[];
  listProductImage?: ProductImage[];
}

//ProductTag
export interface ProductTagRes {
  id?: string;
  productId?: string;
  tagOfProductId?: string;
  tagTitle?: string;
}

//ProductImage
export interface ProductImage extends deleteFlagUtils, authorUtils {
  id: string;
  imageId: string;
  imageUrl: string;
}
