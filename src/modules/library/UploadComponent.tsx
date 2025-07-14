import { useRef, useState } from "react";
import { IconImageDefault } from "../../components/icons";
import { useAppDispatch } from "../../hooks/hook";
import { toast } from "react-toastify";
import type { UploadComponentProps } from "../../utils/interface";
import { handleImageUploadAsync } from "../../api/handle/handleImages";

const UploadComponent = ({
  type = "one",
  handleSuccess,
}: UploadComponentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  //click open file select
  const handleClickAdd = () => {
    if (isLoading) return;
    inputRef.current?.click();
  };

  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSizeMB = 10;

  const validateFile = (file: File) => {
    if (!validTypes.includes(file.type)) {
      toast.error(`"${file.name}" không đúng định dạng ảnh.`);
      return false;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`"${file.name}" vượt quá ${maxSizeMB}MB.`);
      return false;
    }

    return true;
  };

  if (type === "one") {
    const handleImageChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (isLoading) return;

      setIsLoading(true);

      if (!validateFile(file)) {
        setIsLoading(false);
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
            toast.error("Connect server error!");
          }
          if (res.meta.requestStatus === "fulfilled") {
            if (handleSuccess) handleSuccess();
            toast.success("Tải ảnh lên thành công!");
          }
        }
      } catch (e) {
        toast.error("Đã xảy ra lỗi khi tải ảnh lên!");
        console.log("error: ", e);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div
        className={`w-full border rounded-lg flex py-2 px-4 items-center gap-x-4 dark:hover:bg-gray-800/70 hover:bg-gray-100 hover:border-blue-400 cursor-pointer relative`}
        onClick={handleClickAdd}
      >
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="bottom-0 left-0 right-0 absolute px-[4px]">
            <div
              className="border-blue-400 dark:border-blue-600 border-2 h-[2px] rounded transition-all duration-200"
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
        <IconImageDefault width={24}></IconImageDefault>

        <div className="flex-1 flex flex-row gap-x-2 items-center">
          <span className="text-gray-600 font-semibold">Chọn file</span>
          <span className="text-gray-400 font-semibold text-xs">
            ({"<"}10MB)
          </span>
        </div>
        <button
          type="button"
          className="items-center justify-center mx-auto rounded-lg text-sm font-semibold border py-1 px-6 text-blue-400 dark:hover:text-blue-800 dark:text-blue-600 border-blue-400 dark:border-blue-700/70 hover:bg-blue-100 dark:hover:bg-blue-400/50 bg-gray-50 dark:bg-gray-700 cursor-pointer"
        >
          Chọn ảnh
        </button>
      </div>
    );
  } else {
    const handleImageChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      //lấy danh sách file
      const fileList = e.target.files;
      if (!fileList || isLoading) return;
      setIsLoading(true);

      //kiểm tra
      const fileArray = Array.from(fileList).filter(validateFile);
      if (fileArray.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        for (const file of fileArray) {
          const formData = new FormData();
          formData.append("File", file);

          const res = await dispatch(
            handleImageUploadAsync({
              formData,
              onProgress: (percent) => setUploadProgress(percent),
            })
          );

          if (res.meta.requestStatus === "rejected") {
            toast.error(`Tải "${file.name}" thất bại.`);
          }

          if (res.meta.requestStatus === "fulfilled") {
            toast.success(`Tải "${file.name}" thành công!`);
          }
        }

        if (handleSuccess) handleSuccess();
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi tải ảnh.");
        console.error(error);
      } finally {
        e.target.value = "";
        setIsLoading(false);
        setUploadProgress(0);
      }
    };
    return (
      <div
        className={`w-full border rounded-lg flex py-2 px-4 items-center gap-x-4 dark:hover:bg-gray-800/70 hover:bg-gray-100 hover:border-blue-400 cursor-pointer relative`}
        onClick={handleClickAdd}
      >
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="bottom-0 left-0 right-0 absolute px-[4px]">
            <div
              className="border-blue-400 dark:border-blue-600 border-2 h-[2px] rounded transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleImageChange}
        />
        <IconImageDefault width={24}></IconImageDefault>

        <div className="flex-1 flex flex-row gap-x-2 items-center">
          <span className="text-gray-600 font-semibold">Chọn file</span>
          <span className="text-gray-400 font-semibold text-xs">
            ({"<"}10MB)
          </span>
        </div>
        <button
          type="button"
          className="items-center justify-center mx-auto rounded-lg text-sm font-semibold border py-1 px-6 text-blue-400 dark:hover:text-blue-800 dark:text-blue-600 border-blue-400 dark:border-blue-700/70 hover:bg-blue-100 dark:hover:bg-blue-400/50 bg-gray-50 dark:bg-gray-700 cursor-pointer"
        >
          Chọn ảnh
        </button>
      </div>
    );
  }
};

export default UploadComponent;
