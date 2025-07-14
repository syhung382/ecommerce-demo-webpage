import { IconCheckCircle } from "../../components/icons";
import type { ImageItemProps } from "../../utils/interface";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/handlerUtils";
import { useAppDispatch } from "../../hooks/hook";
import { toast } from "react-toastify";
import type { ImageInfo } from "../../utils/responseUtils";
import { handleImageView } from "../../api/handle/handleImages";
import { currentUrlImage } from "../../api/axiosInstance";

const ImageItem = ({
  item,
  index,
  isSelected,
  handleSelected,
}: ImageItemProps) => {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);

  const dispatch = useAppDispatch();

  const fetchImageInfo = async (imageUrl: string) => {
    try {
      const res = await dispatch(handleImageView(imageUrl));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connect server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ImageInfo;
          setImageInfo(resData);
        }
      }
    } catch (e) {
      toast.error("Lỗi không xác định!");
      console.log("error: ", e);
    }
  };

  useEffect(() => {
    fetchImageInfo(item.imageUrl);
  }, [item]);

  return (
    <div
      className={`flex flex-col py-3 relative cursor-pointer ${
        isSelected ? "border-3 border-blue-600 dark:border-blue-800" : ""
      } `}
      onClick={() => handleSelected(item)}
    >
      {isSelected && (
        <>
          <IconCheckCircle
            width={20}
            height={20}
            className="absolute bottom-1 right-1 text-blue-600 dark:text-blue-800"
          />
          <span className="absolute top-1 left-1 text-xs font-bold text-blue-600 dark:text-blue-800">
            {index}
          </span>
        </>
      )}
      {imageInfo && imageInfo?.relativePath && (
        <img
          src={currentUrlImage + imageInfo?.relativePath}
          alt="avt"
          className="w-full h-20 object-cover"
        />
      )}

      <div className="px-2 mt-2 grid text-gray-5  text-gray-400 font-semibold text-[12px]">
        <span className="text-[14px] text-gray-800 dark:text-gray-300">
          {imageInfo?.fileName}
        </span>
        <span>{formatDate(item.createdAt)}</span>
        <span>{imageInfo?.sizeInKb} KB</span>
      </div>
    </div>
  );
};

export default ImageItem;
