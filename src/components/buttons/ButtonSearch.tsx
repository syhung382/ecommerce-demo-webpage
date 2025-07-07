import type { ButtonSearchProps } from "../../utils/interface";
import { IconBack, IconSearch } from "../icons";

const ButtonSearch = ({ isOpen, onClick }: ButtonSearchProps) => {
  if (isOpen) {
    return (
      <IconBack
        aria-label="Trở về"
        className="cursor-pointer"
        width={20}
        height={20}
        onClick={onClick}
      />
    );
  } else {
    return (
      <IconSearch
        aria-label="Tìm kiếm"
        className="cursor-pointer"
        width={20}
        height={20}
        onClick={onClick}
      />
    );
  }
};

export default ButtonSearch;
