import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/configureStore";

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
