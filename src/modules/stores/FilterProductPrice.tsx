import { useEffect, useState } from "react";
import FilterProductItem from "./FilterProductItem";
import { formatVND } from "../../hooks/hook";
import { IconChevronDown, IconChevronUp } from "../../components/icons";

const listTagItem = [
  { id: 1, title: "Dưới 100.000đ", min: 0, max: 100000 },
  { id: 2, title: "100.000đ - 300.000đ", min: 100000, max: 300000 },
  { id: 3, title: "300.000đ - 500.000đ", min: 300000, max: 500000 },
  { id: 4, title: "Trên 500.000đ", min: 500000, max: Number.MAX_SAFE_INTEGER },
];

interface FilterProductPriceProps {
  onChangePrice?: (min: number | null, max: number | null) => void;
}

const FilterProductPrice = ({ onChangePrice }: FilterProductPriceProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [minInput, setMinInput] = useState<string>("");
  const [maxInput, setMaxInput] = useState<string>("");

  const updatePrice = (min: number, max: number) => {
    if (onChangePrice) {
      onChangePrice(min, max);
    }
  };

  const handleSelectPrice = (id: number) => {
    setSelectedId(id);
    setMinInput("");
    setMaxInput("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const raw = e.target.value;
    const onlyNumbers = raw.replace(/\D/g, "");

    setSelectedId(null);
    if (type === "min") setMinInput(formatVND(onlyNumbers));
    else setMaxInput(formatVND(onlyNumbers));
  };

  useEffect(() => {
    if (selectedId) {
      const selected = listTagItem.find((item) => item.id === selectedId);
      if (selected) {
        updatePrice(selected.min, selected.max);
      }
    } else if (minInput || maxInput) {
      const min = minInput ? parseInt(minInput.replace(/\D/g, "")) : 0;
      const max = maxInput ? parseInt(maxInput.replace(/\D/g, "")) : 0;

      if (!isNaN(min) && !isNaN(max) && max > min) {
        if (min === 0 || max === 0) {
          onChangePrice?.(null, null);
        } else {
          updatePrice(min, max);
        }
      }
    }
  }, [selectedId, minInput, maxInput]);

  return (
    <>
      {/* desktop */}
      <div className="text-blue-950 dark:text-gray-400 mt-6 hidden lg:block">
        <h3 className="text-xl font-bold underline decoration-1 decoration-blue-950 underline-offset-4">
          Mức giá
        </h3>
        {listTagItem.map((item) => (
          <FilterProductItem
            key={item.id}
            title={item.title}
            isActive={selectedId === item.id}
            onClick={() => handleSelectPrice(item.id)}
          />
        ))}

        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="font-medium mb-2">Tùy chọn khoảng giá</h4>
          <div className="flex flex-col items-center gap-1">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Từ"
              className="border border-gray-300 rounded px-3 py-1 text-sm w-full"
              value={minInput}
              onChange={(e) => handleInputChange(e, "min")}
              maxLength={14}
            />
            <span>~</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Đến"
              className="border border-gray-300 rounded px-3 py-1 text-sm text-sm w-full"
              value={maxInput}
              onChange={(e) => handleInputChange(e, "max")}
              maxLength={14}
            />
          </div>
          {(() => {
            const min = parseInt(minInput.replace(/\D/g, "")) || 0;
            const max = parseInt(maxInput.replace(/\D/g, "")) || 0;
            return min > 0 && max > 0 && max <= min;
          })() && (
            <p className="text-red-600 text-sm mt-1">
              Giá tối đa phải lớn hơn giá tối thiểu
            </p>
          )}
        </div>
      </div>

      {/* mobile */}
      <div className="text-blue-950 dark:text-gray-400 mt-2">
        <h3
          className="text-xl font-bold underline decoration-1 decoration-blue-950 underline-offset-4 flex items-center gap-x-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Mức giá</span>
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
                title={item.title}
                isActive={selectedId === item.id}
                onClick={() => handleSelectPrice(item.id)}
              />
            ))}

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-2">Tùy chọn khoảng giá</h4>
              <div className="flex flex-col items-center gap-1">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Từ"
                  className="border border-gray-300 rounded px-3 py-1 text-sm w-full"
                  value={minInput}
                  onChange={(e) => handleInputChange(e, "min")}
                  maxLength={14}
                />
                <span>~</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Đến"
                  className="border border-gray-300 rounded px-3 py-1 text-sm text-sm w-full"
                  value={maxInput}
                  onChange={(e) => handleInputChange(e, "max")}
                  maxLength={14}
                />
              </div>
              {(() => {
                const min = parseInt(minInput.replace(/\D/g, "")) || 0;
                const max = parseInt(maxInput.replace(/\D/g, "")) || 0;
                return min > 0 && max > 0 && max <= min;
              })() && (
                <p className="text-red-600 text-sm mt-1">
                  Giá tối đa phải lớn hơn giá tối thiểu
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FilterProductPrice;
