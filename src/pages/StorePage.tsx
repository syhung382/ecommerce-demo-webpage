import MapComponent from "../components/other/MapComponent";
import SortComponent from "../modules/stores/SortComponent";
import { clientSiderBarMenuPath } from "../utils/constants";
import type { MapItemProps } from "../utils/interface";
import FilterProductCategory from "../modules/stores/FilterProductCategory";
import FilterProductTag from "../modules/stores/FilterProductTag";
import FilterProductPrice from "../modules/stores/FilterProductPrice";
import { useEffect, useState } from "react";
import ButtonClient from "../components/buttons/ButtonClient";
import ProductGrid from "../modules/stores/ProductGrid";
import ProductList from "../modules/stores/ProductList";
import PagingClient from "../paging/PagingClient";
import clsx from "clsx";

const mapList: MapItemProps[] = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Cửa hàng",
    url: "/" + clientSiderBarMenuPath.Product,
  },
];

const StorePage = () => {
  const [filterPriceMin, setFilterPriceMin] = useState<number | null>(0);
  const [filterPriceMax, setFilterPriceMax] = useState<number | null>(0);
  const [typeList, setTypeList] = useState<"grid" | "list">("grid");
  const [showAnimation, setShowAnimation] = useState(true);

  const handleOnChangePriceFilter = (
    min: number | null,
    max: number | null
  ) => {
    setFilterPriceMin(min);
    setFilterPriceMax(max);
  };

  const handleChangeTypeList = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setTypeList((prev) => (prev === "grid" ? "list" : "grid"));
      setShowAnimation(true);
    }, 200);
  };

  useEffect(() => {}, [filterPriceMax, filterPriceMin]);

  useEffect(() => {
    document.title = "Cửa hàng";
  }, []);
  return (
    <>
      <MapComponent title="Cửa hàng" mapItem={mapList} />
      <SortComponent
        typeList={typeList}
        onChangeTypeList={handleChangeTypeList}
      />
      <div className="grid grid-cols-12 px-10 gap-6 lg:px-30 xl:px-60">
        <div className="lg:col-span-3 col-span-full">
          {/* danh mục */}
          <FilterProductCategory />

          {/* Tag */}
          <FilterProductTag />

          {/* giá */}
          <FilterProductPrice onChangePrice={handleOnChangePriceFilter} />
          <div className=" lg:mt-6 w-full grid items-center">
            <ButtonClient title="Lọc" />
          </div>
        </div>
        <div
          className={clsx(
            "mt-2 lg:col-span-9 col-span-full transition-all duration-300 ease-in-out transform",
            showAnimation ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          {typeList === "grid" ? <ProductGrid /> : <ProductList />}
        </div>
      </div>
      <PagingClient page={1} totalPage={5} handleChangePage={() => {}} />
    </>
  );
};

export default StorePage;
