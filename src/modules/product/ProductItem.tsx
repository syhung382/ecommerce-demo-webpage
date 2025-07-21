import { Link, useNavigate } from "react-router-dom";
import ButtonClient from "../../components/buttons/ButtonClient";
import { clientSiderBarMenuPath } from "../../utils/constants";

const ProductItem = () => {
  const navigate = useNavigate();

  return (
    <div className="group transition hover:bg-blue-500 dark:hover:bg-blue-900 dark:border dark:border-gray-700 dark:rounded-md ">
      <div className="bg-white dark:bg-gray-700 p-4 relative">
        <img src="/images/products/product.png" alt="product" className="" />
        <button
          type="button"
          onClick={() =>
            navigate(`/${clientSiderBarMenuPath.ProductDetail}/san-pham-1`)
          }
          className="cursor-pointer text-sm font-semibold bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md absolute bottom-4 left-1/2 transform -translate-x-1/2  opacity-0 group-hover:opacity-100 transition"
        >
          Chi tiết
        </button>
      </div>
      <div className="text-center w-full mt-2 p-4">
        <Link
          to={`/${clientSiderBarMenuPath.ProductDetail}/san-pham-1`}
          className="text-lg font-bold dark:text-blue-700 tẻ group-hover:dark:text-pink-700 text-pink-600 cursor-pointer"
        >
          Sản phẩm 1
        </Link>
        <p className="text-blue-950 group-hover:text-gray-200 dark:text-gray-400 text-sm font-semibold">
          Giá: 100.000đ
        </p>
        <ButtonClient title="Thêm vào giỏ hàng" />
      </div>
    </div>
  );
};

export default ProductItem;
