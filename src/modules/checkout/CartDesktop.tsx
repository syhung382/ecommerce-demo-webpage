import { IconTrash } from "../../components/icons";

const CartDesktop = () => {
  return (
    <div className="w-full overflow-x-auto hidden md:block">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="text-left border-b text-blue-900 dark:text-pink-700 text-sm font-semibold">
            <th className="w-[35%] py-3">Sản phẩm</th>
            <th className="w-[25%] text-center">Giá</th>
            <th className="w-[10%] text-center">Số lượng</th>
            <th className="w-[25%] text-center">Thành tiền</th>
            <th className="w-[5%] text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <td className="py-4">
              <div className="flex gap-3 items-center">
                <div className="w-[50px] h-[50px] bg-blue-100 dark:bg-blue-950/50 p-2 rounded-md overflow-hidden">
                  <img
                    src="/images/products/product.png"
                    alt="product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-blue-950 dark:text-pink-600">
                    Sản phẩm
                  </span>
                  <div className="flex gap-2 text-xs text-gray-500">
                    <span className="font-semibold">Option:</span>
                    <span>Option 1</span>
                  </div>
                </div>
              </div>
            </td>
            <td className="text-center font-semibold text-sm text-blue-950 dark:text-gray-500">
              100.000đ
            </td>
            <td className="text-center">
              <div className="inline-flex items-center justify-center gap-2 border rounded px-2">
                <button className="text-gray-500 hover:text-blue-600">-</button>
                <input
                  type="text"
                  defaultValue={1}
                  className="w-8 text-center outline-none"
                />
                <button className="text-gray-500 hover:text-blue-600">+</button>
              </div>
            </td>
            <td className="text-center font-semibold text-sm text-red-500 dark:text-red-500/80">
              100.000đ
            </td>
            <td className="text-center">
              <IconTrash
                width={20}
                height={20}
                className="cursor-pointer text-red-400 hover:text-red-600"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartDesktop;
