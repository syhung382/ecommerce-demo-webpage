import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { IconChevronLeft, IconChevronRight } from "../../components/icons";

const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ProductFeature = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  const goToNextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % totalSlides);

  const goToPrevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  //auto
  useEffect(() => {
    const timer = setInterval(goToNextSlide, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-20 w-full max-w-[99vw] overflow-x-hidden">
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-950 dark:text-blue-800 px-4">
        Sản phẩm nổi bật
      </h2>

      <div className="mt-10 relative w-full overflow-hidden">
        {/* Slider container */}
        <div
          className="flex transition-transform duration-700"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 px-10 lg:px-40 xl:px-60"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .slice(
                    index * itemsPerSlide,
                    index * itemsPerSlide + itemsPerSlide
                  )
                  .map((item) => (
                    <ProductItem key={item} />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white shadow cursor-pointer"
          onClick={goToPrevSlide}
        >
          <IconChevronLeft width={20} />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white shadow cursor-pointer"
          onClick={goToNextSlide}
        >
          <IconChevronRight width={20} />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-3 mt-4">
        {Array.from({ length: totalSlides }).map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-[4px] transition-all duration-300 cursor-pointer ${
              currentSlide === idx
                ? "w-4 bg-pink-700 h-[3zpx]"
                : "w-3 bg-gray-400 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductFeature;
