import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/hook";
import { currentUrlApi } from "../../stores/api/axiosInstance";
import {
  handleImageDeleteAsync,
  handleImageUploadAsync,
} from "../../stores/handles";
import type { ImageUploadProps } from "../../utils/interface";
import { IconImageDefault } from "../icons";
import { useRef, useState } from "react";
import { LoadingSpinner } from "../loading";

const ImageUpload = ({ image, setImage }: ImageUploadProps) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const parrentClass =
    "w-full border rounded-lg flex py-2 px-4 items-center gap-x-4 dark:hover:bg-gray-800";

  const baseButtonClassActive = "bg-gray-50 dark:bg-gray-800 cursor-pointer";
  const baseButtonClassDisable = "bg-gray-200 dark:bg-gray-800";

  if (image?.imageUrl) {
    const handleClickDelete = async () => {
      if (isLoading) return;
      setIsLoading(true);
      const res = await dispatch(handleImageDeleteAsync(image));
      try {
        if (res) {
          if (res.meta.requestStatus === "rejected") {
            toast.error("connecting server error!");
          }
          if (res.meta.requestStatus === "fulfilled") {
            setImage({ id: "", imageUrl: "" });
          }
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Đã xảy ra lỗi khi xóa ảnh!");
      } finally {
        setIsLoading(false);
      }
    };

    const split = image.imageUrl.split("/");

    const classNameActive = `${baseButtonClassActive} text-red-400 dark:text-red-300 border-red-400 dark:border-red-300 hover:bg-red-100 dark:hover:bg-red-400`;

    const classNameDisable = `${baseButtonClassDisable} text-blue-400 dark:text-blue-700 border-blue-400 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-400`;

    const className = `items-center justify-center mx-auto rounded-lg text-sm font-semibold py-1 px-6 border ${
      isLoading ? classNameDisable : classNameActive
    }`;

    return (
      <div
        onClick={handleClickDelete}
        className={`${parrentClass} hover:bg-gray-100 hover:border-red-400  ${
          isLoading ? "" : "cursor-pointer"
        } `}
      >
        <img
          width={30}
          height={0}
          src={`${currentUrlApi}/Global/get-image?imageUrl=${image.imageUrl}`}
        />

        <div className="flex-1 flex flex-row gap-x-2 items-center">
          <span className="text-gray-600 font-semibold">
            {split[split.length - 1]}
          </span>
        </div>
        <button onClick={handleClickDelete} type="button" className={className}>
          {isLoading ? (
            <LoadingSpinner
              color="outline"
              size={20}
              borderSize={6}
            ></LoadingSpinner>
          ) : (
            "Xóa ảnh"
          )}
        </button>
      </div>
    );
  } else {
    const handleClickAdd = () => {
      if (isLoading) return;
      inputRef.current?.click();
    };

    const handleImageChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (isLoading) return;

      setIsLoading(true);

      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSizeMB = 10;

      if (!validTypes.includes(file.type)) {
        alert("Chỉ chấp nhận các định dạng ảnh: JPG, PNG, WEBP.");
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        alert("Dung lượng tối đa là 10MB.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("File", file);

        const res = await dispatch(
          handleImageUploadAsync({
            formData,
            onProgress: (percent) => setUploadProgress(percent),
          })
        );

        if (res) {
          if (res.meta.requestStatus === "rejected") {
            toast.error("connecting server error!");
            setImage({ id: "", imageUrl: "" });
          }
          if (res.meta.requestStatus === "fulfilled") {
            const data = res.payload;
            toast.success("Tải ảnh thành công!");
            setImage({ id: data.data.id, imageUrl: data.data.imageUrl });
          }
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Đã xảy ra lỗi khi tải ảnh lên!");
      } finally {
        setIsLoading(false);
      }
    };

    const classNameActive = `${baseButtonClassActive} text-blue-400 dark:text-blue-700 border-blue-400 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-400`;

    const classNameDisable = `${baseButtonClassDisable} text-blue-400 dark:text-blue-700 border-blue-400 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-400`;

    const className = `items-center justify-center mx-auto rounded-lg text-sm font-semibold border py-1 px-6 ${
      isLoading ? classNameDisable : classNameActive
    }`;

    return (
      <div
        onClick={handleClickAdd}
        className={`${parrentClass} hover:bg-gray-100 hover:border-blue-400 ${
          isLoading ? "" : "cursor-pointer"
        }  relative`}
      >
        {/* progress bar */}
        {uploadProgress > 0 && uploadProgress < 100 && isLoading && (
          <div className="bottom-0 left-0 right-0 absolute px-[2px]">
            <div
              className="bg-blue-500 h-[4px] rounded transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <IconImageDefault></IconImageDefault>

        <div className="flex-1 flex flex-row gap-x-2 items-center">
          <span className="text-gray-600 font-semibold">Chọn file</span>
          <span className="text-gray-400 font-semibold text-xs">(~10MB)</span>
        </div>
        <button type="button" className={className}>
          {isLoading ? (
            <LoadingSpinner
              color="outline"
              size={20}
              borderSize={6}
            ></LoadingSpinner>
          ) : (
            "Chọn ảnh"
          )}
        </button>
      </div>
    );
  }
};

export default ImageUpload;
