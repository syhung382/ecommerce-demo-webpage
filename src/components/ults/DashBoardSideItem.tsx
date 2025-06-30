import { Link } from "react-router-dom";
import type { DashboardSlideItemProps } from "../../utils/interface";

const DashBoardSideItem = ({
  title,
  icon,
  active,
  to,
}: DashboardSlideItemProps) => {
  const baseClass =
    "flex-1 flex gap-x-3 px-3 items-center mt-4 py-2  rounded-lg cursor-pointer";
  const activeClass =
    "dark:bg-gray-800 dark:text-blue-400 text-blue-500 bg-blue-50";
  const inActiveClass = "dark:hover:bg-gray-700 hover:bg-gray-100";

  return (
    <Link
      to={to}
      className={`${baseClass}  ${active ? activeClass : inActiveClass}`}
    >
      <div>{icon}</div>
      <div className="flex-1 text-[14px] font-[600]">{title}</div>
    </Link>
  );
};

export default DashBoardSideItem;
