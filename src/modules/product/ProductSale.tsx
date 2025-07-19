import ProductSaleItem from "./ProductSaleItem";

const ProductSale = () => {
  return (
    <div className="mt-20 w-full max-w-[99vw] overflow-x-hidden">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-950 dark:text-blue-800 px-4">
        Đang giảm giá
      </h2>

      <div className="mt-10 w-full overflow-hidden grid grid-cols-2 lg:grid-cols-4 px-10 lg:px-30 xl:px-60 gap-4">
        <ProductSaleItem />
        <ProductSaleItem />
        <ProductSaleItem />
        <ProductSaleItem />
      </div>
    </div>
  );
};

export default ProductSale;
