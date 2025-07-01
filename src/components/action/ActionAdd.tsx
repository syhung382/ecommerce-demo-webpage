import type { OnClickProps } from "../../utils/interface";
import { IconPlusLarge } from "../icons";

const ActionEdit = ({ onClick = () => {} }: OnClickProps) => {
  return (
    <span
      className="flex text-green-500 border-green-500 dark:text-green-600 dark:border-green-600 items-center justify-center w-6 h-6 md:w-8 md:h-8 border rounded cursor-pointer"
      onClick={onClick}
    >
      <IconPlusLarge />
    </span>
  );
};

export default ActionEdit;
