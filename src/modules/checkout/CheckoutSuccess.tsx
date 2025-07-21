import { Link } from "react-router-dom";
import { clientSiderBarMenuPath } from "../../utils/constants";
import { IconCheck } from "../../components/icons";

const CheckoutSuccess = () => {
  return (
    <div className="max-w-[600px] px-10 lg:px-0 flex flex-col gap-6 justify-center items-center text-center mx-auto my-10 lg:my-20">
      <IconCheck width={30} />
      <h1 className="text-2xl font-bold text-blue-950 dark:text-blue-700">
        Đặt hàng thành công!
      </h1>
      <span className="text-sm font-semibold text-gray-500">
        Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đang được xử lý và sẽ hoàn tất
        trong vòng 3-6 giờ. Bạn sẽ nhận được email xác nhận khi đơn hàng hoàn
        tất.
      </span>
      <Link
        to={`/${clientSiderBarMenuPath.Product}`}
        className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition items-center"
      >
        Tiếp tục mua hàng
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
