import { IconRequired } from "../../components/icons";
import RadioInput from "../../components/input/RadioInput";
import DashboardButton from "../../components/buttons/DashboardButton";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";

const FormDefault = () => {
  const { control } = useForm({
    mode: "onSubmit",
  });

  return (
    <form autoComplete="off">
      <div className="flex flex-row w-full gap-x-4">
        <Field>
          <Label htmlFor="title">
            Tên danh mục <IconRequired />
          </Label>
          <Input
            control={control}
            name="title"
            placeholder="Tên danh mục sản phẩm.."
          />
          <ul className="text-red-500 text-xs mb-2 list-inside">error</ul>
        </Field>
        <Field>
          <Label htmlFor="description">Mô tả</Label>
          <Input control={control} name="description" placeholder="Mô tả.." />
        </Field>
      </div>
      <div className="flex flex-row w-full gap-x-4">
        <Field>
          <Label>
            Cấp cha <IconRequired />
          </Label>
        </Field>

        <Field>
          <Label>Hình ảnh</Label>
          {/* <ImageUpload image={image} setImage={setImage}></ImageUpload> */}
        </Field>
      </div>
      <div className="flex flex-row w-full gap-x-4">
        <Field>
          <Label>Trạng thái</Label>
          <div className="flex flex-row gap-x-4">
            <RadioInput
              name="status"
              onChange={() => {}}
              title="Kích hoạt"
              value={0}
              status={0}
            ></RadioInput>
            <RadioInput
              name="status"
              onChange={() => {}}
              title="Không kích hoạt"
              value={1}
              status={1}
            ></RadioInput>
          </div>
        </Field>
      </div>
      <Field>
        <DashboardButton type="submit">
          Thêm mới
          {/* {loadingSubmit ? (
                <LoadingSpinner size={20} borderSize={5}></LoadingSpinner>
              ) : (
                "Thêm mới"
              )} */}
        </DashboardButton>
      </Field>
    </form>
  );
};

export default FormDefault;
