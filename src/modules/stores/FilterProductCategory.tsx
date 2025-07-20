import { useState } from "react";
import type { FilterProductItemValue } from "../../utils/interface";
import FilterProductItem from "./FilterProductItem";
import { IconChevronDown, IconChevronUp } from "../../components/icons";

const listCategoryItem: FilterProductItemValue[] = [
  {
    id: "1",
    title: "danh mục 1",
  },
  {
    id: "2",
    title: "danh mục 2",
  },
  {
    id: "3",
    title: "danh mục 3",
  },
];

const FilterProductCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    FilterProductItemValue[]
  >([]);

  const handleSelectedCategory = (value: FilterProductItemValue) => {
    setSelectedCategory((prevSelected) => {
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
      <div className="text-blue-950 dark:text-gray-400 hidden lg:block">
        <h3 className="text-xl font-bold underline decoration-1 decoration-blue-950 underline-offset-4">
          Danh mục
        </h3>
        {listCategoryItem.map((item) => (
          <FilterProductItem
            key={item.id}
            isActive={
              selectedCategory.find((f) => f.id === item.id) ? true : false
            }
            title={item.title}
            onClick={() => handleSelectedCategory(item)}
          />
        ))}
      </div>

      {/* mobile */}
      <div className="text-blue-950 dark:text-gray-400 lg:hidden">
        <h3
          className="text-xl font-bold underline decoration-1 decoration-blue-950 underline-offset-4 flex items-center gap-x-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Danh mục</span>
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
            {listCategoryItem.map((item) => (
              <FilterProductItem
                key={item.id}
                isActive={
                  selectedCategory.find((f) => f.id === item.id) ? true : false
                }
                title={item.title}
                onClick={() => handleSelectedCategory(item)}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default FilterProductCategory;
