import { useParams } from "react-router-dom";
import MapComponent from "../components/other/MapComponent";
import { clientSiderBarMenuPath } from "../utils/constants";
import type { MapItemProps } from "../utils/interface";
import ProductDetailListImage from "../modules/stores/ProductDetailListImage";
import {
  IconFacebookRound,
  IconHeart,
  IconInstagramRound,
  IconTwitterRound,
} from "../components/icons";
import ProductRelated from "../modules/stores/ProductRelated";
import { useEffect } from "react";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const mapList: MapItemProps[] = [
    {
      title: "Trang chủ",
      url: "/",
    },
    {
      title: "Cửa hàng",
      url: "/" + clientSiderBarMenuPath.Product,
    },
    {
      title: "Sản phẩm 1",
      url: "/" + clientSiderBarMenuPath.ProductDetail + "/" + slug,
    },
  ];

  useEffect(() => {
    document.title = "Sản phẩm 1";
  }, []);

  return (
    <>
      <MapComponent title="Sản phẩm" mapItem={mapList} />

      <div className="my-10 lg:my-20 px-6 md:px-10 lg:px-30 xl:px-60">
        <div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <img
                src="/images/products/product.png"
                alt="Product"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex gap-2 justify-center">
              <ProductDetailListImage />
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-blue-950 dark:text-white">
              Tên sản phẩm
            </h1>
            <div className="flex gap-x-3">
              <p className="text-lg font-semibold text-blue-900 dark:text-gray-400 ">
                100.000đ
              </p>
              <p className="text-sm font-semibold text-pink-600  line-through">
                100.000đ
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus libero nam dolore. Quae explicabo, ullam dicta
              doloremque omnis odio eius b
            </p>
            <div className="flex gap-x-4 items-center">
              <button className="px-6 py-2 rounded-md w-max cursor-pointer border border-blue-900 text-blue-900 hover:text-pink-600 hover:border-pink-600">
                Thêm vào giỏ hàng
              </button>
              <IconHeart
                width={30}
                height={30}
                className="text-blue-900 cursor-pointer hover:text-pink-600"
              />
            </div>
            <div className="flex gap-x-4 items-baseline">
              <h1 className="text-lg font-bold text-blue-950 dark:text-white">
                Danh mục:
              </h1>
              <p className="text-sm font-semibold text-blue-950/90">
                Danh mục 1
              </p>
            </div>
            <div className="flex gap-x-4 items-baseline">
              <h1 className="text-lg font-bold text-blue-950 dark:text-white">
                Tag:
              </h1>
              <div className="flex flex-wrap-reverse gap-3">
                <p className="text-sm font-semibold text-blue-950/80">#Tag 1</p>
                <p className="text-sm font-semibold text-blue-950/80">#Tag 1</p>
                <p className="text-sm font-semibold text-blue-950/80">#Tag 1</p>
              </div>
            </div>
            <div className="flex gap-x-4 items-baseline">
              <h1 className="text-lg font-bold text-blue-950 dark:text-white">
                Chia sẻ:
              </h1>
              <div className="flex gap-x-2 items-baseline">
                <IconFacebookRound
                  width={20}
                  height={20}
                  className="text-blue-800 cursor-pointer"
                />
                <IconTwitterRound
                  width={20}
                  height={20}
                  className="text-blue-800 cursor-pointer"
                />
                <IconInstagramRound
                  width={20}
                  height={20}
                  className="text-pink-700 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="flex flex-col gap-2 lg:flex-row lg:gap-10 items-center">
            <span className="text-lg font-bold text-pink-600 underline decoration-1 decoration-pink-600 underline-offset-4">
              Chi tiết sản phẩm
            </span>
            <span className="text-lg font-bold text-blue-950">Thông số</span>
            <span className="text-lg font-bold text-blue-950">Đánh giá</span>
          </div>
          <div className="mt-10 space-y-4">
            <span className="text-lg font-semibold text-blue-950">
              Vitae veritatis
            </span>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
              veritatis reiciendis aperiam asperiores assumenda dolor, sequi
              illum minima quae quasi! Nostrum nobis sapiente vel rerum
              perspiciatis! Earum fugiat nostrum cupiditate?
            </p>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
              quibusdam, eum itaque repudiandae assumenda dolor, repellendus
              repellat vitae reiciendis consectetur iure quisquam, est nesciunt
              alias? Sapiente in perferendis ab eligendi.
            </p>

            <span className="text-lg font-semibold text-blue-950">
              Vitae veritatis
            </span>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
              veritatis reiciendis aperiam asperiores assumenda dolor, sequi
              illum minima quae quasi! Nostrum nobis sapiente vel rerum
              perspiciatis! Earum fugiat nostrum cupiditate?
            </p>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi
              quibusdam, eum itaque repudiandae assumenda dolor, repellendus
              repellat vitae reiciendis consectetur iure quisquam, est nesciunt
              alias? Sapiente in perferendis ab eligendi.
            </p>
          </div>
        </div>
        <ProductRelated />
      </div>
    </>
  );
};

export default ProductDetailPage;
