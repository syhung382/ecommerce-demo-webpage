import { IconEye, IconHeart, IconShopingCart } from "../../components/icons";

const ProductGridItem = () => {
  return (
    <div className="group transition hover:bg-blue-300 dark:hover:bg-blue-400/50 dark:border dark:border-gray-700 dark:rounded-md ">
      <div className="bg-white dark:bg-gray-700 p-4 relative">
        <img src="/images/products/product.png" alt="product" className="" />
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 left-3 flex flex-col gap-y-2">
          <div className="p-2 bg-blue-100 rounded-full cursor-pointer text-blue-700 hover:text-pink-600">
            <IconEye width={16} height={16} />
          </div>
          <div className="p-2 bg-blue-100 rounded-full cursor-pointer text-blue-700 hover:text-pink-600">
            <IconHeart width={16} height={16} />
          </div>
          <div className="p-2 bg-blue-100 rounded-full cursor-pointer text-blue-700 hover:text-pink-600">
            <IconShopingCart width={16} height={16} />
          </div>
        </div>
      </div>
      <div className="text-center w-full mt-2 p-4">
        <h3 className="text-lg font-bold dark:text-blue-700 tẻ group-hover:dark:text-pink-700 text-pink-600 cursor-pointer">
          Sản phẩm 1
        </h3>
        <div className="flex justify-center items-center mt-2 gap-x-2">
          <p className="text-blue-900 group-hover:text-blue-950 dark:text-gray-400 text-sm font-semibold">
            100.000đ
          </p>
          <p className="text-pink-400 group-hover:text-pink-400 dark:text-gray-600 text-xs font-medium line-through">
            100.000đ
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductGridItem;
