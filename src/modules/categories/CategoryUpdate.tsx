import { useEffect, useRef, useState } from "react";
import Heading from "../../components/layouts/Heading";
import DashboardBody from "../../components/layouts/DashboardBody";
import LoadingComponent from "../../components/layouts/LoadingComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
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
import {
  handleCategoryGetDetailAsync,
  handleCategoryUpdateAsync,
} from "../../api/handle/handleCategories";

const CategoryUpdate = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [itemDropdown, setItemDropdown] = useState<Category | null>(null);

  const [isSelectImage, setIsSelectImage] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<string>();
  const [status, setStatus] = useState<0 | 1>(0);
  const [currentCategory, setCurrentCategory] = useState<Category | null>();

  const [params] = useSearchParams();
  const currentId: string | null = params.get("id");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageSelectRef = useRef<any>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Category>({
    mode: "onSubmit",
  });

  const handleBack = () => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleToggleSelectImage = () => {
    if (imageSelected) {
      setImageSelected(undefined);
    } else {
      setIsSelectImage(!isSelectImage);
    }
  };

  const handlePopupConfirm = () => {
    if (imageSelectRef.current) {
      imageSelectRef.current.confirmSelected();
    }
  };

  const handleConfirmImageSelected = (value: ImageRes) => {
    setImageSelected(value.imageUrl);
    setIsSelectImage(false);
  };

  const handleUpdateSubmit = async (value: Category) => {
    setLoadingSubmit(true);
    if (currentCategory == null) return;
    const request: Category = currentCategory;
    request.title = value.title;
    request.description = value.description;
    request.status = status;

    if (itemDropdown) {
      request.parentId = itemDropdown.id;
    }
    if (imageSelected) {
      request.image = imageSelected;
    }

    try {
      const res = await dispatch(handleCategoryUpdateAsync(request));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connect server error!");
          setLoadingSubmit(false);
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<string>;
          if (resData.retCode === 0) {
            toast.success("cập nhật danh mục thành công!");
            navigate(-1);
            setLoadingSubmit(false);
          } else {
            toast.error(resData.retText);
            setLoadingSubmit(false);
          }
        }
      }
    } catch (e) {
      console.log("error add: ", e);
      toast.error("Đã xảy ra lỗi khi cập nhật danh mục!");
      setLoadingSubmit(false);
    }
  };

  const handleItemSelected = (value: Category) => {
    setItemDropdown(value);
  };

  async function fetchData() {
    if (!currentId) return;

    const res = await dispatch(handleCategoryGetDetailAsync(currentId));

    if (res) {
      if (res.meta.requestStatus === "rejected") {
        toast.error("Connect server error!");
      }
      if (res.meta.requestStatus === "fulfilled") {
        const resData = res.payload as ResponseResult<Category>;
        if (resData.retCode === 0) {
          reset(resData.data);
          setCurrentCategory(resData.data);
          if (resData.data.parentId) {
            fetchParent(resData.data.parentId);
          }
          if (resData.data.image) setImageSelected(resData.data.image);
        } else {
          toast.error(resData.retText);
        }
      }
    }

    setLoading(false);
  }

  const fetchParent = async (id: string) => {
    if (!id) return;

    const res = await dispatch(handleCategoryGetDetailAsync(id));

    if (res) {
      if (res.meta.requestStatus === "rejected") {
        toast.error("Connect server error!");
      }
      if (res.meta.requestStatus === "fulfilled") {
        const resData = res.payload as ResponseResult<Category>;
        if (resData.retCode === 0) {
          setItemDropdown(resData.data);
        } else {
          toast.error(resData.retText);
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentId]);

  useEffect(() => {
    document.title = "Quản trị | Thêm mới danh mục";
  }, []);

  if (!currentId || currentId === "") {
    return;
  }

  if (loading) return <LoadingComponent></LoadingComponent>;

  return (
    <>
      <Heading>Danh mục sản phẩm</Heading>
      <DashboardBody
        title="Thêm mới"
        buttonTitle="Trở lại"
        buttonColor="secondary"
        onClick={handleBack}
      >
        <form autoComplete="off" onSubmit={handleSubmit(handleUpdateSubmit)}>
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
                "Cập nhật"
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

export default CategoryUpdate;
