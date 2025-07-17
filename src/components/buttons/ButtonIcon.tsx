import type { ButtonIconProps } from "../../utils/interface";

const ButtonIcon = ({ icon, onClick }: ButtonIconProps) => {
  return (
    <div
      onClick={onClick}
      className="w-7 h-7 lg:w-8 lg:h-8 border dark:border-gray-500 dark:text-gray-400 border-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-200 text-gray-500"
    >
      {icon}
    </div>
  );
};

export default ButtonIcon;
