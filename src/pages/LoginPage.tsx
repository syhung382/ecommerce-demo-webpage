import { useEffect } from "react";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import { InputPassword } from "../components/input";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { Button } from "../components/buttons";
import type { LoginReq } from "../utils/request";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { handleLoginAsync } from "../stores/handles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup
    .string()
    .required("Vui lòng nhập tên đăng nhập!")
    .min(3, "Tên đăng nhập phải ít nhất 3 ký tự!")
    .matches(/^[a-zA-Z0-9]+$/, "Tên đăng nhập chỉ chứa chữ và số"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu!")
    .min(6, "Mật khẩu phải ít nhất 6 ký tự!"),
});

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginReq>({
    mode: "onSubmit",
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const dispatch = useAppDispatch();
  const { errorMessage, isLoading, user } = useAppSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const handleLogin = async (value: LoginReq) => {
    if (!isValid) return;

    try {
      await dispatch(handleLoginAsync(value)).unwrap();
      navigate("admin/dashboard");
    } catch (error) {
      console.error("❌ Login thất bại:", error);
    }
  };

  useEffect(() => {
    document.title = "Ecommerce | Đăng nhập";
  }, []);

  useEffect(() => {
    if (errorMessage) toast.error(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if (user?.token != undefined) navigate("/");
  }, [user, navigate]);

  return (
    <div className="mt-10 max-w-[500px] w-full mx-auto border border-gray-200 rounded-xl p-5 items-center justify-center flex-col flex">
      <h1 className="font-bold text-2xl">Đăng nhập</h1>
      <span className="text-gray-500 text-sm">
        Vui lòng đăng nhập để sử dụng
      </span>
      <form
        onSubmit={handleSubmit(handleLogin)}
        autoComplete="off"
        className="mt-4 w-full px-10"
      >
        <Field>
          <Label htmlFor="username">Tên đăng nhập</Label>
          {errors.username && (
            <ul className="text-red-500 text-xs mb-2 list-inside">
              {Array.isArray(errors.username.types)
                ? errors.username.types.map((err, i) => <li key={i}>{err}</li>)
                : errors.username.message && <li>{errors.username.message}</li>}
            </ul>
          )}
          <Input
            name="username"
            placeholder="Tên đăng nhập"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Mật khẩu</Label>
          {errors.password && (
            <ul className="text-red-500 text-xs mb-2 list-inside ">
              {Array.isArray(errors.password.types)
                ? errors.password.types.map((err, i) => <li key={i}>{err}</li>)
                : errors.password.message && <li>{errors.password.message}</li>}
            </ul>
          )}
          <InputPassword
            placeholder="Mật khẩu"
            name="password"
            control={control}
          ></InputPassword>
        </Field>
        <Field>
          <Button disabled={isLoading} isLoading={isLoading}>
            Đăng nhập
          </Button>
        </Field>
      </form>
    </div>
  );
};

export default LoginPage;
