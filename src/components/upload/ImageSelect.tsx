import { currentUrlImage } from "../../api/axiosInstance";
import type { ImageSelectProps } from "../../utils/interface";
import { IconImageDefault } from "../icons";

const ImageSelect = ({ image, onClick, disabled }: ImageSelectProps) => {
  if (image) {
    const splitUrl = image.split("/");
    const imageName = splitUrl[splitUrl.length - 1];
    return (
      <div
        className={`w-full py-2 border border-gray-300 rounded-md flex px-3 gap-x-3 items-center text-gray-600 dark:text-gray-500 ${
          disabled
            ? "cursor-not-allowed"
            : "cursor-pointer hover:border-red-400 dark:hover:border-red-300 hover:text-red-400 dark:hover:text-red-300"
        }`}
        onClick={disabled ? () => {} : onClick}
      >
        <img
          src={`${currentUrlImage}${image}`}
          alt={image}
          className="object-cover h-[24px]"
        />
        <span className="flex-1 flex text-sm font-semibold gap-x-1">
          {imageName.length > 20 ? `${imageName.slice(0, 18)}..` : imageName}
        </span>
        <button
          type="button"
          className="px-2 py-1 rounded-md text-sm cursor-pointer border border-red-400 hover:bg-red-100 text-red-600 hover:border-red-400 hover:text-red-400 dark:hover:bg-red-700/30 dark:text-red-400 dark:hover:border-red-300 dark:hover:text-red-300"
        >
          Xóa ảnh
        </button>
      </div>
    );
  } else {
    return (
      <div
        className={`w-full py-2 border border-gray-300 rounded-md flex px-3 gap-x-3 items-center text-gray-600 dark:text-gray-500 ${
          disabled
            ? "cursor-not-allowed"
            : "cursor-pointer hover:border-blue-400 dark:hover:border-blue-300 hover:text-blue-400 dark:hover:text-blue-300"
        }`}
        onClick={disabled ? () => {} : onClick}
      >
        <IconImageDefault height={24}></IconImageDefault>
        <span className="flex-1 flex text-sm font-semibold gap-x-1">
          Chọn ảnh <span className="=font-bold">({"<"}10MB)</span>
        </span>
        <button
          type="button"
          className="px-2 py-1 border border-gray-400 rounded-md text-sm cursor-pointer text-gray-600 dark:text-gray-400 hover:border-blue-400 dark:hover:border-blue-300 hover:text-blue-400 dark:hover:text-blue-300"
        >
          Chọn ảnh
        </button>
      </div>
    );
  }
};

export default ImageSelect;
