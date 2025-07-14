import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../../components/layouts/Heading";
import DashboardBody from "../../components/layouts/DashboardBody";
import { formatDate, formatVND, useAppDispatch } from "../../hooks/hook";
import { handleProductDetailAsync } from "../../api/handle/handleProducts";
import { toast } from "react-toastify";
import type { ProductRes, ResponseResult } from "../../utils/responseUtils";
import PageNotFound from "../../pages/PageNotFound";
import LoadingComponent from "../../components/layouts/LoadingComponent";
import { currentUrlImage } from "../../api/axiosInstance";
import ModalViewImage from "../../components/modals/ModalViewImage";
import { handleUserGetFromIdAsync } from "../../api/handle/handleUsers";
import type { UserRes } from "../../utils/requestUtils";
import parse from "html-react-parser";

const ProductDetail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ProductRes>();
  const [user, setUser] = useState<UserRes>();

  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();

  const currentId: string | null = params.get("id");

  const handleBack = () => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleSetImageIndex = (value: number | null) => {
    if (value === null) {
      setCurrentIndex(null);
    } else {
      setCurrentIndex(value);
    }
  };

  const fetchData = async (currentId: string) => {
    setLoading(true);
    try {
      const res = await dispatch(handleProductDetailAsync(currentId));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connect server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<ProductRes>;

          if (resData.retCode === 0) {
            const data = resData.data;
            fetchUser(resData.data.createdBy);
            setData(data);
          } else {
            toast.error(resData.retText);
          }
        }
      }
    } catch (e) {
      toast.error("Lỗi không xác định!");
      console.log("error: ", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (currentUserId: number) => {
    try {
      const res = await dispatch(handleUserGetFromIdAsync(currentUserId));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connect server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<UserRes>;
          if (resData.retCode === 0) {
            setUser(resData.data);
          } else {
            toast.error(resData.retText);
          }
        }
      }
    } catch (e) {
      toast.error("Lỗi khoông xác định");
      console.log("error: ", e);
    }
  };

  useEffect(() => {
    if (currentId) fetchData(currentId);
  }, [currentId]);

  useEffect(() => {
    document.title = "Quản trị | Chi tiết sản phẩm";
  }, []);

  if (!data) return <PageNotFound />;
  if (loading) return <LoadingComponent />;

  return (
    <>
      <Heading>Chi tiết sản phẩm</Heading>
      <DashboardBody
        title={`${data.id}`}
        buttonTitle="Trở lại"
        buttonColor="secondary"
        onClick={handleBack}
      >
        <div className="w-full flex flex-row gap-4 items-start">
          <img
            src={`${currentUrlImage}${data.image}`}
            alt={data.title}
            className="w-[150px] h-auto object-contain rounded-md"
          />
          <div className="flex-1 flex flex-col">
            <div className="flex gap-x-3">
              <span className="font-bold whitespace-nowrap">Tiêu đề:</span>
              <span className="text-gray-700 dark:text-gray-400 font-semibold">
                {data.title}
              </span>
            </div>
            <div className="flex gap-x-4">
              <div className="flex gap-x-3">
                <span className="font-bold whitespace-nowrap">Danh mục:</span>
                <span className="text-gray-700 dark:text-gray-400 font-semibold">
                  {data.category.title}
                </span>
              </div>
              <div className="flex gap-x-4">
                <span className="font-bold whitespace-nowrap">Giá:</span>
                {data.priceSale && data.priceSale > 0 ? (
                  <div className="flex gap-x-3">
                    <span className="text-red-500 dark:text-red-400 font-semibold">
                      {data.priceSale.toString()} đ
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 line-through font-semibold">
                      {data.priceSale.toString()} đ
                    </span>
                  </div>
                ) : (
                  <span className="text-red-500 dark:text-red-400 font-semibold">
                    {formatVND(data.price.toString())} đ
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-x-3">
              <span className="font-bold whitespace-nowrap">Mô tả:</span>
              <span className="text-gray-700 dark:text-gray-400 font-semibold">
                {data.description}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full mt-4 flex gap-x-4 border-t p-4 border-gray-200 dark:border-gray-500">
          <div>
            <span className="font-bold whitespace-nowrap">Ngày tạo: </span>
            <span className="text-gray-700 dark:text-gray-400 font-semibold">
              {formatDate(data.createdAt)}
            </span>
          </div>
          <div>
            <span className="font-bold whitespace-nowrap">Người tạo: </span>
            <span className="text-gray-700 dark:text-gray-400 font-semibold">
              {user?.fullName}
            </span>
          </div>
        </div>
        {data.listProductTag && data.listProductTag.length > 0 && (
          <div className="w-full mt-4 flex flex-wrap gap-x-4 border-t p-4 border-gray-200 dark:border-gray-500">
            <span className="font-bold whitespace-nowrap">Tag:</span>
            {data.listProductTag?.map((item) => (
              <span
                key={item.id}
                className="font-bold px-4 py-2 text-gray-600 dark:text-gray-500 border rounded-md border-gray-300 dark:border-gray-500"
              >
                #{item.tagTitle}
              </span>
            ))}
          </div>
        )}
        {data.listProductImage && data.listProductImage.length > 0 && (
          <div className="w-full mt-4 flex flex-wrap gap-x-4 border-t p-4 border-gray-200 dark:border-gray-500">
            <span className="font-bold whitespace-nowrap">Hình ảnh:</span>
            {data.listProductImage.map((item, index) => (
              <div
                key={item.id}
                className="border border-gray-300 dark:border-gray-500 rounded-lg p-1 cursor-zoom-in"
                onClick={() => handleSetImageIndex(index)}
              >
                <img
                  src={`${currentUrlImage}${item.imageUrl}`}
                  alt={item.imageId}
                  className="h-[70px] w-auto rounded-lg "
                />
              </div>
            ))}
          </div>
        )}
        <div className="w-full mt-4 flex-col flex border-t p-4 border-gray-200 dark:border-gray-500">
          <span className="font-bold whitespace-nowrap">Chi tiết: </span>
          {data.detail && parse(data.detail)}
        </div>
      </DashboardBody>
      {currentIndex !== null && (
        <ModalViewImage
          onClose={() => handleSetImageIndex(null)}
          currentIndex={currentIndex}
          list={data.listProductImage || []}
          onNext={() => handleSetImageIndex(currentIndex + 1)}
          onPrev={() => handleSetImageIndex(currentIndex - 1)}
        />
      )}
    </>
  );
};

export default ProductDetail;
