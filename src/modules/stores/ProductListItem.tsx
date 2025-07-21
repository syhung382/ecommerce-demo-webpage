import { Link } from "react-router-dom";
import { IconEye, IconHeart, IconShopingCart } from "../../components/icons";
import { clientSiderBarMenuPath } from "../../utils/constants";

const ProductListItem = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-3">
      <img
        src="/images/products/product.png"
        alt="product"
        className="w-full max-h-[200px] h-auto object-contain col-span-4 dark:bg-gray-700"
      />
      <div className="w-full col-span-8 flex flex-col justify-center gap-2">
        <Link
          to={`/${clientSiderBarMenuPath.ProductDetail}/san-pham-1`}
          className="font-bold text-blue-950 dark:text-blue-600 "
        >
          Sản phẩm
        </Link>
        <div className="w-full flex gap-x-2 items-center">
          <p className="text-blue-700  dark:text-blue-500 text-sm font-semibold">
            100.000đ
          </p>
          <p className="text-pink-400  dark:text-red-400 text-xs font-medium line-through">
            100.000đ
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas
          necessitatibus incidunt quo a distinctio,
        </div>
        <div className="flex gap-x-2">
          <div className="p-1 cursor-pointer text-blue-700 hover:text-pink-600">
            <IconShopingCart width={20} height={20} />
          </div>
          <div className="p-1 cursor-pointer text-blue-700 hover:text-pink-600">
            <IconHeart width={20} height={20} />
          </div>
          <div className="p-1 cursor-pointer text-blue-700 hover:text-pink-600">
            <IconEye width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
