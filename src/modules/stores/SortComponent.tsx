import { useState } from "react";
import { IconGridBold, IconListBold, IconSearch } from "../../components/icons";
import LimitClient from "../../paging/LimitClient";
import SortProduct from "../others/SortProduct";
import type {
  SortComponentProps,
  SortProductItemProps,
} from "../../utils/interface";

const SortComponent = ({ onChangeTypeList, typeList }: SortComponentProps) => {
  const [limit, setLimit] = useState<number>(12);
  const [sort, setSort] = useState<SortProductItemProps>({
    title: "Mới nhất",
    type: "new",
  });

  const handleSelectLimit = (value: number) => {
    setLimit(value);
  };

  const handleSelectSort = (value: SortProductItemProps) => {
    setSort(value);
  };

  return (
    <div className="my-10 lg:my-20 px-10 lg:px-30 xl:px-60 w-full">
      <div className="w-full grid grid-cols-12 gap-2 lg:gap-3 items-center text-blue-950">
        {/* Ô tìm kiếm */}
        <div className="col-span-full lg:col-span-4 flex items-center gap-x-2 border border-gray-300 rounded px-2 py-1 bg-blue-50 dark:bg-gray-800">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="flex-1 outline-none text-sm bg-transparent dark:text-gray-200"
          />
          <button className="text-gray-600 hover:text-pink-600 transition">
            <IconSearch width={18} />
          </button>
        </div>
        <div className="col-span-full lg:col-span-1"></div>

        {/* Các tuỳ chọn */}
        <div className="col-span-5 flex items-center text-sm font-medium dark:text-gray-300">
          Hiển thị:{" "}
          <LimitClient limit={limit} handleSelectLimit={handleSelectLimit} />
        </div>
        <div className="col-span-7 flex items-center text-sm font-medium dark:text-gray-300">
          Sắp xếp:{" "}
          <SortProduct type={sort} handleSelectSort={handleSelectSort} />
        </div>
        <div className="col-span-full flex items-end text-sm font-medium dark:text-gray-300">
          <span>Kiểu:</span>
          <div
            className="ml-2 flex gap-x-2 cursor-pointer"
            onClick={onChangeTypeList}
          >
            <IconGridBold
              width={16}
              height={16}
              className={`${typeList === "grid" && "text-pink-600"}`}
            />
            <IconListBold
              width={16}
              height={16}
              className={`${typeList === "list" && "text-pink-600"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortComponent;
