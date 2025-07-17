import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/configureStore";
import { GenderEnum, RoleAdminEnum } from "../utils/constants";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const formatVND = (val: string) => {
  const number = parseInt(val.replace(/\D/g, "") || "0", 10);
  return number.toLocaleString("vi-VN");
};

export const parseVND = (input: string): number => {
  const cleaned = input.replace(/[^\d]/g, ""); // Xóa mọi ký tự không phải số
  return parseInt(cleaned, 10);
};

export const formatDate = (value: string) => {
  return (
    new Date(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (value as any).toDate
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (value as any).toDate()
        : value
    ).toLocaleString("vi-VI", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) || ""
  );
};

export const formatDateTime = (value: string) => {
  return (
    new Date(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (value as any).toDate
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (value as any).toDate()
        : value
    ).toLocaleString("vi-VI", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) || ""
  );
};

export const getGender = (genderCode: number) => {
  switch (genderCode) {
    case GenderEnum.Male:
      return "Nam";
    case GenderEnum.Female:
      return "Nữ";

    default:
      return "Khác";
  }
};

export const hidedEmail = (email: string) => {
  const [localPart, domain] = email.split("@");
  const hiddenLocalPart =
    localPart.length > 2 ? localPart.slice(0, 2) + "****" : localPart;
  return `${hiddenLocalPart}@${domain}`;
};

export const getRoleAdmin = (role: number) => {
  switch (role) {
    case RoleAdminEnum.Staff:
      return "Nhân viên";
    case RoleAdminEnum.Moderator:
      return "Quản lý";
    case RoleAdminEnum.Admin:
      return "Quản trị viên";
    case RoleAdminEnum.SuperAdmin:
      return "Quản trị viên *";
    default:
      return "--";
  }
};
