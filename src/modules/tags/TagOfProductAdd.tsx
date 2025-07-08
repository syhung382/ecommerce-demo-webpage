import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { IconRequired } from "../../components/icons";
import RadioInput from "../../components/input/RadioInput";
import DashboardButton from "../../components/buttons/DashboardButton";
import { useForm } from "react-hook-form";
import type { TagOfProductReq } from "../../utils/requestUtils";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hook";
import { handleTagOfProductAddNewAsync } from "../../stores/handles";
import { toast } from "react-toastify";
import type { ResponseResult } from "../../utils/responseUtils";
import type { OnClickProps } from "../../utils/interface";
import { LoadingSpinner } from "../../components/loading";

const TagOfProductAdd = ({ onClick }: OnClickProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<0 | 1>(0);
  const [errorTitle, setErrorTitle] = useState<string>("");

  const { control, handleSubmit } = useForm<TagOfProductReq>({
    mode: "onSubmit",
  });

  const dispatch = useAppDispatch();

  const handleAdd = async (value: TagOfProductReq) => {
    setErrorTitle("");
    if (loading) return;
    setLoading(true);

    if (
      value.title === null ||
      value.title === undefined ||
      value.title.trim() === ""
    ) {
      setErrorTitle("Tên không được để trống!");
      setLoading(false);
      return;
    }

    const req: TagOfProductReq = {
      title: value.title,
      status: status,
      deleteFlag: false,
    };

    const res = await dispatch(handleTagOfProductAddNewAsync(req));

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
    setLoading(false);
    return;
  };

  useEffect(() => {
    document.title = "Quản trị | Thêm mới tag";
  }, []);

  return (
    <>
      <form
        autoComplete="off"
        className="px-10"
        onSubmit={handleSubmit(handleAdd)}
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
            {loading ? (
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

export default TagOfProductAdd;
