import {
  IconCheckboxBlue,
  IconCheckboxBlueChecked,
} from "../../components/icons";
import type { FilterProductItemProps } from "../../utils/interface";

const FilterProductItem = ({
  title,
  isActive,
  onClick,
}: FilterProductItemProps) => {
  return (
    <div
      className="flex items-center gap-x-2 cursor-pointer mt-2"
      onClick={onClick}
    >
      {isActive ? (
        <IconCheckboxBlueChecked width={16} height={16} />
      ) : (
        <IconCheckboxBlue width={16} height={16} />
      )}

      <span className="font-semibold">{title}</span>
    </div>
  );
};

export default FilterProductItem;
