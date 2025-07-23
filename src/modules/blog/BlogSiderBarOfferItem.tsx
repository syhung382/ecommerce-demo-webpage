const BlogSiderBarOfferItem = () => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-full bg-blue-50 p-1 rounded-md relative"
        style={{ paddingBottom: "70%" }}
      >
        <img
          src="/images/products/product.png"
          alt="product"
          className="absolute top-0 left-0 w-full h-full object-contain rounded-md"
        />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <h3 className="font-semibold text-sm text-blue-900 dark:text-blue-700 hover:text-pink-600">
          Sản phẩm 1
        </h3>
        <p className="font-semibold text-xs text-red-500">100.000đ</p>
      </div>
    </div>
  );
};

export default BlogSiderBarOfferItem;
