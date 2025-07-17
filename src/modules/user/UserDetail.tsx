import { toast } from "react-toastify";
import { handleCustomerDetailAsync } from "../../api/handle/handleCustomer";
import type { ResponseResult, User } from "../../utils/responseUtils";
import {
  ActivateEnum,
  adminSideBarMenuPath,
  RetCodeEnum,
  UserBannedEnum,
  UserStatus,
} from "../../utils/constants";
import { useEffect, useState } from "react";
import LoadingComponent from "../../components/layouts/LoadingComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  formatDate,
  formatDateTime,
  getGender,
  useAppDispatch,
} from "../../hooks/hook";
import Heading from "../../components/layouts/Heading";
import DashboardBody from "../../components/layouts/DashboardBody";
import { currentUrlImage } from "../../api/axiosInstance";

const UserDetail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<User>();
  const [user, setUser] = useState<User>();

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

  const fetchData = async (id: number) => {
    setLoading(true);
    try {
      const res = await dispatch(handleCustomerDetailAsync(id));
      if (!res) {
        toast.error("No response received!");
        return;
      }
      if (res.meta.requestStatus === "rejected") {
        toast.error("Connect server error!");
      }
      if (res.meta.requestStatus === "fulfilled") {
        const resData = res.payload as ResponseResult<User>;
        if (resData.retCode === RetCodeEnum.Ok) {
          setData(resData.data);

          //get user created if exist
          if (resData.data.createdBy !== null && resData.data.createdBy != 0) {
            const parentRes = await dispatch(
              handleCustomerDetailAsync(resData.data.createdBy)
            );
            if (parentRes) {
              if (parentRes.meta.requestStatus === "fulfilled") {
                const parentResData = parentRes.payload as ResponseResult<User>;
                if (parentResData.retCode === RetCodeEnum.Ok) {
                  setUser(parentResData.data);
                }
              }
            }
          }
        } else {
          if (resData.retCode === RetCodeEnum.ApiError) {
            console.log(resData.retText);
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

  useEffect(() => {
    if (currentId) {
      const idNumber = Number(currentId);
      if (!isNaN(idNumber)) {
        fetchData(idNumber);
      } else {
        toast.error("Id không hợp lệ!");
        handleBack();
      }
    }
  }, [currentId]);

  if (loading) return <LoadingComponent />;

  return (
    <>
      <Heading>Chi tiết tài khoản</Heading>
      <DashboardBody
        title={`Thành viên`}
        buttonTitle="Trở lại"
        buttonColor="secondary"
        onClick={handleBack}
      >
        <div className="w-full flex flex-row gap-5 items-start">
          <img
            src={`${currentUrlImage}${data?.avatar}`}
            alt={data?.fullName}
            className="w-[150px] h-auto object-contain rounded-md"
          />
          <div className="flex-1 gap-y-2 flex flex-col">
            <div className="flex gap-x-3">
              <span className="font-bold whitespace-nowrap">Họ và tên:</span>
              <span className="text-gray-700 dark:text-gray-400 font-semibold">
                {data?.fullName}
              </span>
              {data?.isBanned === UserBannedEnum.Banned && (
                <span className="text-sm text-red-500 font-bold">
                  Tài khoản bị cấm
                </span>
              )}
            </div>
            <div className="flex gap-x-4">
              <div className="flex gap-x-3">
                <span className="font-bold whitespace-nowrap">Email:</span>
                <span className="text-gray-700 dark:text-gray-400 font-semibold">
                  {data?.email}
                </span>
              </div>
              <div className="flex gap-x-3">
                <span className="text-gray-700 dark:text-gray-400 font-semibold">
                  {data?.isActived === ActivateEnum.IsActivated ? (
                    <span className="text-green-600/80 dark:text-gray-400 font-semibold">
                      Đã xác minh
                    </span>
                  ) : (
                    <span className="text-red-600/80 dark:text-gray-400 font-semibold">
                      Chưa xác minh
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex gap-x-4">
              <div className="flex gap-x-3">
                <span className="font-bold whitespace-nowrap">
                  Tên đăng nhập:
                </span>
                <span className="text-gray-700 dark:text-gray-400 font-semibold">
                  {data?.userName}
                </span>
              </div>
              <div className="flex gap-x-4">
                <span className="font-bold whitespace-nowrap">Giới tính:</span>
                <span className="text-gray-700 dark:text-gray-400 font-semibold">
                  {(data && getGender(data.gender)) || "Undefine"}
                </span>
              </div>
            </div>

            <div className="flex gap-x-4">
              <div className="flex gap-x-3">
                <span className="font-bold whitespace-nowrap">
                  Đăng nhập lần cuối:
                </span>
                <span className="text-gray-700 dark:text-gray-400 font-semibold">
                  {(data?.lastLoginDate && formatDate(data.lastLoginDate)) ||
                    "undefined"}
                </span>
              </div>
              <div className="flex gap-x-4">
                <span className="font-bold whitespace-nowrap">Ngày tạo:</span>
                <span className="text-gray-700 dark:text-gray-400 font-semibold">
                  {(data?.createdAt && formatDateTime(data.createdAt)) ||
                    "undefined"}
                </span>
              </div>
            </div>

            {data?.createdBy !== 0 && user && (
              <div className="flex gap-x-3">
                <span className="font-bold whitespace-nowrap">Người tạo:</span>
                <span
                  onClick={() =>
                    navigate(
                      `../${adminSideBarMenuPath.CustomerDetail}?id=${user.id}`
                    )
                  }
                  className="text-gray-700 dark:text-gray-400 font-semibold hover:text-blue-400 cursor-pointer"
                >
                  {user?.fullName}
                </span>
              </div>
            )}
            <div className="flex gap-x-3">
              <span className="font-bold whitespace-nowrap">Trạng thái:</span>
              {data?.status === UserStatus.Active ? (
                <span className="text-green-700 dark:text-gray-400 font-semibold">
                  Hoạt động
                </span>
              ) : (
                <span className="text-red-700 dark:text-gray-400 font-semibold">
                  Tạm xóa
                </span>
              )}
            </div>
          </div>
        </div>
      </DashboardBody>
    </>
  );
};

export default UserDetail;
