import type { OnClickProps } from "../../utils/interface";
import { IconTrash } from "../icons";

const ActionDelete = ({ onClick = () => {} }: OnClickProps) => {
  return (
    <span
      className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 border dark:border-red-500/50 dark:text-red-500/50 border-red-300 text-red-300 rounded cursor-pointer"
      onClick={onClick}
    >
      <IconTrash></IconTrash>
    </span>
  );
};

export default ActionDelete;
