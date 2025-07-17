// export const Theme = {
//   MainText: "#0D0E43",
//   SubText: "#9096B2",
//   Pink: "#FB2E86",
//   Red: "#FB2448",
//   Blue: "#2F1AC4",
//   OffNavyBlue: "#3F509E",
//   NavyBlue: "#151875",
//   SkyBlue: "#F1F0FF",
//   PantonePurple: "#E0D3F5",
//   Purple: "#7E33E0",
//   OffPurple: "#9F63B5",
//   OffBlue: "#151875",
// } as const;

export const localStorageName = {
  USERTOKEN: "user_token",
  GLOBALCONFIG: "global_config",
} as const;

export const adminSideBarMenuPath = {
  Dashboard: "dashboard",
  CategoryManager: "category/manager",
  CategoryDetail: "category/detail",
  CategoryAdd: "category/add",
  CategoryUpdate: "category/update",
  TagOfProductManager: "tag/manager",
  TagOfProductDetail: "tag/detail",
  TagOfProductAdd: "tag/add",
  TagOfProductUpdate: "tag/update",
  ProductManager: "product/manager",
  ProductDetail: "product/detail",
  ProductAdd: "product/add",
  ProductUpdate: "product/update",
  CustomerManager: "customer/manager",
  CustomerDetail: "customer/detail",
  CustomerAdd: "customer/add",
  CustomerUpdate: "customer/update",
  MemberManager: "member/manager",
  MemberDetail: "member/detail",
  MemberAdd: "member/add",
  MemberUpdate: "member/update",
  OrderManager: "order/manager",
  OrderDetail: "order/detail",
  OrderAdd: "order/add",
  OrderUpdate: "order/update",
  ContactManager: "contact/manager",
  ContacDetail: "contact/detail",
  ContacReply: "contact/Reply",
  ImageManager: "image/manager",
  Setting: "setting",
  Profile: "profile",
} as const;

export const clientSiderBarMenuPath = {
  Home: "",
  Category: "danh-muc",
  Product: "san-pham",
  Blog: "blog",
  About: "about",
  Contact: "lien-he",
} as const;

export const RetCodeEnum = {
  Ok: 0,
  ApiError: 1,
  ResultNotExists: 2,
  ParammetersInvalid: 3,
  ParammetersNotFound: 4,
  ApiNoDelete: 5,
  ApiNotRole: 6,
} as const;

export const PageLimit = {
  SMALL: 10,
  MEDIUM: 25,
  LARGE: 50,
  EXTRALARGE: 100,
} as const;

export const UserStatus = {
  Active: 0,
  TemporarilyDeleted: 1,
} as const;

export const UserBannedEnum = {
  No: 0,
  Banned: 1,
} as const;

export const StatusEnum = {
  Active: 0,
  InActive: 1,
} as const;

export const GenderEnum = {
  Male: 1,
  Female: 2,
  Other: 3,
};

export const RoleUserEnum = {
  User: 1,
  Staff: 2,
} as const;

export const RoleAdminEnum = {
  Staff: 3,
  Moderator: 4,
  Admin: 5,
  SuperAdmin: 6,
} as const;

export const ActivateEnum = {
  IsActivated: 1,
  InActivated: 0,
} as const;
