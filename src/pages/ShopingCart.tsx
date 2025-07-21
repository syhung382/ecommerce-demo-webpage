import { Link } from "react-router-dom";
import MapComponent from "../components/other/MapComponent";
import { clientSiderBarMenuPath } from "../utils/constants";
import type { MapItemProps } from "../utils/interface";
import CartDesktop from "../modules/checkout/CartDesktop";
import CartMobile from "../modules/checkout/CartMobile";

const mapList: MapItemProps[] = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Giỏ hàng",
    url: "/" + clientSiderBarMenuPath.Cart,
  },
];

const ShopingCart = () => {
  return (
    <>
      <MapComponent title="Giỏ hàng" mapItem={mapList} />
      <div className="my-10 lg:my-20 mx-4 md:mx-10 lg:mx-20 xl:mx-60 grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div className="lg:col-span-4 overflow-x-auto">
          <CartDesktop />
          <CartMobile />
        </div>

        <div className="lg:col-span-2">
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
            >
              Tiến hành thanh toán
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopingCart;
