import type { ButtonProps } from "../../utils/interface";
import { LoadingSpinner } from "../loading";

const DashboardButton = ({
  isLoading,
  children,
  buttonColor,
  ...props
}: ButtonProps) => {
  const child = isLoading ? (
    <LoadingSpinner borderSize={4} size={20}></LoadingSpinner>
  ) : (
    children
  );

  return (
    <button
      {...props}
      disabled={isLoading}
      className={`w-full items-center justify-center mx-auto rounded-lg text-white text-sm py-3 font-semibold px-6  ${
        isLoading
          ? "bg-gray-300 cursor-not-allowed"
          : buttonColor === "secondary"
          ? "bg-red-400 dark:bg-gray-700 cursor-pointer"
          : "bg-blue-400 dark:bg-gray-700 cursor-pointer"
      }`}
    >
      {child}
    </button>
  );
};

export default DashboardButton;
