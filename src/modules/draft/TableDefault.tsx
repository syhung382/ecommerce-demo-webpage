import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { ButtonSearch, ButtonSort } from "../../components/buttons";
import { LabelStatus } from "../../components/label";
import { Limit, Paging } from "../../paging";

const TableDefault = () => {
  return (
    <>
      <table className="table-auto w-full border-gray-200 rounded-xl ">
        <thead>
          <tr className="bg-blue-100 dark:bg-gray-700 text-left dark:border-b dark:border-gray-400 dark:border-collapse">
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 text-center">
              1
            </th>
            <th className="px-4 py-2 w-[8%] text-center">Ảnh</th>
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[18%]">
              <div className="w-full flex flex-row items-center gap-x-1">
                <ButtonSearch
                  // onClick={handleToggleSearch}
                  isOpen={false}
                />
                {/* {isInputSearch ? (
                    <input
                      ref={inputRef}
                      className=" w-full text-sm px-1 py-[1px] border border-gray-300 rounded"
                      type="text"
                      placeholder="search.."
                      onChange={handleChangeInput}
                      value={inputSearchValue}
                    />
                  ) : ( */}
                <span className="w-full">Tên</span>
                {/* )} */}
                <ButtonSort
                  value="ASC"
                  onClick={
                    () => {}
                    //   handleSort({ type: "setSort", value: "title" })
                  }
                ></ButtonSort>
              </div>
            </th>
            <th className="px-4 py-2 w-[18%]">Cha</th>
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[30%]">
              Mô tả
            </th>
            <th className="px-4 py-2 w-[14%] text-center">
              <div className="w-full flex flex-row items-center gap-x-1">
                <span className="flex-1">Trạng thái</span>
                <ButtonSort
                  value="Off"
                  onClick={
                    () => {}
                    //   handleSort({ type: "setSort", value: "status" })
                  }
                ></ButtonSort>
              </div>
            </th>
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[12%]"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-800 dark:even:bg-gray-800 dark:border-b dark:border-gray-400 dark:border-collapse">
            <td className="px-4 py-2 text-center font-semibold">1</td>
            <td className="px-4 py-2 text-center">
              <img
                src="/images/avt.jpg"
                alt="avt"
                className="w-10 h-10 object-cover rounded-full mx-auto"
              />
            </td>
            <td className="px-4 py-2">title</td>
            <td className="px-4 py-2">parent</td>
            <td className="px-4 py-2">description</td>
            <td className="px-4 py-2 text-center whitespace-nowrap">
              <LabelStatus type="success">Kích hoạt</LabelStatus>
            </td>
            <td className="px-4 py-2">
              <div className="flex gap-x-2">
                <ActionView />
                <ActionEdit />
                <ActionDelete />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Paging page={1} totalPage={1} handleChangePage={() => {}}>
        <Limit limit={10} handleSelectLimit={() => {}}></Limit>
      </Paging>
    </>
  );
};

export default TableDefault;
