import { useEffect, useState } from "react";
import { Input, InputPassword, RadioInput } from "../components/input";
import { IconRequired } from "../components/icons";
import { Button } from "../components/buttons";
import { Link } from "react-router-dom";
import { clientSiderBarMenuPath, GenderEnum } from "../utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import type { RegisterReq } from "../utils/requestUtils";
import { Field } from "../components/field";
import { Label } from "../components/label";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Định dạng email không đúng!")
    .required("Email không được để trống!"),
  userName: yup
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
  gender: yup.number().required("Vui lòng chọn giới tính!"),
});

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterReq>({
    mode: "onSubmit",
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [errorPassowrd, setErrorPassword] = useState<string>("");
  const [gender, setGender] = useState<number>(GenderEnum.Male);

  const handleChangeRePassowrd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorPassword("");
    if (e.target.value !== password) setErrorPassword("Mật khẩu không khớp!");

    setRePassword(e.target.value);
  };

  const handleChangeGender = (value: number) => {
    setGender(value);
    setValue("gender", value);
  };

  const handleSubmitForm = (value: RegisterReq) => {
    if (isLoading) return;
    setIsLoading(true);

    console.log(value);
    setIsLoading(false);
  };

  useEffect(() => {
    document.title = "Đăng ký";
  }, []);

  return (
    <div className="my-10 mx-auto lg:my-20 max-w-[90%] lg:max-w-[800px] w-full border border-gray-200 bg-white dark:bg-gray-800 rounded-xl p-5 items-center justify-center flex-col flex">
      <h1 className="font-bold text-2xl">Đăng ký</h1>
      <span className="text-blue-500 text-sm">Đăng ký tài khoản mới</span>
      <form
        autoComplete="off"
        className="mt-4 w-full px-10"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <Field>
          <Label htmlFor="fullName">Họ và tên</Label>
          {errors.userName && (
            <ul className="text-red-500 text-xs mb-2 list-inside">
              {Array.isArray(errors.userName.types)
                ? errors.userName.types.map((err, i) => <li key={i}>{err}</li>)
                : errors.userName.message && <li>{errors.userName.message}</li>}
            </ul>
          )}
          <Input
            name="fullName"
            placeholder="Họ và tên"
            control={control}
            disabled={isLoading}
          ></Input>
        </Field>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Field>
            <Label htmlFor="email">
              Email <IconRequired />
            </Label>
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
            <Input
              name="email"
              placeholder="Email"
              control={control}
              disabled={isLoading}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="userName">
              Tên đăng nhập <IconRequired />
            </Label>
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
            <Input
              name="userName"
              placeholder="Tên đăng nhập"
              control={control}
              disabled={isLoading}
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Field>
            <Label htmlFor="password">
              Mật khẩu <IconRequired />
            </Label>
            {errors.password && (
              <ul className="text-red-500 text-xs mb-2 list-inside ">
                {Array.isArray(errors.password.types)
                  ? errors.password.types.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))
                  : errors.password.message && (
                      <li>{errors.password.message}</li>
                    )}
              </ul>
            )}
            <InputPassword
              placeholder="Mật khẩu"
              name="password"
              disabled={isLoading}
              control={control}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></InputPassword>
          </Field>
          <Field>
            <Label htmlFor="rePassword">
              Nhập lại mật khẩu <IconRequired />
            </Label>
            {errors.password && (
              <ul className="text-red-500 text-xs mb-2 list-inside ">
                {Array.isArray(errors.password.types)
                  ? errors.password.types.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))
                  : errors.password.message && (
                      <li>{errors.password.message}</li>
                    )}
              </ul>
            )}
            <InputPassword
              placeholder="Mật khẩu"
              name="rePassword"
              disabled={isLoading}
              control={control}
              value={rePassword}
              onChange={handleChangeRePassowrd}
            ></InputPassword>
            <p className="text-red-500 text-xs mb-2 list-inside">
              {errorPassowrd}
            </p>
          </Field>
        </div>

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
          <p className="text-sm">
            Bằng việc đăng ký tức là bạn chấp nhận các{" "}
            <span className="font-semibold text-pink-600">Chính sách</span> và{" "}
            <span className="font-semibold text-pink-600">Điều khoản</span> của
            chúng tôi
          </p>
        </Field>
        <Field>
          <Button disabled={isLoading} isLoading={isLoading}>
            Đăng ký
          </Button>
        </Field>
        <Field>
          <p className="text-center">
            Bạn đã có tài khoản?{" "}
            <Link
              to={`/${clientSiderBarMenuPath.Login}`}
              className="font-semibold text-pink-600 cursor-pointer"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </Field>
      </form>
    </div>
  );
};

export default RegisterPage;
