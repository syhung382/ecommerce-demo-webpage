import { type Control, type FieldValues } from "react-hook-form";

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
  buttonColor?: "primary" | "secondary";
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

//control
export type ControlProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues> | Control<any>;
};

//loading
export type LoadingSprinProps = {
  size: number;
  borderSize: number;
  color?: "dark" | "light";
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
