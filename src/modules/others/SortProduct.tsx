import { useEffect, useRef, useState } from "react";
import type {
  SortProductItemProps,
  SortProductProps,
} from "../../utils/interface";
import { IconChevronDown, IconChevronUp } from "../../components/icons";

const dropdownValue: SortProductItemProps[] = [
  {
    title: "Mới nhất",
    type: "new",
  },
  {
    title: "Đang giảm giá",
    type: "sale",
  },
  {
    title: "Nổi bật",
    type: "trending",
  },
];

const SortProduct = ({ type, handleSelectSort }: SortProductProps) => {
  const [isDropdown, setIsDropdown] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        ref={dropdownRef}
        className="relative ml-1 lg:ml-2 inline-block w-full"
      >
        <div
          className={`flex items-center justify-between py-1 px-6 dark:bg-gray-800 bg-blue-50 border dark:border-gray-500 border-gray-300 rounded-lg cursor-pointer font-medium text-[15px] hover:border-blue-300 `}
          onClick={handleToggleDropdown}
        >
          {/* <span>100</span> */}
          <span>{type.title}</span>
          <span>
            {isDropdown ? (
              <IconChevronUp width={13} height={13}></IconChevronUp>
            ) : (
              <IconChevronDown width={13} height={13}></IconChevronDown>
            )}
          </span>
        </div>
        {isDropdown && (
          <div className="absolute left-0 w-full bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600 border-gray-400 shadow-sm top-full max-h-[200px] z-100 scrollbar-hidden">
            {dropdownValue.map((item) => (
              <div
                key={item.type}
                className="flex-1 text-center text-xs font-semibold text-[15px] justify-between px-2 py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                onClick={() => {
                  handleSelectSort(item);
                  handleToggleDropdown();
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortProduct;
