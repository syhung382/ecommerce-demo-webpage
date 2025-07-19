const ProductItem = () => {
  return (
    <div className="group transition hover:bg-blue-500 dark:hover:bg-blue-900 dark:border dark:border-gray-700 dark:rounded-md ">
      <div className="bg-white dark:bg-gray-700 p-4 relative">
        <img src="/images/products/product.png" alt="product" className="" />
        <button
          type="button"
          className="cursor-pointer text-sm font-semibold bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md absolute bottom-4 left-1/2 transform -translate-x-1/2  opacity-0 group-hover:opacity-100 transition"
        >
          Chi tiết
        </button>
      </div>
      <div className="text-center w-full mt-2 p-4">
        <h3 className="text-lg font-bold dark:text-blue-700 group-hover:dark:text-pink-700 text-pink-600 cursor-pointer">
          Sản phẩm 1
        </h3>
        <p className="text-gray-600 group-hover:text-gray-200 dark:text-gray-400 text-sm font-semibold">
          Giá: 100.000đ
        </p>
        <button
          type="button"
          className="text-xs md:text-sm transition duration-300 mt-6 cursor-pointer px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 border border-gray-500 group-hover:bg-pink-500 group-hover:hover:bg-pink-600 dark:text-gray-300 group-hover:dark:bg-pink-700 group-hover:dark:hover:bg-pink-800"
        >
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
