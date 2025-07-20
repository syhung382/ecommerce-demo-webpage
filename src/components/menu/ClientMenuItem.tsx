import { Link } from "react-router-dom";
import type { ClientMenuItemProps } from "../../utils/interface";

const ClientMenuItem = ({
  active,
  url,
  title,
  onClick,
}: ClientMenuItemProps) => {
  return (
    <Link
      className={`h-full flex items-center cursor-pointer ${
        active
          ? "text-pink-600/70 dark:text-pink-600"
          : "hover:text-pink-500 dark:hover:text-pink-500/70"
      }`}
      to={`/${url}`}
      onClick={onClick}
    >
      <span className="text-[16px] font-semibold ">{title}</span>
    </Link>
  );
};

export default ClientMenuItem;
