import axios from "axios";
import { IconCheckCircle } from "../../components/icons";
import type { ImageItemProps } from "../../utils/interface";
import { useEffect, useState } from "react";
import { currentUrl } from "../../stores/api/axiosInstance";
import { formatDate } from "../../utils/handlerUtils";

const ImageItem = ({
  item,
  index,
  isSelected,
  handleSelected,
}: ImageItemProps) => {
  interface ImageInfo {
    fileName: string;
    sizeInBytes: number;
    sizeInKb: number;
    contentType: string;
    relativePath: string;
  }

  const fetchImageInfo = async (imageUrl: string): Promise<ImageInfo> => {
    const response = await axios.get<ImageInfo>(
      "https://localhost:44371/api/Global/get-image",
      {
        params: { imageUrl },
      }
    );
    return response.data;
  };

  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);

  useEffect(() => {
    fetchImageInfo(item.imageUrl).then(setImageInfo).catch(console.error);
  }, []);

  return (
    <div
      className={`flex flex-col py-3 relative cursor-pointer ${
        isSelected ? "border-3 border-blue-600 dark:border-blue-800" : ""
      } `}
      onClick={() => handleSelected(item.id)}
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

      <img
        src={currentUrl + imageInfo?.relativePath}
        alt="avt"
        className="w-full h-20 object-cover"
      />
      <div className="px-2 mt-2 grid text-gray-5  text-gray-400 font-semibold text-[12px]">
        <span className="text-[14px] text-gray-800 dark:text-gray-300">
          {imageInfo && imageInfo?.fileName.length > 14
            ? `${imageInfo?.fileName.slice(0, 14)}..`
            : imageInfo?.fileName}
        </span>
        <span>{formatDate(item.createdAt)}</span>
        <span>{imageInfo?.sizeInKb} KB</span>
      </div>
    </div>
  );
};

export default ImageItem;
