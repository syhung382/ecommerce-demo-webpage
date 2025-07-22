import { useEffect } from "react";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import { InputPassword } from "../components/input";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { Button } from "../components/buttons";
import type { LoginReq } from "../utils/requestUtils";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { handleLoginAsync } from "../api/handle/handles";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconRequired } from "../components/icons";
import { clientSiderBarMenuPath } from "../utils/constants";

const schema = yup.object({
  username: yup
    .string()
    .required("Vui lòng nhập tên đăng nhập!")
    .min(3, "Tên đăng nhập phải ít nhất 3 ký tự!")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Tên đăng nhập không chứa khoảng trắng hoặc ký tự đặc biệt!"
    ),
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
    } catch (error) {
      console.error("❌ Login thất bại:", error);
    }
  };

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  useEffect(() => {
    if (errorMessage) toast.error(errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    if (user?.token != undefined) navigate("/");
  }, [user, navigate]);

  return (
    <div className="mt-10 max-w-[500px] w-full mx-auto border border-gray-200 bg-white dark:bg-gray-800 rounded-xl p-5 items-center justify-center flex-col flex">
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
          <Label htmlFor="username">
            Tên đăng nhập <IconRequired />
          </Label>
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
            disabled={isLoading}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">
            Mật khẩu <IconRequired />
          </Label>
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
            disabled={isLoading}
            control={control}
          ></InputPassword>
        </Field>
        <Field>
          <span className="text-sm font-semibold text-pink-600 cursor-pointer">
            Quên mật khẩu?
          </span>
        </Field>
        <Field>
          <Button disabled={isLoading} isLoading={isLoading}>
            Đăng nhập
          </Button>
        </Field>
        <Field>
          <p className="text-center">
            Bạn chưa có tài khoản?{" "}
            <Link
              to={`/${clientSiderBarMenuPath.Register}`}
              className="font-semibold text-pink-600 cursor-pointer"
            >
              Đăng ký ngay
            </Link>
          </p>
        </Field>
      </form>
    </div>
  );
};

export default LoginPage;
