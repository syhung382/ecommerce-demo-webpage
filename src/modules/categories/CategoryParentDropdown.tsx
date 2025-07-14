import {
  Dropdown,
  List,
  Option,
  Search,
  Select,
} from "../../components/dropdown";
import { useCallback, useEffect, useState } from "react";
import type { CategoryRes } from "../../utils/responseUtils";
import type { CategoryParentProps } from "../../utils/interface";
import { debounce } from "lodash";
import { removeVietnameseTones } from "../../utils/handlerUtils";
import { useAppDispatch } from "../../hooks/hook";
import type { CategoryFilter } from "../../utils/requestUtils";
import { toast } from "react-toastify";
import { handleCategoryDropdownListAsync } from "../../api/handle/handleCategories";

const CategoryParentDropdown = ({
  itemDropdown,
  handleItemSelected,
  selectType = "category",
}: CategoryParentProps) => {
  const [dropdownFilter, setDropdownFilter] = useState("");
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [listItemDropdown, setListItemDropdown] = useState<
    CategoryRes[] | null
  >();
  const [newList, setNewList] = useState<CategoryRes[] | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropdownFilter(e.target.value);
  };

  const handleSelectDropdown = (item: CategoryRes) => {
    handleItemSelected(item);
    setIsDropdown(false);
    setDropdownFilter("");
  };

  const handleToggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  async function fetchCategory() {
    if (loading) return;
    setLoading(true);
    const bodyReq: CategoryFilter = {
      title: "",
      status: 0,
      isDesc: false,
      typeSort: "",
      noParent: true,
    };
    if (selectType == "product") {
      bodyReq.noParent = false;
    }

    try {
      const res = await dispatch(
        handleCategoryDropdownListAsync(bodyReq)
      ).unwrap();
      if (res) {
        if (res.retCode === 0) {
          setListItemDropdown(res.data);
        } else {
          toast.error(res.retText);
        }
      }
      setLoading(false);
    } catch (e) {
      toast.error("Lỗi không xác định");
      console.log("error: ", e);
      setLoading(false);
    }
  }

  const handleFilter = useCallback(() => {
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
  }, [dropdownFilter, listItemDropdown, itemDropdown]);

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    const debounced = debounce(handleFilter, 250);
    debounced();
    return () => debounced.cancel();
  }, [handleFilter]);

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
        {loading ? (
          <div className="flex dropdown-option text-xs font-semibold text-[15px] items-center justify-between px-5 py-3 cursor-pointer">
            Đang tải...
          </div>
        ) : (
          <>
            {newList &&
              newList.map((item) => (
                <Option
                  key={item.id}
                  handleSelected={() => handleSelectDropdown(item)}
                >
                  {item.title}
                </Option>
              ))}
          </>
        )}
      </List>
    </Dropdown>
  );
};

export default CategoryParentDropdown;
