import type { DropdownSelectProps } from "../../utils/interface";
import { IconChevronDown, IconChevronUp } from "../icons";

const Select = ({
  onClick,
  placeholder,
  itemSelected = "",
  show,
}: DropdownSelectProps) => {
  return (
    <div
      className={`flex items-center justify-between py-2 px-4 dark:bg-gray-700 bg-white border dark:border-gray-500 border-gray-300 rounded-lg cursor-pointer font-medium text-[15px]`}
      onClick={onClick}
    >
      <span>{itemSelected ? itemSelected : placeholder}</span>
      <span>
        {show ? (
          <IconChevronUp width={10} height={10}></IconChevronUp>
        ) : (
          <IconChevronDown width={10} height={10}></IconChevronDown>
        )}
      </span>
    </div>
  );
};

export default Select;
