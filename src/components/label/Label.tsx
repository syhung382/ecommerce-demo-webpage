import type { LabelProps } from "../../utils/interface";

const Label = ({ children, htmlFor }: LabelProps) => {
  return (
    <label
      className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-1"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default Label;
