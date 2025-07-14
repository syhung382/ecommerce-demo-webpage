import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type {
  FilterListPayload,
  ImageUserFilter,
} from "../../utils/requestUtils";
import type {
  ImageRes,
  Pagin,
  ResponseList,
  ResponseResult,
} from "../../utils/responseUtils";
import { useAppDispatch } from "../../hooks/hook";
import { toast } from "react-toastify";
import { IconUpload } from "../../components/icons";
import MenuButton from "./MenuButton";
import { AnimatePresence, motion } from "framer-motion";
import UploadComponent from "./UploadComponent";
import ImageItem from "./ImageItem";
import type { ItemSelectOneProps } from "../../utils/interface";
import { LoadingSpinner } from "../../components/loading";
import { handleImageGetListByUser } from "../../api/handle/handleImages";

const ImageSelectOne = forwardRef(
  ({ handleSelectConfirm }: ItemSelectOneProps, ref) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [itemSelected, setItemSelected] = useState<ImageRes>();
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [dataList, setDataList] = useState<ImageRes[]>([]);
    const [headerParams, setHeaderParams] = useState<
      FilterListPayload<ImageUserFilter>
    >({
      limit: 10,
      page: 1,
      body: {
        startDate: null,
        endDate: null,
        isDesc: false,
        typeSort: "",
      },
    });
    const [pagin, setPagin] = useState<Pagin>();

    const dispatch = useAppDispatch();

    const handleSelected = (value: ImageRes) => {
      if (value.id === itemSelected?.id) {
        setItemSelected(undefined);
      } else {
        setItemSelected(value);
      }
    };

    const handleConfirm = () => {
      if (itemSelected) {
        handleSelectConfirm(itemSelected);
      }
    };
    useImperativeHandle(ref, () => ({
      confirmSelected: () => {
        handleConfirm();
      },
    }));

    const handleUploadSuccess = () => {
      setDataList([]);
      setHeaderParams({
        limit: 10,
        page: 1,
        body: {
          startDate: null,
          endDate: null,
          isDesc: false,
          typeSort: "",
        },
      });
      setIsUploading(false);
    };

    const fetchData = async () => {
      setIsLoading(true);
      const payload: FilterListPayload<ImageUserFilter> = headerParams;

      try {
        const res = await dispatch(handleImageGetListByUser(payload));
        if (res) {
          if (res.meta.requestStatus === "rejected") {
            toast.error("Connect server error!");
          }
          if (res.meta.requestStatus === "fulfilled") {
            const resData = res.payload as ResponseResult<
              ResponseList<ImageRes[]>
            >;

            if (resData.retCode === 0) {
              setDataList((prev) => [...prev, ...resData.data.listData]);
              setPagin(resData.data.paging);
            } else {
              toast.error(resData.retText);
            }
          }
        }
      } catch (e) {
        toast.error("Lỗi không xác định!");
        console.log("error: ", e);
      }
      setIsLoading(false);
    };

    const handleLoadMore = () => {
      if (isLoading) return;

      setHeaderParams((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    };

    useEffect(() => {
      fetchData();
    }, [headerParams]);

    return (
      <div className="w-full dark:bg-gray-700 rounded-xl flex flex-col">
        <div className="w-full flex gap-x-5 border-b pb-3 px-4 pt-4 border-gray-400">
          <div
            className="flex items-center gap-x-2 p-2 border rounded-lg text-sm font-semibold cursor-pointer"
            onClick={() => setIsUploading(!isUploading)}
          >
            Upload <IconUpload width={16} height={16} />
          </div>
          <div className="flex-1"></div>
          <div className=""></div>
        </div>
        <div className="w-full flex mt-3 pb-4 ">
          <div className="w-[140px] border-r border-gray-400 flex flex-col text-md font-semibold gap-y-3">
            <MenuButton isActive>Thư mục</MenuButton>
            <MenuButton>Thùng rác</MenuButton>
          </div>

          <div className="flex-1 max-h-[400px] overflow-auto">
            <AnimatePresence>
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="my-5 mx-5"
                >
                  <UploadComponent handleSuccess={handleUploadSuccess} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className=" grid grid-cols-5 p-2 gap-3">
              {dataList.map((item) => {
                const selectedItem = item.id === itemSelected?.id;
                return (
                  <ImageItem
                    handleSelected={handleSelected}
                    item={item}
                    key={item.id}
                    isSelected={!!selectedItem}
                  ></ImageItem>
                );
              })}
            </div>
            {pagin && dataList.length < pagin?.totalRows && (
              <div className="w-full grid my-3">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className={`mx-auto border rounded-md px-3 py-1 text-xs font-semibold 
                    ${
                      isLoading
                        ? "text-gray-400 cursor-not-allowed"
                        : " cursor-pointer border-green-500 text-green-500 hover:bg-green-100 dark:text-gray-300 dark:border-gray-400 dark:hover:bg-gray-800/40"
                    }
                    `}
                >
                  {isLoading ? (
                    <LoadingSpinner color="dark" size={15} borderSize={4} />
                  ) : (
                    "Tải thêm"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default ImageSelectOne;
