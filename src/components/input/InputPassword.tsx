import { useState } from "react";
import Input from "./Input";
import type { InputProps } from "../../utils/interface";
import { IconEye, IconEyeSlash } from "../icons";

const InputPassword = ({ control, name, children, ...rest }: InputProps) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;

  return (
    <>
      <Input
        type={togglePassword ? "text" : "password"}
        name={name}
        control={control}
        maxLength={250}
        {...rest}
      >
        {children ? (
          children
        ) : (
          <>
            {togglePassword ? (
              <div className=" text-gray-500 dark:text-gray-400">
                <IconEye onClick={() => setTogglePassword(false)}></IconEye>
              </div>
            ) : (
              <div className=" text-gray-500 dark:text-gray-400">
                <IconEyeSlash
                  onClick={() => setTogglePassword(true)}
                ></IconEyeSlash>
              </div>
            )}
          </>
        )}
      </Input>
    </>
  );
};

export default InputPassword;
