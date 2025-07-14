import { useForm } from "react-hook-form";
import DashboardButton from "../../components/buttons/DashboardButton";
import { Field } from "../../components/field";
import { IconClose, IconRequired, IconTrash } from "../../components/icons";
import { Input } from "../../components/input";
import RadioInput from "../../components/input/RadioInput";
import { Label } from "../../components/label";
import {
  type InfoProductUpdateImageReq,
  type ProductReq,
  type TagOfProduct,
} from "../../utils/requestUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StatusEnum } from "../../utils/constants";
import type { ProductProps } from "../../utils/interface";
import { useEffect, useRef, useState } from "react";
import type {
  Category,
  ImageRes,
  ProductRes,
  ProductTagRes,
  ResponseResult,
} from "../../utils/responseUtils";
import ImageSelect from "../../components/upload/ImageSelect";
import { PopupModal } from "../../components/modals";
import ImageSelectOne from "../library/ImageSelectOne";
import CategoryParentDropdown from "../categories/CategoryParentDropdown";
import TinyEditor from "../../components/tinyMCE/TinyEditor";
import ImageSelectMulti from "../library/ImageSelectMulti";
import TagOfProductDropdownSelect from "../tags/TagOfProductDropdownSelect";
import { LoadingSpinner } from "../../components/loading";
import { formatVND, parseVND, useAppDispatch } from "../../hooks/hook";
import { toast } from "react-toastify";
import {
  handleProductAddAsync,
  handleProductDetailAsync,
  handleProductUpdateAsync,
} from "../../api/handle/handleProducts";
import { currentUrlImage } from "../../api/axiosInstance";
import LoadingComponent from "../../components/layouts/LoadingComponent";

const schema = yup.object({
  title: yup
    .string()
    .required("Vui lòng nhập tiêu đề!")
    .min(4, "Tiêu đề phải ít nhất 4 ký tự!"),
  categoryId: yup.string().required("Vui lòng chọn danh mục!"),
  price: yup
    .number()
    .required("Giá không được để trống!")
    .min(0, "giá không thể nhỏ hơn 0!"),
  status: yup
    .number()
    .required("Vui lòng chọn trạng thái!")
    .oneOf([StatusEnum.Active, StatusEnum.InActive], "Trạng thái không đúng!"),
});

