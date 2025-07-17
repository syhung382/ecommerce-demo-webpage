import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { CustomerFormProps } from "../../utils/interface";
import { useForm } from "react-hook-form";
import type { UserReq } from "../../utils/requestUtils";
import {
  GenderEnum,
  RetCodeEnum,
  RoleUserEnum,
  UserBannedEnum,
} from "../../utils/constants";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../hooks/hook";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input, InputPassword, RadioInput } from "../../components/input";
import { IconRequired } from "../../components/icons";
import DashboardButton from "../../components/buttons/DashboardButton";
import ImageSelect from "../../components/upload/ImageSelect";
import type { ImageRes, ResponseResult, User } from "../../utils/responseUtils";
import { PopupModal } from "../../components/modals";
import ImageSelectOne from "../library/ImageSelectOne";
import { LoadingSpinner } from "../../components/loading";
import LoadingComponent from "../../components/layouts/LoadingComponent";
import { toast } from "react-toastify";
import {
  handleCustomerAddAsync,
  handleCustomerDetailAsync,
} from "../../api/handle/handleCustomer";

const schema = yup.object({
  email: yup
    .string()
    .required("Vui lòng nhập email!")
    .email("Email không đúng định dạng!")
    .min(6, "Email phải ít nhất 6 ký tự!"),
  userName: yup
    .string()
    .required("Tên đăng nhập không được để trống!")
    .min(4, "Ít nhất 4 ký tự!")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Tên đăng nhập không chứa khoảng trắng hoặc ký tự đặc biệt!"
    ),
  password: yup
    .string()
    .required("Mật khẩu không được để trống!")
    .min(6, "Mật khẩu ít nhất 6 ký tự!"),
  gender: yup
    .number()
    .required("Vui lòng chọn giới tính!")
    .oneOf([1, 2, 3], "Giới tính không đúng!"),
  role: yup.number().required().oneOf([RoleUserEnum.User, RoleUserEnum.Staff]),
  fullName: yup
    .string()
    .required("Họ tên không được để trống!")
    .max(250, "Nhiều nhất 250 ký tự!"),
  avatar: yup.string().nullable().default(null),
  roleAdmin: yup.number().nullable().default(null),
  id: yup.number().nullable().default(null),
});

