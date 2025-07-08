import { useEffect, useState, useRef } from "react";
import Heading from "../../components/layouts/Heading";
import DashboardBody from "../../components/layouts/DashboardBody";
import { ActionDelete, ActionEdit, ActionView } from "../../components/action";
import { useNavigate } from "react-router-dom";
import { adminSideBarMenuPath } from "../../utils/constants";
import LoadingComponent from "../../components/layouts/LoadingComponent";
import type {
  CategoryRes,
  Pagin,
  ResponseList,
  ResponseResult,
} from "../../utils/responseUtils";
import type {
  CategoryFilter,
  DeletedRes,
  FilterListPayload,
} from "../../utils/requestUtils";
import { useAppDispatch } from "../../hooks/hook";
import { toast } from "react-toastify";
import { currentUrlApi } from "../../stores/api/axiosInstance";
import LabelStatus from "../../components/label/LabelStatus";
import ButtonSort from "../../components/buttons/ButtonSort";
import { ButtonSearch } from "../../components/buttons";
import debounce from "lodash/debounce";
import Paging from "../../paging/Paging";
import { Limit } from "../../paging";
import LoadingSkeleton from "../../components/loading/LoadingSkeleton";
import {
  handleCategoryDeleteAsync,
  handleCategoryGetListAsync,
} from "../../stores/handles";
import { ConfirmDialog, PopupModal } from "../../components/modals";
import CategoryDetail from "./CategoryDetail";

