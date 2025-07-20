import type { PagingProps } from "../utils/interface";
import { createPaging } from "../utils/handlerUtils";

const PagingClient = ({ page, totalPage, handleChangePage }: PagingProps) => {
  return (
    <>
      {/* desktop */}
      <div className="w-full mt-2 flex-row gap-x-2 justify-center hidden lg:flex">
        {createPaging(totalPage, page).map((item, index) => (
          <div
            className="px-2 py-1 text-gray-500 dark:text-gray-400"
            key={index}
          >
            {item === 0 ? (
              <div className="px-3 py-2 h-full rounded-md text-sm font-medium">
                ...
              </div>
            ) : (
              <div
                className={`w-11 text-center py-2 rounded-md text-sm font-medium border ${
                  item === page ? "bg-blue-200 text-blue-700" : "cursor-pointer"
                }`}
                onClick={() => handleChangePage(item)}
              >
                {item}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* mobile */}
      <div className="w-full mt-2 flex gap-x-2 justify-center lg:hidden">
        <div
          className={`w-24 text-center py-2 rounded-md text-sm font-medium border ${
            page === 1
              ? "text-gray-500 border-gray-500"
              : "border-blue-950 text-blue-950"
          }`}
          onClick={() => {}}
        >
          Trang trước
        </div>
        <div
          className={`w-24 text-center py-2 rounded-md text-sm font-medium border ${
            page === totalPage
              ? "text-gray-500 border-gray-500"
              : "border-blue-950 text-blue-950"
          }`}
          onClick={() => {}}
        >
          Trang sau
        </div>
      </div>
    </>
  );
};

export default PagingClient;
