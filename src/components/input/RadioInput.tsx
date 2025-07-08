import type { RadioInputProps } from "../../utils/interface";

const RadioInput = ({
  title,
  name,
  value,
  status,
  onChange,
}: RadioInputProps<0 | 1>) => {
  const id = `${name}-${value}`;
  return (
    <label htmlFor={id} className="flex flex-row gap-x-2 items-center">
      <input
        id={id}
        type="radio"
        name="status"
        value={value}
        checked={status === value}
        onChange={() => onChange(value)}
        className="h-4 w-4"
      />
      <span className="font-semibold dark:text-gray-300">{title}</span>
    </label>
  );
};

export default RadioInput;