const CategoriesManager = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [contentLoading, setContentLoadng] = useState(false);
  const [categoryList, setCategoryList] = useState<CategoryRes[] | null>(null);
  const [headerParams, setHeaderParams] = useState<
    FilterListPayload<CategoryFilter>
  >({
    limit: 10,
    page: 1,
    body: {
      title: "",
      status: undefined,
      isDesc: false,
      typeSort: "",
    },
  });
  const [pagin, setPagin] = useState<Pagin | null>(null);
  const [sortTitleType, setSortTitleType] = useState<"Off" | "ASC" | "DESC">(
    "Off"
  );
  const [isInputSearch, setIsInputSearch] = useState<boolean>(false);
  const [inputSearchValue, setInputSearchValue] = useState<string>("");
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string[] | null>([]);
  const [isDetailModal, setIsDetailModal] = useState<boolean>(false);
  const [itemDetail, setItemDetail] = useState<CategoryRes>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNavigateAdd = () => {
    navigate(`../${adminSideBarMenuPath.CategoryAdd}`);
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

  const handleSort = ({
    type,
    value,
  }: {
    type: "setSort" | "setTitle";
    value: string;
  }) => {
    switch (type) {
      case "setSort":
        setSortTitleType((prev) => {
          const nextSort =
            prev === "Off" ? "ASC" : prev === "ASC" ? "DESC" : "Off";

          setHeaderParams((prev) => ({
            ...prev,
            page: 1,
            body: {
              ...prev.body,
              typeSort: nextSort === "Off" ? "" : value,
              isDesc: nextSort === "DESC",
            },
          }));

          return nextSort;
        });
        break;
      case "setTitle":
        setHeaderParams((prev) => {
          const newBody = { ...prev.body, title: value };
          if (JSON.stringify(prev.body) === JSON.stringify(newBody))
            return prev;

          return {
            ...prev,
            page: 1,
            body: newBody,
          };
        });
        break;
      default:
        break;
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchValue(e.target.value);
  };

  const handleToggleSearch = () => {
    setIsInputSearch((prev) => !prev);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    if (loadingSubmit) return;

    setLoadingSubmit(true);

    const res = await dispatch(handleCategoryDeleteAsync(selectedId));

    if (res) {
      if (res.meta.requestStatus === "rejected") {
        toast.error("connecting server error!");
        setLoadingSubmit(false);
      }
      if (res.meta.requestStatus === "fulfilled") {
        const resData = res.payload as ResponseResult<DeletedRes>;
        if (resData.retCode === 0) {
          toast.success("Xóa danh mục thành công!");
          fetchCategory();
          setLoadingSubmit(false);
        } else {
          toast.error(resData.retText);
          setLoadingSubmit(false);
        }
      }
    }

    setIsConfirmDelete(false);
    setSelectedId([]);
  };

  async function fetchCategory() {
    const payload: FilterListPayload<CategoryFilter> = headerParams;
    setContentLoadng(true);
    setCategoryList(null);

    try {
      const res = (await dispatch(
        handleCategoryGetListAsync(payload)
      ).unwrap()) as ResponseResult<ResponseList<CategoryRes[]>>;
      if (res) {
        if (res.retCode === 0) {
          setCategoryList(res.data.listData);
          setPagin(res.data.paging);
          setLoading(false);
          setContentLoadng(false);
        } else {
          toast.error(res.retText);
          setLoading(false);
          setContentLoadng(false);
        }
      } else {
        toast.error("lỗi khi tải dữ liệu!");
        setLoading(false);
        setContentLoadng(false);
      }
    } catch (e) {
      toast.error("Lỗi không xác định!");
      console.log("error: ", e);
      setContentLoadng(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, [headerParams]);

  useEffect(() => {
    function changeValueSearch() {
      handleSort({ type: "setTitle", value: inputSearchValue });
    }

    const debounced = debounce(changeValueSearch, 500);
    debounced();
    return () => {
      debounced.cancel();
    };
  }, [inputSearchValue]);

  useEffect(() => {
    if (isInputSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputSearch]);

  useEffect(() => {
    document.title = "Quản trị | Danh mục";
  }, []);

  if (loading) return <LoadingComponent></LoadingComponent>;

  return (
    <>
      <Heading>Danh mục sản phẩm</Heading>
      <DashboardBody
        title="Danh sách danh mục"
        buttonTitle="Thêm danh mục"
        onClick={handleNavigateAdd}
      >
        <table className="table-auto w-full border-gray-200 rounded-xl ">
          <thead>
            <tr className="bg-blue-100 dark:bg-gray-700 text-left dark:border-b dark:border-gray-400 dark:border-collapse">
              <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 text-center">
                {pagin?.totalRows}
              </th>
              <th className="px-4 py-2 w-[8%] text-center">Ảnh</th>
              <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[18%]">
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
                    <span className="w-full">Tên</span>
                  )}
                  <ButtonSort
                    value={sortTitleType}
                    onClick={() =>
                      handleSort({ type: "setSort", value: "title" })
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
                    value={sortTitleType}
                    onClick={() =>
                      handleSort({ type: "setSort", value: "status" })
                    }
                  ></ButtonSort>
                </div>
              </th>
              <th className="px-4 py-2 border-x border-gray-300 dark:border-gray-600 w-[12%]"></th>
            </tr>
          </thead>
          <tbody>
            {categoryList &&
              categoryList.map((item, index) => (
                <tr
                  key={item.id}
                  className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-800 dark:even:bg-gray-800 dark:border-b dark:border-gray-400 dark:border-collapse"
                >
                  <td className="px-4 py-2 text-center font-semibold">
                    {pagin && pagin?.start + index + 1}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {item.image ? (
                      <>
                        <img
                          src={`${currentUrlApi}/Global/get-image?imageUrl=${item.image}`}
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded-full mx-auto"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src="/images/avt.jpg"
                          alt="avt"
                          className="w-10 h-10 object-cover rounded-full mx-auto"
                        />
                      </>
                    )}
                  </td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.parentCategory?.title}</td>
                  <td className="px-4 py-2">{item?.description}</td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    {item.status === 0 ? (
                      <LabelStatus type="success">Kích hoạt</LabelStatus>
                    ) : (
                      <LabelStatus type="danger">Không kích hoạt</LabelStatus>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-x-2">
                      <ActionView
                        onClick={() => {
                          setIsDetailModal(true);
                          setItemDetail(item);
                        }}
                      />
                      <ActionEdit
                        onClick={() =>
                          navigate(`../category/update?id=${item.id}`)
                        }
                      />
                      <ActionDelete
                        onClick={() => {
                          setIsConfirmDelete(true);
                          setSelectedId((prev) => [...(prev || []), item.id]);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            {contentLoading && (
              <tr className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-gray-800 dark:even:bg-gray-800 dark:border-b dark:border-gray-400 dark:border-collapse">
                <td className="px-4 py-2 text-center font-semibold">
                  <LoadingSkeleton
                    className="rounded-lg"
                    height={30}
                    width={30}
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <LoadingSkeleton
                    className="rounded-full"
                    height={30}
                    width={30}
                  />
                </td>
                <td className="px-4 py-2">
                  <LoadingSkeleton className="rounded-lg" height={30} />
                </td>
                <td className="px-4 py-2">
                  <LoadingSkeleton className="rounded-lg" height={30} />
                </td>
                <td className="px-4 py-2">
                  <LoadingSkeleton className="rounded-lg" height={30} />
                </td>
                <td className="px-4 py-2 text-center">
                  <LoadingSkeleton className="rounded-lg" height={30} />
                </td>
                <td className="px-4 py-2">
                  <LoadingSkeleton className="rounded-lg" height={30} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {pagin && (
          <Paging
            page={pagin.curPage}
            totalPage={pagin.totalPage}
            handleChangePage={handleChangePage}
          >
            <Limit
              limit={headerParams.limit}
              handleSelectLimit={handleChangeLimit}
            ></Limit>
          </Paging>
        )}
      </DashboardBody>
      <ConfirmDialog
        isOpen={isConfirmDelete}
        onConfirm={handleDelete}
        onCancel={() => {
          setIsConfirmDelete(false);
          setSelectedId(null);
        }}
        buttonConfirmTitle="Xóa"
        typeButton="danger"
        isLoading={loadingSubmit}
      />
      {itemDetail && (
        <PopupModal
          isOpen={isDetailModal}
          onCancel={() => setIsDetailModal(false)}
          buttonCancelTitle="Trở lại"
          title="Chi tiết"
        >
          <CategoryDetail item={itemDetail} />
        </PopupModal>
      )}
    </>
  );
};

export default CategoriesManager;
