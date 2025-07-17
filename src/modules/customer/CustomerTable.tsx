import { useEffect, useRef, useState } from "react";
import type { CustomerTableProps } from "../../utils/interface";
import type { FilterListPayload, UserFilter } from "../../utils/requestUtils";
import {
  formatDate,
  getGender,
  hidedEmail,
  useAppDispatch,
} from "../../hooks/hook";
import LoadingComponent from "../../components/layouts/LoadingComponent";
import { ButtonSearch, ButtonSort } from "../../components/buttons";
import { LabelStatus } from "../../components/label";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { Limit, Paging } from "../../paging";
import { toast } from "react-toastify";
import {
  handleCustomerDeleteAsync,
  handleCustomerListAsync,
} from "../../api/handle/handleCustomer";
import type {
  DeletedNumberRes,
  Pagin,
  ResponseList,
  ResponseResult,
  User,
} from "../../utils/responseUtils";
import {
  adminSideBarMenuPath,
  RetCodeEnum,
  UserBannedEnum,
  UserStatus,
} from "../../utils/constants";
import { ConfirmDialog } from "../../components/modals";
import { debounce } from "lodash";
import { currentUrlImage } from "../../api/axiosInstance";

const CustomerTable = ({ navigate }: CustomerTableProps) => {
  //loading
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  //conditions
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isInputSearch, setIsInputSearch] = useState<boolean>(false);
  const [sortType, setSortType] = useState<"Off" | "ASC" | "DESC">("Off");
  const [sortField, setSortField] = useState<"" | "lastLoginDate">("");

  //data
  const [listData, setListData] = useState<User[]>([]);
  const [paging, setPaging] = useState<Pagin | null>(null);
  const [deleteIds, setDeleteIds] = useState<number[]>([]);

  //filter
  const [requestParams, setRequestParams] = useState<
    FilterListPayload<UserFilter>
  >({
    limit: 10,
    page: 1,
    body: {
      fullName: "",
      status: null,
      isDesc: false,
      typeSort: "",
    },
  });
  const [inputSearchValue, setInputSearchValue] = useState<string>("");

  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  //sort
  const handleChangeSort = ({ value }: { value: "" | "lastLoginDate" }) => {
    let nextSort: "ASC" | "DESC" | "" = "";
    switch (value) {
      case "lastLoginDate":
        if (sortField === value) {
          nextSort =
            sortType === "Off" ? "ASC" : sortType === "ASC" ? "DESC" : "";
        } else {
          nextSort = "ASC";
        }
        setSortType(nextSort === "" ? "Off" : nextSort);
        setSortField(value);
        break;

      default:
        setSortType("Off");
        setSortField("");
        break;
    }
    setRequestParams((prev) => ({
      ...prev,
      page: 1,
      body: {
        ...prev.body,
        typeSort: sortField,
        isDesc: sortType === "DESC",
      },
    }));
  };

  //search
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchValue(e.target.value);
  };

  const handleToggleSearch = () => {
    setIsInputSearch((prev) => !prev);
  };

  //delete
  const handleToggleDelete = (id: number | null) => {
    if (id) {
      setIsDelete(true);
      setDeleteIds((prev) => [...(prev || []), id]);
    } else {
      setIsDelete(false);
      setDeleteIds([]);
    }
  };
  const handleConfirmDelete = async () => {
    if (loadingDelete) return;
    if (deleteIds.length <= 0) return;
    setLoadingDelete(true);

    try {
      const res = await dispatch(handleCustomerDeleteAsync(deleteIds));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connect server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<DeletedNumberRes>;

          if (resData.retCode === 0) {
            toast.success("Xóa thành viên thành công!");
            fetchData();
          } else {
            if (resData.retCode === RetCodeEnum.ApiError) {
              console.log(resData.retText);
            } else {
              toast.error(resData.retText);
            }
          }
        }
      }
    } catch (e) {
      toast.error("Lỗi không xác định!");
      console.log("error: ", e);
    } finally {
      handleToggleDelete(null);
      setLoadingDelete(false);
    }
  };

  const fetchData = async () => {
    setLoadingContent(true);
    try {
      const res = await dispatch(handleCustomerListAsync(requestParams));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connect server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<ResponseList<User[]>>;
          if (resData.retCode === 0) {
            setListData(resData.data.listData);
            setPaging(resData.data.paging);
          }
        }
      }
    } catch (e) {
      toast.error("Lỗi không xác định!");
      console.log(e);
    } finally {
      setLoadingContent(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInputSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputSearch]);

  useEffect(() => {
    function changeValueSearch() {
      setRequestParams((prev) => {
        const newBody = { ...prev.body, fullName: inputSearchValue };
        if (JSON.stringify(prev.body) === JSON.stringify(newBody)) return prev;

        return {
          ...prev,
          page: 1,
          body: newBody,
        };
      });
    }

    const debounced = debounce(changeValueSearch, 500);
    debounced();
    return () => {
      debounced.cancel();
    };
  }, [inputSearchValue]);

  useEffect(() => {
    fetchData();
  }, [requestParams]);

  if (loading) return <LoadingComponent></LoadingComponent>;

  return (
    <>
      <table className="table-auto w-full border-gray-200 rounded-xl ">
        <thead>
          <tr className="bg-blue-100 dark:bg-gray-700 text-left dark:border-b dark:border-gray-400 dark:border-collapse">
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 text-center">
              {paging?.totalRows}
            </th>
            <th className="px-4 py-2 w-[8%] text-center">Ảnh</th>
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[24%]">
              <div className="w-full flex flex-row items-center gap-x-1">
                <ButtonSearch
                  onClick={handleToggleSearch}
                  isOpen={isInputSearch}
                />
                {isInputSearch ? (
                  <input
                    ref={inputRef}
                    className=" w-full text-sm px-1 py-[1px] border border-gray-300 rounded"
                    type="text"
                    placeholder="search.."
                    onChange={handleChangeInput}
                    value={inputSearchValue}
                  />
                ) : (
                  <span className="w-full">Thông tin</span>
                )}
              </div>
            </th>
            <th className="px-4 py-2 w-[24%]">Email</th>
            <th className="px-4 py-2 text-center border-x border-gray-300 dark:border-gray-600 w-[12%]">
              Giới tính
            </th>
            <th className="px-4 py-2 text-center w-[18%]">Lần cuối</th>
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[14%] text-center">
              <div className="w-full flex flex-row items-center gap-x-1">
                <span className="flex-1">Trạng thái</span>
                <ButtonSort
                  value={sortType}
                  onClick={() => handleChangeSort({ value: "lastLoginDate" })}
                ></ButtonSort>
              </div>
            </th>
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[12%]"></th>
          </tr>
        </thead>
        <tbody>
          {!loadingContent &&
            listData.map((item, index) => (
              <tr
                key={item.id}
                className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-800 dark:even:bg-gray-800 dark:border-b dark:border-gray-400 dark:border-collapse"
              >
                <td className="px-4 py-2 text-center font-semibold">
                  {(paging && paging?.startIndex + 1 + index) || "0"}
                </td>
                <td className="px-4 py-2 text-center">
                  <img
                    src={`${currentUrlImage}${item.avatar}`}
                    alt="avt"
                    className="w-10 h-10 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="px-4 py-2">
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-bold text-md overflow-x-hidden">
                      {item.fullName}
                    </span>
                    <span className="text-gray-600 font-semibold text-sm">
                      {item.userName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2">{hidedEmail(item.email)}</td>
                <td className="px-4 py-2 text-center">
                  {getGender(item.gender)}
                </td>
                <td className="px-4 py-2 text-center">
                  {(item.lastLoginDate && formatDate(item.lastLoginDate)) ||
                    "undefined"}
                </td>
                <td className="px-4 py-2 text-center">
                  {item.isBanned === UserBannedEnum.Banned ? (
                    <LabelStatus type="danger">Bị cấm</LabelStatus>
                  ) : (
                    <>
                      {item.status === UserStatus.Active ? (
                        <LabelStatus type="success">Kích hoạt</LabelStatus>
                      ) : (
                        <LabelStatus type="danger">Tạm xóa</LabelStatus>
                      )}
                    </>
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-x-2">
                    <ActionView
                      onClick={() =>
                        navigate(
                          `../${adminSideBarMenuPath.CustomerDetail}?id=${item.id}`
                        )
                      }
                    />
                    {item.isBanned === UserBannedEnum.No && (
                      <>
                        <ActionEdit
                          onClick={() =>
                            navigate(
                              `../${adminSideBarMenuPath.CustomerUpdate}?id=${item.id}`
                            )
                          }
                        />
                        <ActionDelete
                          onClick={() => handleToggleDelete(item.id)}
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {loadingContent && <LoadingComponent />}
      {paging && (
        <Paging
          page={paging?.curPage}
          totalPage={paging?.totalPage}
          handleChangePage={() => {}}
        >
          <Limit limit={10} handleSelectLimit={() => {}}></Limit>
        </Paging>
      )}

      {isDelete && (
        <ConfirmDialog
          isOpen={isDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => handleToggleDelete(null)}
          buttonConfirmTitle="Xóa"
          typeButton="danger"
          isLoading={loadingDelete}
        />
      )}
    </>
  );
};

export default CustomerTable;
