import { Link } from "react-router-dom";
import { clientSiderBarMenuPath } from "../../utils/constants";

const ProductRelatedItem = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full max-h-[300px] h-full p-2 bg-blue-100">
        <img
          src="/images/products/product.png"
          alt="product"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <Link
          className="text-lg font-semibold text-blue-900"
          to={`/${clientSiderBarMenuPath.ProductDetail}/san-pham`}
        >
          Sản phẩm
        </Link>
        <span className="text-sm font-semibold text-pink-600">100.000đ</span>
      </div>
    </div>
  );
};

export default ProductRelatedItem;
