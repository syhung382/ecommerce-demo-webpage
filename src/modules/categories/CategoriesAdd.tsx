import { useEffect, useRef, useState } from "react";
import Heading from "../../components/layouts/Heading";
import DashboardBody from "../../components/layouts/DashboardBody";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { CategoryReq } from "../../utils/requestUtils";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import DashboardButton from "../../components/buttons/DashboardButton";
import type {
  Category,
  ImageRes,
  ResponseResult,
} from "../../utils/responseUtils";
import { useAppDispatch } from "../../hooks/hook";
import { toast } from "react-toastify";
import CategoryParentDropdown from "./CategoryParentDropdown";
import RadioInput from "../../components/input/RadioInput";
import { IconRequired } from "../../components/icons";
import { LoadingSpinner } from "../../components/loading";
import ImageSelect from "../../components/upload/ImageSelect";
import { PopupModal } from "../../components/modals";
import ImageSelectOne from "../library/ImageSelectOne";
import { handleCategoryAddNewAsync } from "../../api/handle/handleCategories";

const schema = yup.object({
  title: yup
    .string()
    .required("Vui lòng nhập tiêu đề!")
    .min(4, "Tiêu đề phải ít nhất 4 ký tự!"),
});

const CategoriesAdd = () => {
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [itemDropdown, setItemDropdown] = useState<Category | null>(null);
  const [isSelectImage, setIsSelectImage] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<string>();
  const [status, setStatus] = useState<0 | 1>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageSelectRef = useRef<any>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryReq>({
    mode: "onSubmit",
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const handleBack = () => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleAddSubmit = async (value: CategoryReq) => {
    setLoadingSubmit(true);
    const request: CategoryReq = {
      title: value.title,
      description: value.description,
      status: status,
      deleteFlag: false,
    };

    if (itemDropdown) {
      request.parentId = itemDropdown.id;
    }
    if (imageSelected) {
      request.image = imageSelected;
    }

    try {
      const res = await dispatch(handleCategoryAddNewAsync(request));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connect server error!");
          setLoadingSubmit(false);
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<string>;
          if (resData.retCode === 0) {
            toast.success("Thêm mới danh mục thành công!");
            navigate(-1);
            setLoadingSubmit(false);
          } else {
            toast.error(resData.retText);
            setLoadingSubmit(false);
          }
        }
      }
    } catch (e) {
      toast.error("Đã xảy ra lỗi khi thêm danh mục!");
      console.log("error: ", e);
      setLoadingSubmit(false);
    }
  };

  const handleToggleSelectImage = () => {
    if (imageSelected) {
      setImageSelected(undefined);
    } else {
      setIsSelectImage(!isSelectImage);
    }
  };

  const handleConfirmImageSelected = (value: ImageRes) => {
    setImageSelected(value.imageUrl);
    setIsSelectImage(false);
  };

  const handlePopupConfirm = () => {
    if (imageSelectRef.current) {
      imageSelectRef.current.confirmSelected();
    }
  };

  const handleItemSelected = (value: Category) => {
    setItemDropdown(value);
  };

  useEffect(() => {
    document.title = "Quản trị | Thêm mới danh mục";
  }, []);

  return (
    <>
      <Heading>Danh mục sản phẩm</Heading>
      <DashboardBody
        title="Thêm mới"
        buttonTitle="Trở lại"
        buttonColor="secondary"
        onClick={handleBack}
      >
        <form autoComplete="off" onSubmit={handleSubmit(handleAddSubmit)}>
          <div className="flex flex-row w-full gap-x-4">
            <Field>
              <Label htmlFor="title">
                Tên danh mục <IconRequired />
              </Label>
              <Input
                name="title"
                control={control}
                placeholder="Tên danh mục sản phẩm.."
              />
              {errors.title && (
                <ul className="text-red-500 text-xs mb-2 list-inside">
                  {Array.isArray(errors.title.types)
                    ? errors.title.types.map((err, i) => <li key={i}>{err}</li>)
                    : errors.title.message && <li>{errors.title.message}</li>}
                </ul>
              )}
            </Field>
            <Field>
              <Label htmlFor="description">Mô tả</Label>
              <Input
                name="description"
                control={control}
                placeholder="Mô tả.."
              />
            </Field>
          </div>
          <div className="flex flex-row w-full gap-x-4">
            <Field>
              <Label>
                Cấp cha <IconRequired />
              </Label>
              <CategoryParentDropdown
                itemDropdown={itemDropdown}
                handleItemSelected={handleItemSelected}
              ></CategoryParentDropdown>
            </Field>

            <Field>
              <Label>Hình ảnh</Label>
              <ImageSelect
                image={imageSelected}
                onClick={handleToggleSelectImage}
              ></ImageSelect>
            </Field>
          </div>
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
            <DashboardButton isLoading={loadingSubmit} type="submit">
              {loadingSubmit ? (
                <LoadingSpinner size={20} borderSize={5}></LoadingSpinner>
              ) : (
                "Thêm mới"
              )}
            </DashboardButton>
          </Field>
        </form>
      </DashboardBody>
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
    </>
  );
};

export default CategoriesAdd;
