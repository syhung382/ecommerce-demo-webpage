import { useEffect } from "react";
import Slider from "../modules/home/Slider";
import ProductFeature from "../modules/product/ProductFeature";
import ProductLatest from "../modules/product/ProductLatest";
import Offer from "../modules/others/Offer";
import ProductTrending from "../modules/product/ProductTrending";
import Discount from "../modules/others/Discount";
import ProductSale from "../modules/product/ProductSale";
import BannerBottom from "../modules/others/BannerBottom";
import HomeBlog from "../modules/blog/HomeBlog";

const HomePage = () => {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  return (
    <div className="">
      {/* slider */}
      <Slider />
      {/* Feature product */}
      <ProductFeature />
      <ProductLatest />
      <Offer />
      <ProductTrending />
      <Discount />
      <ProductSale />
      <BannerBottom />
      <HomeBlog />
    </div>
  );
};

export default HomePage;
