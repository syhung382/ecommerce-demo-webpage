import type { ButtonIconProps } from "../../utils/interface";

const ButtonIcon = ({ icon, onClick }: ButtonIconProps) => {
  return (
    <div
      onClick={onClick}
      className="w-8 lg:w-10 h-8 lg:h-10 border dark:border-gray-500 dark:text-gray-400 border-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 text-gray-500"
    >
      {icon}
    </div>
  );
};

export default ButtonIcon;
