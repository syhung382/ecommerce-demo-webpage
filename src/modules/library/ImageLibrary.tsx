import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type {
  ImageRes,
  Pagin,
  ResponseList,
  ResponseResult,
} from "../../utils/responseUtils";
import type {
  FilterListPayload,
  ImageUserFilter,
} from "../../utils/requestUtils";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/hook";
import { handleImageGetListByUser } from "../../stores/handles";
import { IconUpload } from "../../components/icons";
import MenuButton from "./MenuButton";
import UploadComponent from "./UploadComponent";
import ImageItem from "./ImageItem";
import type { ItemSelectedProps } from "../../utils/interface";

const ImageLibrary = () => {
  const [itemSelected, setItemSelected] = useState<ItemSelectedProps[]>([]);
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

  const handleSelected = (value: string) => {
    setItemSelected((prev) => {
      const isExisted = prev.find((item) => item.id === value);

      if (isExisted) {
        const newList = prev.filter((item) => item.id !== value);

        const updatedList = newList.map((item, idx) => ({
          ...item,
          index: idx,
        }));

        return updatedList;
      } else {
        const newItem: ItemSelectedProps = {
          id: value,
          index: prev.length,
        };

        return [...prev, newItem];
      }
    });
  };

  const fetchData = async () => {
    const payload: FilterListPayload<ImageUserFilter> = headerParams;

    try {
      const res = await dispatch(handleImageGetListByUser(payload));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("connecting server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<
            ResponseList<ImageRes[]>
          >;

          if (resData.retCode === 0) {
            setDataList(resData.data.listData);
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
  };

  useEffect(() => {
    fetchData();
  }, [headerParams]);

  return (
    <div className="w-full dark:bg-gray-700 rounded-xl flex flex-col">
      <div className="w-full flex gap-x-5 border-b pb-3 px-4 pt-4  border-gray-400">
        <div
          className="flex items-center gap-x-2 p-2 border rounded-lg text-sm font-semibold cursor-pointer"
          onClick={() => setIsUploading(!isUploading)}
        >
          Upload <IconUpload width={16} height={16} />
        </div>
      </div>
      <div className="w-full flex mt-3 pb-4">
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
                <UploadComponent />
              </motion.div>
            )}
          </AnimatePresence>
          {/* {isUploading && (
            <div className="mt-3 mx-5">
              <UploadComponent></UploadComponent>
            </div>
          )} */}

          <div className=" grid grid-cols-6 p-2 gap-3">
            {dataList.map((item) => {
              const selectedItem = itemSelected.find((f) => f.id === item.id);
              return (
                <ImageItem
                  handleSelected={handleSelected}
                  item={item}
                  index={selectedItem && selectedItem?.index + 1}
                  key={item.id}
                  isSelected={!!selectedItem}
                ></ImageItem>
              );
            })}
          </div>
        </div>
      </div>
      {pagin && (
        <div
          hidden
          onClick={() =>
            setHeaderParams({
              limit: 10,
              page: 1,
              body: {
                startDate: null,
                endDate: null,
                isDesc: false,
                typeSort: "",
              },
            })
          }
        ></div>
      )}
    </div>
  );
};

export default ImageLibrary;
