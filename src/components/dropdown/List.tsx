import type { DropdownListProps } from "../../utils/interface";

const List = ({ isShow, children }: DropdownListProps) => {
  return (
    <>
      {isShow && (
        <div className="absolute left-0 w-full bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600 border-gray-400 shadow-sm top-full max-h-[270px] overflow-y-auto z-100 scrollbar-hidden">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
