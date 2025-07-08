import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { IconRequired } from "../../components/icons";
import RadioInput from "../../components/input/RadioInput";
import DashboardButton from "../../components/buttons/DashboardButton";
import { useForm } from "react-hook-form";
import {
  type TagOfProduct,
  type TagOfProductReq,
} from "../../utils/requestUtils";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hook";
import {
  handleTagOfProductDetail,
  handleTagOfProductUpdateAsync,
} from "../../stores/handles";
import { toast } from "react-toastify";
import type { ResponseResult } from "../../utils/responseUtils";
import { LoadingSpinner } from "../../components/loading";
import type { TagOfProductUpdateProps } from "../../utils/interface";
import { StatusEnum } from "../../utils/constants";

const TagOfProductUpdate = ({ id, onClick }: TagOfProductUpdateProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [status, setStatus] = useState<0 | 1>(0);
  const [errorTitle, setErrorTitle] = useState<string>("");
  const [data, setData] = useState<TagOfProduct>();

  const { control, handleSubmit, reset } = useForm<TagOfProductReq>({
    mode: "onSubmit",
  });

  const dispatch = useAppDispatch();

  const handleUpdate = async (value: TagOfProductReq) => {
    setErrorTitle("");
    if (loadingSubmit) return;
    if (!data) return;
    setLoadingSubmit(true);

    if (
      value.title === null ||
      value.title === undefined ||
      value.title.trim() === ""
    ) {
      setErrorTitle("Tên không được để trống!");
      setLoadingSubmit(false);
      return;
    }

    const req: TagOfProduct = {
      id: data?.id,
      title: value.title,
      status: status,
      deleteFlag: data.deleteFlag,
      createdAt: data.createdAt,
      createdBy: data.createdBy,
    };

    const res = await dispatch(handleTagOfProductUpdateAsync(req));

    if (res) {
      if (res.meta.requestStatus === "rejected") {
        toast.error("Connecting server error!");
      }

      if (res.meta.requestStatus === "fulfilled") {
        const resData = res.payload as ResponseResult<string>;
        if (resData.retCode === 0) {
          toast.success("Thêm tag thành công!");
          if (onClick) onClick();
        } else {
          toast.error(resData.retText);
        }
      }
    }
    setLoadingSubmit(false);
    return;
  };

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await dispatch(handleTagOfProductDetail(id));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connecting server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<TagOfProduct>;

          if (resData.retCode === 0) {
            setData(resData.data);
            reset(resData.data);
            if (resData.data.status === StatusEnum.Active) {
              setStatus(StatusEnum.Active);
            } else {
              setStatus(StatusEnum.InActive);
            }
          } else {
            toast.error(resData.retText);
          }
        }
      }
      setLoading(false);
    } catch (e) {
      toast.error("Lỗi không xác định!");
      console.log("error: ", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    document.title = "Quản trị | Thêm mới tag";
  }, []);

  return (
    <>
      <form
        autoComplete="off"
        className="px-10"
        onSubmit={handleSubmit(handleUpdate)}
      >
        <Field>
          <Label htmlFor="title">
            Tên <IconRequired />
          </Label>
          <Input control={control} name="title" placeholder="Tên tag.." />
          {errorTitle && (
            <ul className="text-red-500 text-xs mb-2 list-inside">error</ul>
          )}
        </Field>
        <div className="flex flex-row w-full gap-x-4">
          <Field>
            <Label>Trạng thái</Label>
            <div className="flex flex-row gap-x-4">
              <RadioInput
                name="status"
                onChange={setStatus}
                title="Kích hoạt"
                value={0}
                status={status}
              ></RadioInput>
              <RadioInput
                name="status"
                onChange={setStatus}
                title="Không kích hoạt"
                value={1}
                status={status}
              ></RadioInput>
            </div>
          </Field>
        </div>
        <Field>
          <DashboardButton type="submit">
            {loadingSubmit ? (
              <LoadingSpinner size={20} borderSize={5}></LoadingSpinner>
            ) : (
              "Thêm mới"
            )}
          </DashboardButton>
        </Field>
      </form>
    </>
  );
};

export default TagOfProductUpdate;
