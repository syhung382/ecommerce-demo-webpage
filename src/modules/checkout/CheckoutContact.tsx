import { Link } from "react-router-dom";
import { clientSiderBarMenuPath } from "../../utils/constants";
import type { CheckoutContactProps } from "../../utils/interface";

const CheckoutContact = ({ onSubmit }: CheckoutContactProps) => {
  return (
    <div className="my-10 lg:my-20 mx-4 md:mx-10 lg:mx-20 xl:mx-60 grid grid-cols-1 lg:grid-cols-6 gap-6">
      <div className="lg:col-span-4 overflow-x-auto bg-blue-100/50 dark:bg-gray-700/50 rounded-lg p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-pink-600">
            Thông tin liên lạc
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border-b border-gray-300 outline-none py-2 mb-3 text-sm"
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            className="w-full border-b border-gray-300 outline-none py-2 mb-3 text-sm"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-blue-900 dark:text-pink-600 mb-4">
            Địa chỉ
          </h2>
          <input
            type="text"
            placeholder="Họ và tên"
            className="border-b w-full border-gray-300 outline-none py-2 text-sm mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Quốc gia"
              className="border-b border-gray-300 outline-none py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="border-b border-gray-300 outline-none py-2 text-sm"
            />
          </div>
          <input
            type="text"
            placeholder="Tỉnh, thành phố"
            className="w-full border-b border-gray-300 outline-none py-2 mb-4 text-sm"
          />
          <input
            type="text"
            placeholder="Quận, huyện, xã"
            className="w-full border-b border-gray-300 outline-none py-2 mb-4 text-sm"
          />

          <input
            type="text"
            placeholder="Địa chỉ chi tiết"
            className="w-full border-b border-gray-300 outline-none py-2 mb-4 text-sm"
          />
        </div>

        <div className="mt-6">
          <Link
            to={`/${clientSiderBarMenuPath.Product}`}
            className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition items-center"
          >
            Tiếp tục mua hàng
          </Link>
        </div>
      </div>

      <div className="lg:col-span-2 h-fit">
        <div className="p-4 bg-blue-100/50 dark:bg-gray-700/50 rounded-lg h-full flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center text-blue-900 dark:text-pink-600">
              Tóm tắt đơn hàng
            </h3>
            <div className="flex justify-between text-sm mb-2 border-b border-gray-300 py-3">
              <span>Tạm tính:</span>
              <span>100.000đ</span>
            </div>

            <div className="mt-4">
              <label
                htmlFor="coupon"
                className="block text-sm font-medium text-blue-900 dark:text-pink-600 mb-1"
              >
                Mã giảm giá
              </label>
              <div className="flex gap-2">
                <input
                  id="coupon"
                  type="text"
                  placeholder="Nhập mã..."
                  className="px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition cursor-pointer text-sm">
                  Áp dụng
                </button>
              </div>
            </div>

            <div className="flex justify-between text-sm font-semibold border-b border-gray-300 py-3 text-red-500 dark:text-red-500/80">
              <span>Tổng cộng:</span>
              <span>100.000đ</span>
            </div>
          </div>

          {/* Nút thanh toán */}
          <Link
            to={`/${clientSiderBarMenuPath.Checkout}`}
            className="mt-6 bg-green-500 dark:bg-green-700 text-white dark:text-gray-300 py-2 rounded hover:bg-green-600 dark:hover:bg-green- transition cursor-pointer text-center"
            onClick={onSubmit ? () => onSubmit(true) : () => {}}
          >
            Tiến hành thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContact;
