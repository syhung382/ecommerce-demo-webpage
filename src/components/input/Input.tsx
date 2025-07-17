import { useController } from "react-hook-form";
import type { InputProps } from "../../utils/interface";

const Input = ({
  name = "",
  children,
  control,
  className,
  disabled,
  ...rest
}: InputProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div
      className={`w-full relative border border-gray-400 h rounded-lg ${
        disabled ? "bg-gray-200 dark:bg-gray-600" : "over:border-blue-300"
      }`}
    >
      <input
        disabled={disabled}
        className={`${disabled && "cursor-not-allowed"} ${
          className
            ? className
            : "px-3 py-3 outline-none w-full placeholder:text-gray-500 focus:rounded-lg focus:border focus:border-blue-500 dark:text-gray-300"
        }`}
        type="text"
        id={name}
        {...field}
        {...rest}
      />
      {children ? (
        <div className="absolute right-5 top-[50%] translate-y-[-50%] cursor-pointer">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
