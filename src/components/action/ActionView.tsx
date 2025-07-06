import type { OnClickProps } from "../../utils/interface";
import { IconEye } from "../icons";

const ActionView = ({ onClick = () => {} }: OnClickProps) => {
  return (
    <span
      className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 border text-green-500 border-green-500 dark:text-green-600/50 dark:border-green-600/50 rounded cursor-pointer"
      onClick={onClick}
    >
      <IconEye></IconEye>
    </span>
  );
};

export default ActionView;
