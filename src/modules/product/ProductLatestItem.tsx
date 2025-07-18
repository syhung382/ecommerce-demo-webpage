import ProductItem from "./ProductItem";

const products = [1, 2, 3, 4, 5, 6];

const ProductLatestItem = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((item) => (
        <ProductItem key={item} />
      ))}
    </div>
  );
};

export default ProductLatestItem;
