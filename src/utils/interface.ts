import { type Control, type FieldValues } from "react-hook-form";

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface OnClickProps {
  onClick?: (() => void) | undefined;
}

export interface LabelProps extends ChildrenProps {
  htmlFor: string;
}

export type ButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type DashboardSlideItemProps = {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  to: string;
};

export type ButtonIconProps = {
  icon: React.ReactNode;
  onClick?: (() => void) | undefined;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type InputProps = {
  name: string;
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues> | Control<any>;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type ControlProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FieldValues> | Control<any>;
};

export type LoadingSprinProps = {
  size: number;
  borderSize: number;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
