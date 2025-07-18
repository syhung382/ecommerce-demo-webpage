import { useState } from "react";
import ProductLatestItem from "./ProductLatestItem";

const categories = [
  {
    id: 1,
    name: "Danh mục 1",
  },
  {
    id: 2,
    name: "Danh mục 2",
  },
  {
    id: 3,
    name: "Danh mục 3",
  },
  {
    id: 4,
    name: "Danh mục 4",
  },
];

const ProductLatest = () => {
  const [categorySelected, setCategorySelected] = useState<number>(1);

  return (
    <div className="mt-20 w-full max-w-[99vw]">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-950 dark:text-blue-800 px-4">
        Sản phẩm mới
      </h2>
      <div className="flex flex-row gap-x-3 justify-center">
        {categories.map((item) => (
          <span
            key={item.id}
            className={`text-lg font-semibold cursor-pointer ${
              categorySelected === item.id
                ? " underline decoration-1 text-pink-600 decoration-pink-600 underline-offset-4"
                : "text-gray-500 hover:text-pink-500"
            }`}
            onClick={() => setCategorySelected(item.id)}
          >
            {item.name}
          </span>
        ))}
      </div>
      <div className="w-full mt-10 px-10 lg:px-40 xl:px-60">
        <ProductLatestItem />
      </div>
    </div>
  );
};

export default ProductLatest;
