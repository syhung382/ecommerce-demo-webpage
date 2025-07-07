import type { ButtonSortProps } from "../../utils/interface";
import { IconAngleDown, IconAngleUp } from "../icons";

const ButtonSort = ({ value, onClick }: ButtonSortProps) => {
  return (
    <div onClick={onClick} className="px-1 flex flex-col gap-1 cursor-pointer">
      <IconAngleUp
        aria-label="Sắp xếp"
        className={`${value === "DESC" ? "text-gray-400" : "text-gray-600"}`}
      />
      <IconAngleDown
        aria-label="Sắp xếp"
        className={`${value === "ASC" ? "text-gray-400" : "text-gray-600"}`}
      />
    </div>
  );
};

export default ButtonSort;
