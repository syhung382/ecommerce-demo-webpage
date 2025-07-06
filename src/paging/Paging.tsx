import { createPaging } from "../utils/handlerUtils";
import type { PagingProps } from "../utils/interface";

const Paging = ({
  page,
  totalPage,
  handleChangePage,
  children,
}: PagingProps) => {
  return (
    <div className="w-full mt-5">
      <div className="w-full flex gap-x-1 items-center">
        Trang <span className="font-bold">{page}</span> trên{" "}
        <span className="font-bold">{totalPage}</span>
        <div className="w-full"> {children}</div>
      </div>
      <div className="w-full mt-2 flex flex-row gap-x-2 justify-center">
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
    </div>
  );
};

export default Paging;
