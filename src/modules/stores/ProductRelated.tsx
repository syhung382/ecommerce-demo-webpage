import ProductRelatedItem from "./ProductRelatedItem";

const ProductRelated = () => {
  return (
    <div className="mt-10 lg:mt-20">
      <h2 className="text-3xl font-bold mb-4 text-blue-950 dark:text-blue-800 px-4">
        Sản phẩm liên quan
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mt-10">
        <ProductRelatedItem />
        <ProductRelatedItem />
        <ProductRelatedItem />
        <ProductRelatedItem />
      </div>
    </div>
  );
};

export default ProductRelated;
