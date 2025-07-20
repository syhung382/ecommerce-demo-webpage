import { useState } from "react";
import type { FilterProductItemValue } from "../../utils/interface";
import FilterProductItem from "./FilterProductItem";
import { IconChevronDown, IconChevronUp } from "../../components/icons";

const listTagItem: FilterProductItemValue[] = [
  {
    id: "1",
    title: "Tag 1",
  },
  {
    id: "2",
    title: "Tag 2",
  },
  {
    id: "3",
    title: "Tag 3",
  },
];

const FilterProductTag = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<FilterProductItemValue[]>([]);

  const handleSelectedTag = (value: FilterProductItemValue) => {
    setSelectedTag((prevSelected) => {
      const exists = prevSelected.some((item) => item.id === value.id);

      if (exists) {
        return prevSelected.filter((item) => item.id !== value.id);
      } else {
        return [...prevSelected, value];
      }
    });
  };
  return (
    <>
      {/* desktop */}
      <div className="text-blue-950 dark:text-gray-400 mt-6 hidden lg:block">
        <h3 className="text-xl font-bold underline decoration-1 decoration-blue-950 underline-offset-4">
          Tag
        </h3>
        {listTagItem.map((item) => (
          <FilterProductItem
            key={item.id}
            isActive={selectedTag.find((f) => f.id === item.id) ? true : false}
            title={item.title}
            onClick={() => handleSelectedTag(item)}
          />
        ))}
      </div>

      {/* mobile */}
      <div className="text-blue-950 dark:text-gray-400 mt-2 lg:hidden">
        <h3
          className="text-xl font-bold underline decoration-1 decoration-blue-950 underline-offset-4 flex items-center gap-x-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Tag</span>
          <span>
            {isOpen ? (
              <IconChevronDown width={20} height={20} />
            ) : (
              <IconChevronUp width={20} height={20} />
            )}
          </span>
        </h3>
        {isOpen && (
          <>
            {listTagItem.map((item) => (
              <FilterProductItem
                key={item.id}
                isActive={
                  selectedTag.find((f) => f.id === item.id) ? true : false
                }
                title={item.title}
                onClick={() => handleSelectedTag(item)}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default FilterProductTag;
