import { useEffect, useRef, useState } from "react";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { ButtonSearch, ButtonSort } from "../../components/buttons";
import { LabelStatus } from "../../components/label";
import { Limit, Paging } from "../../paging";
import { RetCodeEnum, StatusEnum } from "../../utils/constants";
import type { TagOfProductTableProps } from "../../utils/interface";
import { debounce } from "lodash";
import { ConfirmDialog, PopupModal } from "../../components/modals";
import TagOfProductUpdate from "./TagOfProductUpdate";
import { LoadingSpinner } from "../../components/loading";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/hook";
import { handleTagDeleteAsync } from "../../stores/handles";
import type { ResponseResult } from "../../utils/responseUtils";
import { type DeletedRes, type TagOfProduct } from "../../utils/requestUtils";
import TagOfProductDetail from "./TagOfProductDetail";

const TagOfProductTable = ({
  loading,
  data,
  paging,
  headerParams,
  setHeaderParams,
  handleResetData,
}: TagOfProductTableProps) => {
  const [sortTitleType, setSortTitleType] = useState<"Off" | "ASC" | "DESC">(
    "Off"
  );
  const [sortDateType, setSortDateType] = useState<"Off" | "ASC" | "DESC">(
    "Off"
  );
  const [sortStatusType, setSortStatusType] = useState<"Off" | "ASC" | "DESC">(
    "Off"
  );
  const [sortField, setSortField] = useState<
    "" | "title" | "createdAt" | "status"
  >("");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC" | "">("");
  const [isSearchTitle, setIsSeachTitle] = useState<boolean>(false);
  const [valueSearchTitle, setValueSearchTitle] = useState<string>("");
  const [idUpdate, setIdUpdate] = useState<string>("");
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);
  const [isDetailModal, setIsDetailModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string[] | null>([]);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<TagOfProduct | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleChangeLimit = (value: number) => {
    if (headerParams.limit === value) return;

    setHeaderParams((prev) => {
      if (prev.limit === value) return prev;

      return {
        ...prev,
        limit: value,
      };
    });
  };

  const handleToggleUpdate = (id?: string) => {
    if (id) {
      setIdUpdate(id);
      setIsUpdateModal(true);
    } else {
      setIdUpdate("");
      setIsUpdateModal(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    if (loadingDelete) return;
    setLoadingDelete(true);

    try {
      const res = await dispatch(handleTagDeleteAsync(selectedId));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connecting server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<DeletedRes>;

          if (resData.retCode === RetCodeEnum.Ok) {
            toast.success("Xóa tag thành công!");
            if (handleResetData) handleResetData();
          } else {
            toast.error(resData.retText);
          }
        }
        setLoadingDelete(false);
        setSelectedId([]);
        setIsConfirmDelete(false);
      }
    } catch (e) {
      toast.error("Lỗi không xác định!");
      console.log("error: ", e);
      setLoadingDelete(false);
      setSelectedId([]);
    }
  };

  const handleToggleDelete = (id: string | null) => {
    if (id) {
      setIsConfirmDelete(true);
      setSelectedId((prev) => [...(prev || []), id]);
    } else {
      setIsConfirmDelete(false);
      setSelectedId([]);
    }
  };

  const handleToggleDetail = (data: TagOfProduct | null) => {
    if (data) {
      setDataDetail(data);
      setIsDetailModal(true);
    } else {
      setIsDetailModal(false);
      setDataDetail(null);
    }
  };

  const handleSort = ({ type }: { type: "title" | "date" | "status" }) => {
    let nextSort: "ASC" | "DESC" | "" = "";

    switch (type) {
      case "title":
        nextSort =
          sortTitleType === "Off"
            ? "ASC"
            : sortTitleType === "ASC"
            ? "DESC"
            : "";
        setSortTitleType(nextSort === "" ? "Off" : nextSort);
        setSortDateType("Off");
        setSortStatusType("Off");
        setSortField(nextSort === "" ? "" : "title");
        setSortOrder(nextSort);
        break;
      case "date":
        nextSort =
          sortDateType === "Off" ? "ASC" : sortDateType === "ASC" ? "DESC" : "";
        setSortDateType(nextSort === "" ? "Off" : nextSort);
        setSortTitleType("Off");
        setSortStatusType("Off");
        setSortField(nextSort === "" ? "" : "createdAt");
        setSortOrder(nextSort);
        break;
      case "status":
        nextSort =
          sortStatusType === "Off"
            ? "ASC"
            : sortStatusType === "ASC"
            ? "DESC"
            : "";
        setSortStatusType(nextSort === "" ? "Off" : nextSort);
        setSortTitleType("Off");
        setSortDateType("Off");
        setSortField(nextSort === "" ? "" : "status");
        setSortOrder(nextSort);
        break;
    }
  };

  const handleSearch = () => {
    setHeaderParams((prev) => {
      const newBody = { ...prev.body, title: valueSearchTitle };
      if (JSON.stringify(prev.body) === JSON.stringify(newBody)) return prev;

      return {
        ...prev,
        page: 1,
        body: newBody,
      };
    });
  };

  const handleChangePage = (value: number) => {
    setHeaderParams((prev) => {
      if (prev.page === value) return prev; // tránh tạo object mới
      return {
        ...prev,
        page: value,
      };
    });
  };

  useEffect(() => {
    setHeaderParams((prev) => ({
      ...prev,
      page: 1,
      body: {
        ...prev.body,
        typeSort: sortField,
        isDesc: sortOrder === "DESC",
      },
    }));
  }, [sortField, sortOrder]);

  useEffect(() => {
    function changeValueSearch() {
      handleSearch();
    }

    const debounced = debounce(changeValueSearch, 500);
    debounced();
    return () => {
      debounced.cancel();
    };
  });

  return (
    <>
      <table className="table-auto w-full border-gray-200 rounded-xl ">
        <thead>
          <tr className="bg-blue-100 dark:bg-gray-700 text-left dark:border-b dark:border-gray-400 dark:border-collapse">
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 text-center">
              {paging?.totalRows}
            </th>
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[34%] text-center">
              <div className="w-full flex flex-row items-center gap-x-1">
                <ButtonSearch
                  onClick={() => setIsSeachTitle(!isSearchTitle)}
                  isOpen={false}
                />
                {isSearchTitle ? (
                  <input
                    ref={inputRef}
                    className=" w-full text-sm px-1 py-[1px] border border-gray-300 rounded"
                    type="text"
                    placeholder="search.."
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setValueSearchTitle(e.target.value)
                    }
                    value={valueSearchTitle}
                  />
                ) : (
                  <span className="w-full">Tên</span>
                )}
                <ButtonSort
                  value={sortTitleType}
                  onClick={() => {
                    handleSort({ type: "title" });
                    setSortDateType("Off");
                    setSortStatusType("Off");
                  }}
                ></ButtonSort>
              </div>
            </th>
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[27%]  text-center">
              <div className="w-full flex flex-row items-center gap-x-1">
                <span className="flex-1">Ngày tạo</span>
                <ButtonSort
                  value={sortDateType}
                  onClick={() => {
                    handleSort({ type: "date" });
                    setSortTitleType("Off");
                    setSortStatusType("Off");
                  }}
                ></ButtonSort>
              </div>
            </th>
            <th className="px-4 py-2 w-[27%] text-center">
              <div className="w-full flex flex-row items-center gap-x-1">
                <span className="flex-1">Trạng thái</span>
                <ButtonSort
                  value={sortStatusType}
                  onClick={() => {
                    handleSort({ type: "status" });
                    setSortTitleType("Off");
                    setSortDateType("Off");
                  }}
                ></ButtonSort>
              </div>
            </th>

            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[12%]"></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <LoadingSpinner size={30} borderSize={10} />
          ) : (
            <>
              {data &&
                data.map((item, index) => (
                  <tr
                    key={item.id}
                    className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-800 dark:even:bg-gray-800 dark:border-b dark:border-gray-400 dark:border-collapse text-center"
                  >
                    <td className="px-4 py-2 font-semibold">
                      {paging && index + 1 + paging?.startIndex}
                    </td>
                    <td className="px-4 py-2">{item.title}</td>
                    <td className="px-4 py-2">
                      {item?.createdAt
                        ? new Date(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (item.createdAt as any).toDate
                              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                (item.createdAt as any).toDate()
                              : item.createdAt
                          ).toLocaleString("vi-VI", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : ""}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {item.status === StatusEnum.Active ? (
                        <LabelStatus type="success">Kích hoạt</LabelStatus>
                      ) : (
                        <LabelStatus type="danger">Không kích hoạt</LabelStatus>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-x-2 justify-center">
                        <ActionView onClick={() => handleToggleDetail(item)} />
                        <ActionEdit
                          onClick={() => handleToggleUpdate(item.id)}
                        />
                        <ActionDelete
                          onClick={() => handleToggleDelete(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>
      {paging && (
        <Paging
          page={paging.curPage}
          totalPage={paging.totalPage}
          handleChangePage={handleChangePage}
        >
          <Limit
            limit={paging.limitPage}
            handleSelectLimit={handleChangeLimit}
          ></Limit>
        </Paging>
      )}

      <ConfirmDialog
        isOpen={isConfirmDelete}
        onConfirm={handleDelete}
        onCancel={() => handleToggleDelete(null)}
        buttonConfirmTitle="Xóa"
        typeButton="danger"
        isLoading={loadingDelete}
      />

      {idUpdate && (
        <PopupModal
          isOpen={isUpdateModal}
          onCancel={() => {
            handleToggleUpdate();
          }}
          buttonCancelTitle="Hủy"
          title="Sửa Tag"
        >
          <TagOfProductUpdate
            id={idUpdate}
            onClick={() => {
              handleToggleUpdate();
              if (handleResetData) handleResetData();
            }}
          />
        </PopupModal>
      )}

      {dataDetail && (
        <PopupModal
          isOpen={isDetailModal}
          onCancel={() => handleToggleDetail(null)}
          buttonCancelTitle="Trở lại"
          title="Chi tiết tag"
        >
          <TagOfProductDetail data={dataDetail} />
        </PopupModal>
      )}
    </>
  );
};

export default TagOfProductTable;
