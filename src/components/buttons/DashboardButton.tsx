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

  let color = "";
  switch (buttonColor) {
    case "secondary":
      color = "bg-red-400 dark:bg-gray-700 cursor-pointer text-white";
      break;
    case "primary":
      color = "bg-blue-400 dark:bg-gray-700 cursor-pointer text-white";
      break;
    case "primaryOutline":
      color =
        "bg-gray-50 dark:bg-gray-700 cursor-pointer text-green-400 dark:text-green-900 border border-green-400 dark:border-green-900";
      break;
    default:
      color = "bg-blue-400 dark:bg-gray-700 cursor-pointer text-white";
      break;
  }

  return (
    <button
      {...props}
      disabled={isLoading}
      className={`w-full items-center justify-center mx-auto rounded-lg text-sm py-3 font-semibold px-6  ${
        isLoading ? "bg-gray-300 cursor-not-allowed" : color
      }`}
    >
      {child}
    </button>
  );
};

export default DashboardButton;
