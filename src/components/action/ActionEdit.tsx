import type { OnClickProps } from "../../utils/interface";
import { IconEdit } from "../icons";

const ActionEdit = ({ onClick = () => {} }: OnClickProps) => {
  return (
    <span
      className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 border dark:text-blue-700/50 dark:border-blue-700/50 border-blue-400 text-blue-400 rounded cursor-pointer"
      onClick={onClick}
    >
      <IconEdit></IconEdit>
    </span>
  );
};

export default ActionEdit;
