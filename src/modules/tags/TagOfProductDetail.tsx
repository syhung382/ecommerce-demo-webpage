import { useEffect, useState } from "react";
import type { UserRes } from "../../utils/requestUtils";
import { LoadingSpinner } from "../../components/loading";
import type { TagOfProductDetailProps } from "../../utils/interface";
import { useAppDispatch } from "../../hooks/hook";
import { toast } from "react-toastify";
import type { ResponseResult } from "../../utils/responseUtils";
import SpanTitle from "../../components/span/SpanTitle";
import { StatusEnum } from "../../utils/constants";
import { LabelStatus } from "../../components/label";
import { handleUserGetFromIdAsync } from "../../api/handle/handleUsers";

const TagOfProductDetail = ({ data }: TagOfProductDetailProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<UserRes>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await dispatch(handleUserGetFromIdAsync(data.createdBy));

        if (res) {
          if (res.meta.requestStatus === "rejected") {
            toast.error("Connect server error!");
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
      } catch (e) {
        toast.error("Lỗi không xác định!");
        console.log("error: ", e);
        setLoading(false);
      }
      setLoading(false);
    }

    fetchData();
  }, [data]);

  useEffect(() => {
    document.title = `Quản trị | Chi tiết ${data.title}`;
  }, []);

  if (loading)
    return <LoadingSpinner size={30} borderSize={10}></LoadingSpinner>;
  return (
    <div className="text-gray-700 dark:text-gray-300 grid w-full my-3">
      <SpanTitle className="mx-auto">
        Id: <SpanTitle className="font-bold">{data.id}</SpanTitle>
      </SpanTitle>
      <div className="mt-2 flex gap-x-4 mx-auto">
        <SpanTitle>
          Tên tag: <span className="font-bold">{data.title}</span>
        </SpanTitle>
      </div>
      <div className="mt-2 mx-auto">
        <SpanTitle>
          Trạng thái:{" "}
          {data.status === StatusEnum.Active ? (
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
            {data?.createdAt
              ? new Date(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (data.createdAt as any).toDate
                    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (data.createdAt as any).toDate()
                    : data.createdAt
                ).toLocaleString("vi-VI", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : ""}
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

export default TagOfProductDetail;
