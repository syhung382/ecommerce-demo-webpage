import { useNavigate } from "react-router-dom";
import type { ClientMenuItemProps } from "../../utils/interface";

const ClientMenuItem = ({ active, url, title }: ClientMenuItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`h-full flex items-center cursor-pointer ${
        active
          ? "text-pink-600/70 dark:text-pink-400/70"
          : "hover:text-pink-500 dark:hover:text-pink-500/70"
      }`}
      onClick={() => navigate(`/${url}`)}
    >
      <span className="text-[16px] font-semibold ">{title}</span>
    </div>
  );
};

export default ClientMenuItem;
