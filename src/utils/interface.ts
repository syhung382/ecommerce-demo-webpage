import { type Control, type FieldValues } from "react-hook-form";
import type { CategoryRes, UploadImageRes } from "./responseUtils";
import type { Dispatch, SetStateAction } from "react";

//base
export interface ChildrenProps {
  children?: React.ReactNode;
}
export interface OnClickProps {
  onClick?: (() => void) | undefined;
}
export type svgProp = React.SVGProps<SVGSVGElement> & {};

//label
export interface LabelProps extends ChildrenProps {
  htmlFor?: string;
}
export interface LabelStatusProps extends ChildrenProps {
  type?: "success" | "info" | "danger";
}

//dashboard
export interface DashboardBodyProps extends ChildrenProps, OnClickProps {
  title: string;
  buttonTitle?: string;
  buttonColor?: "primary" | "secondary";
}

export type DashboardSlideItemProps = {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  to: string;
};

//button
export type ButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  buttonColor?: "primary" | "secondary" | "primaryOutline";
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export type ButtonIconProps = {
  icon: React.ReactNode;
  onClick?: (() => void) | undefined;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export interface ButtonSortProps extends OnClickProps {
  value: "Off" | "ASC" | "DESC";
}
export interface ButtonSearchProps extends OnClickProps {
  isOpen?: boolean;
}

//paging
export interface PagingProps extends ChildrenProps {
  page: number;
  totalPage: number;
  handleChangePage: (page: number) => void;
}
export interface LimitProps {
  limit: number;
  handleSelectLimit: (limit: number) => void;
}

//upload
export interface ImageUploadProps extends OnClickProps, ChildrenProps {
  image: UploadImageRes;
  setImage: Dispatch<SetStateAction<UploadImageRes>>;
}

//dropdown
export interface DropdownListProps extends ChildrenProps {
  isShow: boolean;
}
export interface DropdownSelectProps extends OnClickProps {
  placeholder: string;
  itemSelected?: string;
  show?: boolean;
}
export interface DropdownOptionProps extends ChildrenProps {
  handleSelected: () => void;
}
export type SearchProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

//category
export interface CategoryParentProps {
  itemDropdown: CategoryRes | null;
  listItemDropdown: CategoryRes[] | null;
  setItemDropdown: Dispatch<SetStateAction<CategoryRes | null>>;
}
export interface CategoryDetailProps {
  item: CategoryRes;
}

//input
export type InputProps = {
  name: string;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues> | Control<any>;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export interface RadioInputProps<T> {
  title: string;
  name: string;
  value: T;
  status: T;
  onChange: Dispatch<SetStateAction<T>>;
}

//control
export type ControlProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues> | Control<any>;
};

//loading
export type LoadingSprinProps = {
  size: number;
  borderSize: number;
  color?: "dark" | "light" | "outline";
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export type LoadingSkeletonProps = {
  height: string | number;
  width?: string | number;
  radiusSize?: string | number;
  className?:
    | React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >
    | string;
};

//modal
export interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel: () => void;
  buttonConfirmTitle?: string;
  buttonCancelTitle?: string;
  typeButton?: "danger" | "success" | "info";
  isLoading?: boolean;
}

export interface ModalPopupProps extends ChildrenProps, ConfirmDialogProps {}

//span
export interface SpanTitleProps extends ChildrenProps {
  className?:
    | string
    | React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
      >;
}

//table
