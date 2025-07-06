import {
  Dropdown,
  List,
  Option,
  Search,
  Select,
} from "../../components/dropdown";
import { useEffect, useState } from "react";
import type { CategoryRes } from "../../utils/responseUtils";
import type { CategoryParentProps } from "../../utils/interface";
import { debounce } from "lodash";
import { removeVietnameseTones } from "../../utils/handlerUtils";

const CategoryParentDropdown = ({
  itemDropdown,
  listItemDropdown,
  setItemDropdown,
}: CategoryParentProps) => {
  const [dropdownFilter, setDropdownFilter] = useState("");
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [newList, setNewList] = useState<CategoryRes[] | null>(
    listItemDropdown
  );

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropdownFilter(e.target.value);
  };

  const handleSelectDropdown = (item: CategoryRes) => {
    setItemDropdown(item);
    setIsDropdown(false);
    setDropdownFilter("");
  };

  const handleToggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  useEffect(() => {
    function handleFilter() {
      if (!listItemDropdown) return;

      const keyword = dropdownFilter?.trim().toLowerCase();

      const filtered = listItemDropdown.filter((item) => {
        if (itemDropdown && item.id === itemDropdown.id) return false;

        const itemTitle = removeVietnameseTones(item.title.toLowerCase());

        return (
          itemTitle.includes(keyword) ||
          item.title.toLowerCase().includes(keyword)
        );
      });

      setNewList(
        keyword
          ? filtered
          : listItemDropdown.filter((item) => itemDropdown?.id !== item.id)
      );
    }

    const debounced = debounce(handleFilter, 250);
    debounced();

    return () => {
      debounced.cancel();
    };
  }, [dropdownFilter, listItemDropdown, itemDropdown]);

  useEffect(() => {
    if (itemDropdown && listItemDropdown) {
      const list = listItemDropdown?.filter(
        (item) => item.id != itemDropdown.id
      );

      setNewList(list);
    }
  }, [itemDropdown, listItemDropdown]);

  return (
    <Dropdown>
      <Select
        show={isDropdown}
        itemSelected={itemDropdown?.title}
        placeholder="-- Chọn cấp cha --"
        onClick={handleToggleDropdown}
      ></Select>
      <List isShow={isDropdown}>
        <Search
          value={dropdownFilter}
          onChange={handleChangeFilter}
          placeholder="Tìm kiếm.."
        />
        {newList &&
          newList.map((item) => (
            <Option
              key={item.id}
              handleSelected={() => handleSelectDropdown(item)}
            >
              {item.title}
            </Option>
          ))}
      </List>
    </Dropdown>
  );
};

export default CategoryParentDropdown;
