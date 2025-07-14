import { useEffect, useState } from "react";
import {
  Dropdown,
  List,
  Option,
  Search,
  Select,
} from "../../components/dropdown";
import type {
  TagOfProduct,
  TagOfProductFilter,
} from "../../utils/requestUtils";
import { useAppDispatch } from "../../hooks/hook";
import { toast } from "react-toastify";
import type { ResponseResult } from "../../utils/responseUtils";
import type { TagOfProductDropdownProps } from "../../utils/interface";
import { removeVietnameseTones } from "../../utils/handlerUtils";
import { handleTagListDropdownAsync } from "../../api/handle/handleTags";

const TagOfProductDropdownSelect = ({
  handleItemSelected,
  itemDropdown,
}: TagOfProductDropdownProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [dropdownFilter, setDropdownFilter] = useState<string>("");
  const [listDropdown, setListDropdown] = useState<TagOfProduct[]>([]);
  const [newList, setNewList] = useState<TagOfProduct[]>([]);

  const dispatch = useAppDispatch();

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropdownFilter(e.target.value);
  };

  const handleSelectDropdown = (item: TagOfProduct) => {
    handleItemSelected(item);
    setIsDropdown(false);
    setDropdownFilter("");
  };

  const handleToggleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    const bodyReq: TagOfProductFilter = {
      title: "",
      status: undefined,
      typeSort: "",
      isDesc: false,
    };

    try {
      const res = await dispatch(handleTagListDropdownAsync(bodyReq));
      if (res) {
        if (res.meta.requestStatus === "rejected") {
          toast.error("Connect server error!");
        }
        if (res.meta.requestStatus === "fulfilled") {
          const resData = res.payload as ResponseResult<TagOfProduct[]>;

          if (resData.retCode === 0) {
            setListDropdown(resData.data);
          } else {
            toast.error(resData.retText);
          }
        }
      }
    } catch (e) {
      console.log("error: ", e);
      toast.error("Lỗi không xác định!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let list: TagOfProduct[] = [];
    const keyword = dropdownFilter?.trim().toLowerCase();
    if (itemDropdown && itemDropdown.length > 0) {
      const listId = itemDropdown.map((item) => item.tagOfProductId);
      list = listDropdown
        .filter((f) => !listId.includes(f.id))
        .filter((f) => {
          const title = f.title.toLowerCase();
          return (
            title.includes(keyword) ||
            removeVietnameseTones(f.title).includes(keyword)
          );
        });
    } else {
      list = listDropdown.filter(
        (f) =>
          f.title.includes(keyword) ||
          removeVietnameseTones(f.title).includes(keyword)
      );
    }
    setNewList(list);
  }, [dropdownFilter, listDropdown, itemDropdown]);

  return (
    <Dropdown>
      <Select
        show={isDropdown}
        placeholder="-- Chọn tag --"
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

export default TagOfProductDropdownSelect;
