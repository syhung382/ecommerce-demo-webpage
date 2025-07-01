import { useEffect, useState } from "react";
import Heading from "../../components/layouts/Heading";
import DashboardBody from "../../components/layouts/DashboardBody";
import LoadingComponent from "../../components/layouts/LoadingComponent";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type {
  CategoryFilter,
  CategoryReq,
  FilterListPayload,
} from "../../utils/request";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import DashboardButton from "../../components/buttons/DashboardButton";
import type { CategoryRes } from "../../utils/response";
import {
  Dropdown,
  List,
  Option,
  Search,
  Select,
} from "../../components/dropdown";
import { getListCategoryAsync } from "../../stores/handles";
import { useAppDispatch } from "../../hooks/hook";
import { toast } from "react-toastify";

const schema = yup.object({
  title: yup
    .string()
    .required("Vui lòng nhập tiêu đề!")
    .min(4, "Tiêu đề phải ít nhất 4 ký tự!"),
  status: yup
    .number()
    .transform((originalValue) =>
      originalValue === "0" ? 0 : originalValue === "1" ? 1 : undefined
    )
    .required("Vui lòng chọn trạng thái!")
    .oneOf([0, 1], "Trạng thái chỉ 0 hoặc 1"),
  deleteFlag: yup.boolean().required("Vui lòng chọn trạng thái!"),
});

const CategoriesAdd = () => {
  const [loading, setLoading] = useState(true);
  const [isDropdown, setIsDropdown] = useState(false);
  const [itemDropdown, setItemDropdown] = useState<CategoryRes>();
  const [listItemDropdown, setListItemDropdown] = useState<CategoryRes[]>();
  const [dropdownFilter, setDropdownFilter] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    control,
    // handleSubmit,
    // formState: { errors, isValid },
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

  const handleToggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const handleSelectDropdown = (item: CategoryRes) => {
    setItemDropdown(item);
    setIsDropdown(false);
  };

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropdownFilter(e.target.value);
  };

  useEffect(() => {
    async function fetchCategory() {
      const bodyReq: CategoryFilter = {
        title: "",
        status: 0,
        isDesc: false,
        typeSort: "",
      };

      const payload: FilterListPayload<CategoryFilter> = {
        body: bodyReq,
        limit: 50,
        page: 1,
      };

      try {
        const res = await dispatch(getListCategoryAsync(payload)).unwrap();
        if (res) {
          if (res.retCode === 0) {
            setListItemDropdown(res.data.listData);
            setLoading(false);
          } else {
            toast.error(res.retText);
          }
        } else {
          console.log("error: ", res);
        }
      } catch (e) {
        console.log("error: ", e);
      }
    }
    fetchCategory();
  }, []);

  useEffect(() => {
    document.title = "Quản trị | Thêm mới danh mục";
  }, []);

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
        <form>
          <div className="flex flex-row w-full gap-x-4">
            <Field>
              <Label htmlFor="title">Tên danh mục</Label>
              <Input
                name="title"
                control={control}
                placeholder="Tên danh mục sản phẩm.."
              />
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
              <Label>Cấp cha</Label>
              <Dropdown>
                <Select
                  show={isDropdown}
                  itemSelected={itemDropdown?.title}
                  placeholder="-- Chọn cấp cha --"
                  onClick={handleToggleDropdown}
                ></Select>
                <List isShow={isDropdown}>
                  <Search
                    value={dropdownFilter}
                    onChange={handleChangeFilter}
                    placeholder="Tìm kiếm.."
                  />
                  {listItemDropdown &&
                    listItemDropdown.map((item) => (
                      <Option
                        key={item.id}
                        handleSelected={() => handleSelectDropdown(item)}
                      >
                        {item.title}
                      </Option>
                    ))}
                </List>
              </Dropdown>
            </Field>

            <Field>
              <Label>Hình ảnh</Label>
            </Field>
          </div>
          <div className="flex flex-row w-full gap-x-4">
            <Field>
              <Label>Trạng thái</Label>
            </Field>
          </div>
          <Field>
            <DashboardButton>Thêm mới</DashboardButton>
          </Field>
        </form>
      </DashboardBody>
    </>
  );
};

export default CategoriesAdd;