const ProductForm = ({ id, handleSuccess }: ProductProps) => {
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductReq>({
    mode: "onSubmit",
    defaultValues: {
      id: undefined,
      categoryId: "",
      title: "",
      description: "",
      detail: "",
      image: "",
      price: 0,
      priceSale: 0,
      listTagRes: [],
      listProductImage: [],
      status: StatusEnum.Active,
    },
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  //loading
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  //conditions
  const [isSelectImage, setIsSelectImage] = useState<boolean>(false);
  const [isSelectImageList, setIsSelectImageList] = useState<boolean>(false);

  //form type
  const [formType, setFormType] = useState<"add" | "update">("add");
  const [status, setStatus] = useState<0 | 1>(0);

  //form value
  const [imageSelected, setImageSelected] = useState<string>();
  const [imageListSelected, setImageListSelected] = useState<ImageRes[]>([]);
  const [itemDropdown, setItemDropdown] = useState<Category | null>(null);
  const [detail, setDetail] = useState<string>("");
  const [listTagSelected, setListTagSelected] = useState<ProductTagRes[]>([]);
  const [inputPrice, setInputPrice] = useState<string>("0");
  const [inputPriceSale, setInputPriceSale] = useState<string>("0");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageSelectRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageListSelectRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  //image one selected
  const handleToggleSelectImage = () => {
    if (imageSelected) {
      setImageSelected(undefined);
    } else {
      setIsSelectImage(!isSelectImage);
    }
  };
  const handleConfirmImageSelected = (value: ImageRes) => {
    setValue("image", value.imageUrl);
    setImageSelected(value.imageUrl);
    setIsSelectImage(false);
  };
  const handlePopupConfirm = () => {
    if (imageSelectRef.current) {
      imageSelectRef.current.confirmSelected();
    }
  };

  //image list selected
  const handleToggleSelectImageList = () => {
    setIsSelectImageList(true);
  };
  const handleConfirmImageListSelected = (value: ImageRes[]) => {
    setImageListSelected(value);
    setIsSelectImageList(false);
  };
  const handleListPopupConfirm = () => {
    if (imageListSelectRef.current) {
      imageListSelectRef.current.confirmSelected();
    }
  };
  const handleRemoveImageItem = (item: ImageRes) => {
    const newList = imageListSelected.filter((f) => f.id != item.id);
    setImageListSelected(newList);
  };

  const handleItemSelected = (value: Category) => {
    setItemDropdown(value);
    setValue("categoryId", value.id);
  };
  const handleTagOfProductSelected = (value: TagOfProduct) => {
    setListTagSelected((prev) => [
      ...prev,
      { tagOfProductId: value.id, tagTitle: value.title },
    ]);
  };
  const handleTagRemoveItem = (value: string) => {
    setListTagSelected(
      listTagSelected.filter((f) => f.tagOfProductId !== value)
    );
  };

  const handleAdd = async (value: ProductReq) => {
    const res = await dispatch(handleProductAddAsync(value));
    if (res) {
      if (res.meta.requestStatus === "rejected") {
        toast.error("Connect server error!");
      }
      if (res.meta.requestStatus === "fulfilled") {
        const resData = res.payload as ResponseResult<string>;
        if (resData.retCode === 0) {
          toast.success("Thêm mới danh mục thành công!");
          handleSuccess();
        } else {
          toast.error(resData.retText);
        }
      }
    }
  };

  const handleUpdate = async (value: ProductReq) => {
    const res = await dispatch(handleProductUpdateAsync(value));
    if (res) {
      if (res.meta.requestStatus === "rejected") {
        toast.error("Connect server error!");
      }
      if (res.meta.requestStatus === "fulfilled") {
        const resData = res.payload as ResponseResult<string>;
        if (resData.retCode === 0) {
          toast.success("Chỉnh sửa danh mục thành công!");
          handleSuccess();
        } else {
          toast.error(resData.retText);
        }
      }
    }
  };

  const handleSubmitForm = async (value: ProductReq) => {
    if (loadingSubmit) return;
    setLoadingSubmit(true);

    try {
      if (formType === "add") {
        await handleAdd(value);
      } else {
        await handleUpdate(value);
      }
    } catch (e) {
      console.log("error: ", e);
      toast.error("Lỗi không xác định!");
    }

    setLoadingSubmit(false);
  };

  const handleInputPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const onlyNumbers = raw.replace(/\D/g, ""); // bỏ hết ký tự không phải số
    setInputPrice(formatVND(onlyNumbers));
    setValue("price", parseVND(e.target.value));
  };

  const handleInputPriceSaleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const raw = e.target.value;
    const onlyNumbers = raw.replace(/\D/g, ""); // bỏ hết ký tự không phải số
    setInputPriceSale(formatVND(onlyNumbers));
    setValue("priceSale", parseVND(e.target.value));
  };

  const handleChangeStatus = (value: 0 | 1) => {
    setStatus(value);
    setValue("status", value);
  };

  const handleChangeDetail = (value: string) => {
    setDetail(value);
    setValue("detail", value);
  };

  useEffect(() => {
    const imageReq: InfoProductUpdateImageReq[] = imageListSelected.map(
      (item) => ({
        imageUrl: item.imageUrl,
        imageId: item.id,
      })
    );
    setValue("listProductImage", imageReq);
  }, [imageListSelected]);

  useEffect(() => {
    setValue("listTagRes", listTagSelected);
  }, [listTagSelected]);

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
            setDetail(data.detail || "");
            setImageSelected(data.image);
            setInputPrice(formatVND(data.price.toString()));
            setInputPriceSale(formatVND(data.priceSale?.toString() || "0"));
            setItemDropdown(data.category);

            const listTagRes: ProductTagRes[] = data.listProductTag || [];
            setListTagSelected(listTagRes);

            const listImageRes: ImageRes[] =
              data.listProductImage?.map((item) => ({
                id: item.imageId,
                imageUrl: item.imageUrl,
                createdAt: item.createdAt,
                createdBy: item.createdBy,
                updatedAt: item.updatedAt,
                updatedBy: item.updatedBy,
                deleteFlag: item.deleteFlag,
              })) || [];
            setImageListSelected(listImageRes);

            reset({
              id: data.id,
              title: data.title,
              description: data.description,
              detail: data.detail,
              image: data.image,
              price: data.price,
              priceSale: data.priceSale,
              discountId: data.discountId,
              status: data.status,
              categoryId: data.category.id,
            });
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
    if (id !== null && id !== undefined) {
      fetchData(id);
      setFormType("update");
    }
  }, [id]);

  if (loading) return <LoadingComponent />;

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex flex-row w-full gap-x-4">
          <Field>
            <Label htmlFor="title">
              Tên Sản phẩm <IconRequired />
            </Label>
            <Input
              control={control}
              name="title"
              placeholder="Tên sản phẩm.."
              maxLength={250}
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
              control={control}
              name="description"
              placeholder="Mô tả.."
              maxLength={250}
            />
          </Field>
        </div>
        <div className="flex flex-row w-full gap-x-4">
          <Field>
            <Label htmlFor="price">
              Giá <IconRequired />
            </Label>
            <Input
              control={control}
              type="text"
              inputMode="numeric"
              name="price"
              placeholder="0"
              value={inputPrice}
              maxLength={19}
              onChange={handleInputPriceChange}
            />
            {errors.price && (
              <ul className="text-red-500 text-xs mb-2 list-inside">
                {Array.isArray(errors.price.types)
                  ? errors.price.types.map((err, i) => <li key={i}>{err}</li>)
                  : errors.price.message && <li>{errors.price.message}</li>}
              </ul>
            )}
          </Field>
          <Field>
            <Label htmlFor="priceSale">Giá khuyễn mãi</Label>
            <Input
              control={control}
              name="priceSale"
              placeholder="0"
              type="text"
              value={inputPriceSale}
              onChange={handleInputPriceSaleChange}
            />
          </Field>
        </div>
        <div className="flex flex-row w-full gap-x-4">
          <Field>
            <Label>
              Danh mục <IconRequired />
            </Label>
            <CategoryParentDropdown
              itemDropdown={itemDropdown}
              handleItemSelected={handleItemSelected}
              selectType="product"
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
        <div className="">
          <Field>
            <Label>Chi tiết sản phẩm</Label>
            <TinyEditor
              value={detail}
              onChange={(newValue) => handleChangeDetail(newValue)}
            ></TinyEditor>
          </Field>
        </div>
        <div className="flex flex-row w-full gap-x-4">
          <Field>
            <Label>Danh sách ảnh</Label>
            <div className="w-full flex-col">
              <DashboardButton
                type="button"
                buttonColor="primaryOutline"
                onClick={handleToggleSelectImageList}
              >
                Chọn ảnh
              </DashboardButton>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {imageListSelected &&
                  imageListSelected.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-md border-gray-400 relative"
                    >
                      <IconTrash
                        onClick={() => handleRemoveImageItem(item)}
                        className="bg-red-100 hover:bg-red-30 text-red-400 hover:text-red-600 absolute top-0.5 right-0.5 cursor-pointer rounded-md p-0.5 w-6 z-10"
                      />
                      <div className="relative w-full pt-[100%]">
                        {" "}
                        {/* Tạo tỉ lệ 1:1 */}
                        <img
                          src={`${currentUrlImage}${item.imageUrl}`}
                          alt="avt.jpg"
                          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Field>
          <Field>
            <Label>Chọn tag</Label>
            <div className="w-full flex-col">
              <TagOfProductDropdownSelect
                itemDropdown={listTagSelected}
                handleItemSelected={handleTagOfProductSelected}
              />
              <div className="mt-3 flex-wrap flex gap-3 mx-2">
                {listTagSelected &&
                  listTagSelected.map((item) => (
                    <div
                      key={item.tagOfProductId}
                      className="flex gap-x-2 px-2 py-1 text-center border rounded-md bg-gray-100 dark:bg-gray-700"
                    >
                      <span className="font-bold text-gray-700 dark:text-gray-400">
                        {item.tagTitle}
                      </span>
                      <IconClose
                        width={16}
                        className="text-red-500 cursor-pointer"
                        onClick={() =>
                          handleTagRemoveItem(item.tagOfProductId || "")
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
          </Field>
        </div>
        <div className="flex flex-row w-full gap-x-4">
          <Field>
            <Label>Trạng thái</Label>
            <div className="flex flex-row gap-x-4">
              <RadioInput
                name="status"
                title="Kích hoạt"
                onChange={() => handleChangeStatus(StatusEnum.Active)}
                value={StatusEnum.Active}
                status={status}
              ></RadioInput>
              <RadioInput
                name="status"
                title="Không kích hoạt"
                onChange={() => handleChangeStatus(StatusEnum.InActive)}
                value={StatusEnum.InActive}
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
      {isSelectImageList && (
        <PopupModal
          isOpen={isSelectImageList}
          onCancel={() => setIsSelectImageList(false)}
          onConfirm={handleListPopupConfirm}
          buttonCancelTitle="Trở lại"
          buttonConfirmTitle="Chọn ảnh"
          typeButton="success"
          title="Chọn ảnh"
        >
          <ImageSelectMulti
            defaultImageSelected={imageListSelected}
            ref={imageListSelectRef}
            handleSelectConfirm={handleConfirmImageListSelected}
          ></ImageSelectMulti>
        </PopupModal>
      )}
    </>
  );
};

export default ProductForm;
