import { Link } from "react-router-dom";
import { clientSiderBarMenuPath } from "../../utils/constants";

const ProductSaleItem = () => {
  return (
    <div className="group transition hover:bg-pink-500/80 dark:hover:bg-pink-900 dark:border dark:border-gray-700 dark:rounded-md ">
      <div className="bg-white dark:bg-gray-700 p-4 relative">
        <img src="/images/products/product.png" alt="product" className="" />
      </div>
      <div className="text-center w-full mt-2 p-4">
        <Link
          to={`/${clientSiderBarMenuPath.ProductDetail}/san-pham-1`}
          className="text-lg font-bold dark:text-pink-700 group-hover:dark:text-blue-700 text-pink-600 group-hover:text-blue-600 cursor-pointer"
        >
          Sản phẩm 1
        </Link>
        <div className="flex justify-center items-center mt-2 gap-x-2">
          <p className="text-gray-600 group-hover:text-gray-200 dark:text-gray-400 text-sm font-semibold">
            100.000đ
          </p>
          <p className="text-gray-400 group-hover:text-gray-200 dark:text-gray-600 text-xs font-medium line-through">
            100.000đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSaleItem;
