import { IconRight } from "../../components/icons";
import type { MenuButtonProps } from "../../utils/interface";

const MenuButton = ({ children, onClick, isActive }: MenuButtonProps) => {
  return (
    <span
      className={`flex items-center justify-between cursor-pointer px-3 py-1 ${
        isActive
          ? "bg-blue-200 dark:bg-blue-700/30"
          : "hover:bg-blue-100 dark:hover:bg-blue-900/30"
      }`}
      onClick={onClick}
    >
      {children} <IconRight width={10} height={10} />
    </span>
  );
};

export default MenuButton;
