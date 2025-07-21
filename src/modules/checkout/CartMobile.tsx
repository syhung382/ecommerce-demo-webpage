import { IconTrash } from "../../components/icons";

const CartMobile = () => {
  return (
    <div className="block md:hidden space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4">
        <div className="flex items-center gap-4">
          <img
            src="/images/products/product.png"
            alt="product"
            className="w-16 h-16 object-cover rounded bg-blue-100 dark:bg-blue-950/40"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-blue-950 dark:text-pink-600 text-sm">
              Sản phẩm
            </h4>
            <div className="text-xs text-gray-500">Option: Option 1</div>
          </div>
          <IconTrash
            width={20}
            height={20}
            className="text-red-400 hover:text-red-600 cursor-pointer"
          />
        </div>

        <div className="mt-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Giá:</span>
            <span className="font-medium text-blue-950 dark:text-gray-300">
              100.000đ
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-500">Số lượng:</span>
            <div className="flex items-center gap-2 border px-2 rounded">
              <button className="text-gray-500 hover:text-blue-600">-</button>
              <input
                type="text"
                defaultValue={1}
                className="w-6 text-center outline-none bg-transparent"
              />
              <button className="text-gray-500 hover:text-blue-600">+</button>
            </div>
          </div>
          <div className="flex justify-between mt-2 font-semibold text-red-500">
            <span>Thành tiền:</span>
            <span>100.000đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMobile;
