import { ButtonSearch, ButtonSort } from "../../components/buttons";
import { LabelStatus } from "../../components/label";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { Limit, Paging } from "../../paging";
import { useEffect, useState } from "react";
import type {
  Pagin,
  ProductRes,
  ResponseList,
  ResponseResult,
} from "../../utils/responseUtils";
import { formatVND, useAppDispatch } from "../../hooks/hook";
import type { ProductTableProps, TableItemProps } from "../../utils/interface";
import type {
  DeletedRes,
  FilterListPayload,
  ProductFilter,
} from "../../utils/requestUtils";
import LoadingComponent from "../../components/layouts/LoadingComponent";
import { toast } from "react-toastify";
import {
  handleProductDeleteAsync,
  handleProductListAsync,
} from "../../api/handle/handleProducts";
import { adminSideBarMenuPath, StatusEnum } from "../../utils/constants";
import { currentUrlImage } from "../../api/axiosInstance";
import { ConfirmDialog } from "../../components/modals";

const ProductTable = ({ navigate }: ProductTableProps) => {
  //loading
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  //conditions
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [sortType, setSortType] = useState<"Off" | "ASC" | "DESC">("Off");
  const [sortField, setSortField] = useState<
    "" | "title" | "price" | "createdAt" | "status"
  >("");

  //data
  const [listData, setListData] = useState<ProductRes[]>([]);
  const [paging, setPaging] = useState<Pagin | null>(null);
  const [deleteIds, setDeleteIds] = useState<string[]>("");

  //filter
  const [headerParams, setHeaderParams] = useState<
    FilterListPayload<ProductFilter>
  >({
    limit: 10,
    page: 1,
    body: {
      title: "",
      categoryId: null,
      startPrice: null,
      endPrice: null,
      status: null,
      isDesc: false,
      typeSort: "",
    },
  });

  const dispatch = useAppDispatch();

  const handleChangeSort = ({
    value,
  }: {
    value: "" | "title" | "price" | "createdAt" | "status";
  }) => {
    let nextSort: "ASC" | "DESC" | "" = "";
    switch (value) {
      case "title":
        if (sortField === value) {
          nextSort =
            sortType === "Off" ? "ASC" : sortType === "ASC" ? "DESC" : "";
        } else {
          nextSort = "ASC";
        }
        setSortType(nextSort === "" ? "Off" : nextSort);
        setSortField(value);
        break;
      case "price":
        if (sortField === value) {
          nextSort =
            sortType === "Off" ? "ASC" : sortType === "ASC" ? "DESC" : "";
        } else {
          nextSort = "ASC";
        }
        setSortType(nextSort === "" ? "Off" : nextSort);
        setSortField(value);
        break;
      case "createdAt":
        if (sortField === value) {
          nextSort =
            sortType === "Off" ? "ASC" : sortType === "ASC" ? "DESC" : "";
        } else {
          nextSort = "ASC";
        }
        setSortType(nextSort === "" ? "Off" : nextSort);
        setSortField(value);
        break;
      case "status":
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
    setHeaderParams((prev) => ({
      ...prev,
      page: 1,
      body: {
        ...prev.body,
        typeSort: sortField,
        isDesc: sortType === "DESC",
      },
    }));
  };

  const handleToggleDelete = (id: string | null) => {
    if (id) {
      setIsDelete(true);
      setDeleteIds((prev) => [...(prev || []), id]);
    } else {
      setIsDelete(false);
      setDeleteIds([]);
    }
  };

  //api
  const fetchData = async () => {
    setLoadingContent(true);

    try {
      const res = await dispatch(handleProductListAsync(headerParams));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connect server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<
            ResponseList<ProductRes[]>
          >;
          if (resData.retCode === 0) {
            setPaging(resData.data.paging);
            setListData(resData.data.listData);
          } else {
            toast.error(resData.retText);
          }
        }
      }
    } catch (e) {
      console.log("error: ", e);
      toast.error("Lỗi không xác định!");
    } finally {
      setLoading(false);
      setLoadingContent(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (loadingDelete) return;
    if (deleteIds.length <= 0) return;
    setLoadingDelete(true);

    try {
      const res = await dispatch(handleProductDeleteAsync(deleteIds));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connect server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<DeletedRes>;

          if (resData.retCode === 0) {
            toast.success("Xóa sản phẩm thành công!");
            fetchData();
          } else {
            toast.error(resData.retText);
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

  useEffect(() => {
    fetchData();
  }, [headerParams]);

  if (loading) return <LoadingComponent></LoadingComponent>;

  return (
    <>
      <table className="table-auto w-full border-gray-200 rounded-xl ">
        <thead>
          <tr className="bg-blue-100 dark:bg-gray-700 text-left dark:border-b dark:border-gray-400 dark:border-collapse">
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 text-center">
              {paging?.totalRows}
            </th>
            <th className="px-4 py-2 w-[7%] text-center">Ảnh</th>
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
                  value={sortField === "title" ? sortType : "Off"}
                  onClick={() => handleChangeSort({ value: "title" })}
                ></ButtonSort>
              </div>
            </th>
            <th className="px-4 py-2 w-[18%]">Danh mục</th>
            <th className="px-4 py-2 text-center border-x border-gray-300 dark:border-gray-600 w-[15%]">
              <div className="w-full flex flex-row items-center gap-x-1">
                <span className="flex-1">Giá</span>
              </div>
            </th>
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[17%] text-center">
              <div className="w-full flex flex-row items-center gap-x-1">
                <span className="flex-1">Ngày tạo</span>
                <ButtonSort
                  value={sortField === "createdAt" ? sortType : "Off"}
                  onClick={() => handleChangeSort({ value: "createdAt" })}
                ></ButtonSort>
              </div>
            </th>
            <th className="px-4 py-2 text-center w-[13%]">
              <div className="w-full flex flex-row items-center gap-x-1">
                <span className="flex-1">Trạng thái</span>
                <ButtonSort
                  value={sortField === "status" ? sortType : "Off"}
                  onClick={() => handleChangeSort({ value: "status" })}
                ></ButtonSort>
              </div>
            </th>
            <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[12%]"></th>
          </tr>
        </thead>
        <tbody>
          {listData &&
            listData.map((item, index) => (
              <TableItem
                index={paging && index + 1 + paging?.startIndex}
                item={item}
                key={item.id}
                navigate={navigate}
                handleDelete={handleToggleDelete}
              />
            ))}
        </tbody>
      </table>
      <Paging page={1} totalPage={1} handleChangePage={() => {}}>
        <Limit limit={10} handleSelectLimit={() => {}}></Limit>
      </Paging>
      <ConfirmDialog
        isOpen={isDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => handleToggleDelete(null)}
        buttonConfirmTitle="Xóa"
        typeButton="danger"
        isLoading={loadingDelete}
      />
    </>
  );
};

const TableItem = ({ item, index, navigate, handleDelete }: TableItemProps) => {
  return (
    <tr className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-800 dark:even:bg-gray-800 dark:border-b dark:border-gray-400 dark:border-collapse">
      <td className="px-4 py-2 text-center font-semibold">{index}</td>
      <td className="px-4 py-2 text-center">
        <img
          src={`${currentUrlImage}${item.image}`}
          alt="avt"
          className="w-10 h-10 object-cover rounded-full mx-auto"
        />
      </td>
      <td className="px-4 py-2">{item.title}</td>
      <td className="px-4 py-2">{item.category.title}</td>
      <td className="px-4 py-2">
        <div className="flex flex-col text-center font-semibold text-sm">
          {item.priceSale ? (
            <>
              <span className="line-through text-gray-400">
                {formatVND(item.price.toString())} đ
              </span>
              <span className="text-red-400">
                {formatVND(item.priceSale.toString())} đ
              </span>
            </>
          ) : (
            <>
              <span className="text-red-400">
                {formatVND(item.price.toString())} đ
              </span>
            </>
          )}
        </div>
      </td>
      <td className="px-4 py-2 text-center">
        {item.createdAt
          ? new Date(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (item.createdAt as any).toDate
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (item.createdAt as any).toDate()
                : item.createdAt
            ).toLocaleString("vi-VI", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : ""}
      </td>
      <td className="px-4 py-2 text-center whitespace-nowrap">
        <LabelStatus type="success">
          {item.status === StatusEnum.Active ? (
            <LabelStatus type="success">Kích hoạt</LabelStatus>
          ) : (
            <LabelStatus type="danger">Không kích hoạt</LabelStatus>
          )}
        </LabelStatus>
      </td>
      <td className="px-4 py-2">
        <div className="flex gap-x-2">
          <ActionView
            onClick={() =>
              navigate(`../${adminSideBarMenuPath.ProductDetail}?id=${item.id}`)
            }
          />
          <ActionEdit
            onClick={() =>
              navigate(`../${adminSideBarMenuPath.ProductUpdate}?id=${item.id}`)
            }
          />
          <ActionDelete onClick={() => handleDelete?.(item.id)} />
        </div>
      </td>
    </tr>
  );
};

export default ProductTable;