const CustomerForm = ({ id, handleSuccess }: CustomerFormProps) => {
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserReq>({
    mode: "onSubmit",
    defaultValues: {
      id: null,
      avatar: "",
      email: "",
      fullName: "",
      gender: 1,
      password: "",
      role: RoleUserEnum.User,
      roleAdmin: null,
      userName: "",
    },
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  //loading
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  //conditions
  const [isSelectImage, setIsSelectImage] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [formType, setFormType] = useState<"add" | "update">("add");

  //form value
  const [imageSelected, setImageSelected] = useState<string>();
  const [gender, setGender] = useState<number>(1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageSelectRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  //select image
  const handleToggleImageSelect = () => {
    if (imageSelected) {
      setImageSelected("");
    } else {
      setIsSelectImage(!isSelectImage);
    }
  };
  const handleConfirmImageSelected = (value: ImageRes) => {
    setValue("avatar", value.imageUrl);
    setImageSelected(value.imageUrl);
    setIsSelectImage(false);
  };
  const handlePopupConfirm = () => {
    if (imageSelectRef.current) {
      imageSelectRef.current.confirmSelected();
    }
  };

  //change gender
  const handleChangeGender = (value: number) => {
    setGender(value);
    setValue("gender", value);
  };

  //submit
  const handleSubmitForm = async (value: UserReq) => {
    if (loadingSubmit) return;
    setLoadingSubmit(true);

    try {
      if (formType === "add") {
        await handleAddAsync(value);
      }
    } catch (e) {
      toast.error("Lỗi không xác định!");
      console.log("error: ", e);
    } finally {
      setLoadingSubmit(false);
    }
  };
  const handleAddAsync = async (value: UserReq) => {
    const res = await dispatch(handleCustomerAddAsync(value));
    if (res) {
      if (res.meta.requestStatus === "rejected") {
        toast.error("Connect server error!");
      }
      if (res.meta.requestStatus === "fulfilled") {
        const resData = res.payload as ResponseResult<string>;
        if (resData.retCode === 0) {
          toast.success("Thêm khách hàng thành công!");
          handleSuccess();
        } else {
          toast.error(resData.retText);
        }
      }
    }
  };

  const fetchData = async (id: number) => {
    setLoading(true);
    try {
      const res = await dispatch(handleCustomerDetailAsync(id));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connect server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<User>;
          if (resData.retCode === RetCodeEnum.Ok) {
            if (resData.data.isBanned === UserBannedEnum.Banned) {
              setIsDisabled(true);
            }

            reset({
              id: resData.data.id,
              fullName: resData.data.fullName,
              email: resData.data.email,
              userName: resData.data.userName,
              password: "******",
              avatar: resData.data.avatar,
              gender: resData.data.gender,
              role: resData.data.role,
              roleAdmin: resData.data.roleAdmin,
            });
            setImageSelected(resData.data.avatar);
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

  //change form update if have id
  useEffect(() => {
    if (id) {
      setFormType("update");
      fetchData(id);
    }
  }, [id]);

  if (loading) return <LoadingComponent />;

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex flex-row w-full gap-x-4">
          <Field>
            <Label htmlFor="fullName">
              Họ và tên <IconRequired />
            </Label>
            <Input
              control={control}
              name="fullName"
              placeholder="Nhập tên khách hàng"
              max={250}
              disabled={isDisabled}
            />
            {errors.fullName && (
              <ul className="text-red-500 text-xs mb-2 list-inside">
                {Array.isArray(errors.fullName.types)
                  ? errors.fullName.types.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))
                  : errors.fullName.message && (
                      <li>{errors.fullName.message}</li>
                    )}
              </ul>
            )}
          </Field>
          <Field>
            <Label htmlFor="userName">
              Tên đăng nhập <IconRequired />
            </Label>
            <Input
              control={control}
              name="userName"
              disabled={formType === "update"}
              placeholder="Nhập tên đăng nhập"
              max={250}
            />
            {errors.userName && (
              <ul className="text-red-500 text-xs mb-2 list-inside">
                {Array.isArray(errors.userName.types)
                  ? errors.userName.types.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))
                  : errors.userName.message && (
                      <li>{errors.userName.message}</li>
                    )}
              </ul>
            )}
          </Field>
        </div>
        <div className="flex flex-row w-full gap-x-4">
          <Field>
            <Label htmlFor="email">
              Email <IconRequired />
            </Label>
            <Input
              control={control}
              type="email"
              name="email"
              disabled={formType === "update"}
              placeholder="Nhập email"
              max={250}
            />
            {errors.email && (
              <ul className="text-red-500 text-xs mb-2 list-inside">
                {Array.isArray(errors.email.types)
                  ? errors.email.types.map((err, i) => <li key={i}>{err}</li>)
                  : errors.email.message && <li>{errors.email.message}</li>}
              </ul>
            )}
          </Field>

          <Field>
            <Label htmlFor="passwordd">
              Mật khẩu <IconRequired />
            </Label>
            <InputPassword
              control={control}
              disabled={formType === "update"}
              name="password"
              placeholder="Nhập mật khẩu"
              min={6}
              max={250}
            />
            {errors.password && (
              <ul className="text-red-500 text-xs mb-2 list-inside">
                {Array.isArray(errors.password.types)
                  ? errors.password.types.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))
                  : errors.password.message && (
                      <li>{errors.password.message}</li>
                    )}
              </ul>
            )}
          </Field>
        </div>
        <div className="flex flex-row w-full gap-x-4">
          <Field>
            <Label>
              Giới tính <IconRequired />
            </Label>
            <div className="flex flex-row gap-x-4">
              <RadioInput
                name="gender"
                onChange={() => handleChangeGender(GenderEnum.Male)}
                title="Nam"
                value={GenderEnum.Male}
                status={gender}
              ></RadioInput>
              <RadioInput
                name="gender"
                onChange={() => handleChangeGender(GenderEnum.Female)}
                title="Nữ"
                value={GenderEnum.Female}
                status={gender}
              ></RadioInput>
              <RadioInput
                name="gender"
                onChange={() => handleChangeGender(GenderEnum.Other)}
                title="Khác"
                value={GenderEnum.Other}
                status={gender}
              ></RadioInput>
            </div>
          </Field>
          <Field>
            <Label>ảnh đại diện</Label>
            <ImageSelect
              image={imageSelected}
              onClick={handleToggleImageSelect}
              disabled={isDisabled}
            />
          </Field>
        </div>
        <Field>
          <DashboardButton type="submit" disabled={isDisabled}>
            {loadingSubmit ? (
              <LoadingSpinner size={20} borderSize={5}></LoadingSpinner>
            ) : (
              <>{formType === "add" ? "Thêm mới" : "Cập nhật"}</>
            )}
          </DashboardButton>
        </Field>
      </form>
      {isSelectImage && (
        <PopupModal
          isOpen={isSelectImage}
          onCancel={() => setIsSelectImage(false)}
          onConfirm={handlePopupConfirm}
          buttonCancelTitle="Trở lại"
          buttonConfirmTitle="Chọn ảnh"
          typeButton="success"
          title="Chọn ảnh"
        >
          <ImageSelectOne
            ref={imageSelectRef}
            handleSelectConfirm={handleConfirmImageSelected}
          ></ImageSelectOne>
        </PopupModal>
      )}
    </>
  );
};

export default CustomerForm;
