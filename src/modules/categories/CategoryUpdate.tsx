import { useEffect, useState } from "react";
import Heading from "../../components/layouts/Heading";
import DashboardBody from "../../components/layouts/DashboardBody";
import LoadingComponent from "../../components/layouts/LoadingComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { CategoryFilter } from "../../utils/requestUtils";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import DashboardButton from "../../components/buttons/DashboardButton";
import type {
  Category,
  CategoryRes,
  ResponseResult,
  UploadImageRes,
} from "../../utils/responseUtils";
import {
  handleCategoryGetDetailAsync,
  handleCategoryNoParentListAsync,
  handleCategoryUpdateAsync,
} from "../../stores/handles";
import { useAppDispatch } from "../../hooks/hook";
import { toast } from "react-toastify";
import ImageUpload from "../../components/upload/ImageUpload";
import CategoryParentDropdown from "./CategoryParentDropdown";
import RadioInput from "../../components/input/RadioInput";
import { IconRequired } from "../../components/icons";
import { LoadingSpinner } from "../../components/loading";

const CategoryUpdate = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [itemDropdown, setItemDropdown] = useState<CategoryRes | null>(null);
  const [listItemDropdown, setListItemDropdown] = useState<
    CategoryRes[] | null
  >(null);
  const [image, setImage] = useState<UploadImageRes>({ id: "", imageUrl: "" });
  const [status, setStatus] = useState<0 | 1>(0);
  const [currentCategory, setCurrentCategory] = useState<Category | null>();

  const [params] = useSearchParams();
  const currentId: string | null = params.get("id");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    if (image && image.imageUrl) {
      request.image = image.imageUrl;
    }

    try {
      const res = await dispatch(handleCategoryUpdateAsync(request));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("connecting server error!");
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

  async function fetchCategory() {
    const bodyReq: CategoryFilter = {
      title: "",
      status: 0,
      isDesc: false,
      typeSort: "",
    };

    try {
      const res = await dispatch(
        handleCategoryNoParentListAsync(bodyReq)
      ).unwrap();
      if (res) {
        if (res.retCode === 0) {
          if (itemDropdown || currentCategory) {
            let newList = res.data as Category[];

            if (itemDropdown)
              newList = newList.filter((f) => f.id != itemDropdown.id);
            if (currentCategory)
              newList = newList.filter((f) => f.id != currentCategory.id);

            setListItemDropdown(newList);
          } else {
            setListItemDropdown(res.data);
          }
        } else {
          toast.error(res.retText);
        }
      }
    } catch (e) {
      toast.error("Lỗi không xác định");
      console.log("error: ", e);
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (!currentId) return;

      const res = await dispatch(handleCategoryGetDetailAsync(currentId));

      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("connecting server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<Category>;
          if (resData.retCode === 0) {
            reset(resData.data);
            setCurrentCategory(resData.data);
            fetchCategory();
            if (resData.data.image)
              setImage({ ...image, imageUrl: resData.data.image });
          } else {
            toast.error(resData.retText);
          }
        }
      }

      setLoading(false);
    }
    fetchData();
  }, [currentId]);

  useEffect(() => {
    if (!currentCategory?.parentId || !listItemDropdown?.length) return;

    const found = listItemDropdown.find(
      (x) => x.id === currentCategory.parentId
    );
    if (found) setItemDropdown(found);
  }, [listItemDropdown, currentCategory?.parentId]);

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
                listItemDropdown={listItemDropdown}
                setItemDropdown={setItemDropdown}
              ></CategoryParentDropdown>
            </Field>

            <Field>
              <Label>Hình ảnh</Label>
              <ImageUpload image={image} setImage={setImage}></ImageUpload>
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
    </>
  );
};

export default CategoryUpdate;
