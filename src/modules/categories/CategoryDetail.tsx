import { useEffect, useState } from "react";
import { currentUrl } from "../../stores/api/axiosInstance";
import type { CategoryDetailProps } from "../../utils/interface";
import { useAppDispatch } from "../../hooks/hook";
import { handleUserGetFromIdAsync } from "../../stores/handles";
import { toast } from "react-toastify";
import type { UserRes } from "../../utils/requestUtils";
import type { ResponseResult } from "../../utils/responseUtils";
import { StatusEnum } from "../../utils/constants";
import { LabelStatus } from "../../components/label";
import SpanTitle from "../../components/span/SpanTitle";
import { LoadingSpinner } from "../../components/loading";
import { formatDate } from "../../utils/handlerUtils";

const CategoryDetail = ({ item }: CategoryDetailProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<UserRes>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const res = await dispatch(handleUserGetFromIdAsync(item.createdBy));

      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connecting server error!");
          setLoading(false);
        }
        if (res.meta.requestStatus === "fulfilled") {
          const data = res.payload as ResponseResult<UserRes>;
          if (data.retCode === 0) {
            setUserCreated(data.data);
          } else {
            toast.error(data.retText);
          }
        }
      }
      setLoading(false);
    }

    fetchData();
  }, [item]);

  if (loading)
    return <LoadingSpinner size={30} borderSize={10}></LoadingSpinner>;
  return (
    <div className="text-gray-700 dark:text-gray-300 grid w-full my-3">
      <SpanTitle className="mx-auto">
        Id: <SpanTitle className="font-bold">{item.id}</SpanTitle>
      </SpanTitle>
      <div className="mt-2 mx-auto">
        <img
          src={`${currentUrl}/uploads/${item.image}`}
          alt={item.image}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>
      <div className="mt-2 flex gap-x-4 mx-auto">
        <SpanTitle>
          Tên danh mục: <span className="font-bold">{item.title}</span>
        </SpanTitle>
        {item.parentCategory && (
          <SpanTitle>
            Cha: <span className="font-bold">{item.parentCategory.title}</span>
          </SpanTitle>
        )}
      </div>
      {item.description && (
        <div className="mt-2 mx-auto w-full text-center px-4">
          <div>{item.description}</div>
        </div>
      )}
      <div className="mt-2 mx-auto">
        <SpanTitle>
          Trạng thái:{" "}
          {item.status === StatusEnum.Active ? (
            <LabelStatus type="success">Kích hoạt</LabelStatus>
          ) : (
            <LabelStatus type="danger">Không kích hoạt</LabelStatus>
          )}
        </SpanTitle>
      </div>
      <div className="mt-2 mx-auto flex gap-x-4">
        <SpanTitle>
          Ngày tạo:{" "}
          <SpanTitle className="font-bold">
            {formatDate(item.createdAt)}
          </SpanTitle>
        </SpanTitle>
        <SpanTitle>
          Người tạo:{" "}
          <SpanTitle className="font-bold">
            {userCreated?.fullName?.trim()
              ? userCreated.fullName
              : userCreated?.userName}
          </SpanTitle>
        </SpanTitle>
      </div>
    </div>
  );
};

export default CategoryDetail;
