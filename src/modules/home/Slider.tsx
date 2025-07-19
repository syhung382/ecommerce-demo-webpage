import { useEffect, useState } from "react";
import { slides } from "../../utils/defaultValue";
import { IconChevronLeft, IconChevronRight } from "../../components/icons";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const goToNextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const goToPrevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  //auto
  useEffect(() => {
    const timer = setInterval(goToNextSlide, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative grid items-center bg-gray-200 dark:bg-gray-700/60 w-full h-[450px] max-w-[100vw] overflow-hidden"
      style={{ backgroundImage: "url('/images/image-bottom.png')" }}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          //item
          <div key={idx} className=" min-w-full  grid">
            <div className="w-full max-w-[80%] mx-auto flex flex-col align-center">
              <span className="text-sm font-semibold text-pink-600">
                {slide.subtitle}
              </span>
              <h2 className="text-xl lg:text-3xl font-bold my-2 text-blue-900">
                {slide.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-600 text-sm mb-4">
                {slide.content}
              </p>
              <div>
                <button
                  type="button"
                  className="px-4 py-2 bg-pink-600 text-sm lg:text-base text-white font-semibold rounded hover:bg-pink-700 transition cursor-pointer"
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white shadow cursor-pointer"
        onClick={goToPrevSlide}
      >
        <IconChevronLeft className="w-3 md:w-5" />
      </button>
      <button
        className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white shadow cursor-pointer"
        onClick={goToNextSlide}
      >
        <IconChevronRight className="w-3 md:w-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentSlide
                ? "bg-pink-600"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
