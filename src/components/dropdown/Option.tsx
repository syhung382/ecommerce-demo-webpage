import type { DropdownOptionProps } from "../../utils/interface";

const Option = ({ handleSelected, children }: DropdownOptionProps) => {
  return (
    <div
      className="flex dropdown-option text-xs font-semibold text-[15px] items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
      onClick={handleSelected}
    >
      {children}
    </div>
  );
};

export default Option;
