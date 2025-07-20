const Discount = () => {
  return (
    <div className="mt-20 w-full max-w-[99vw] grid grid-cols-1 lg:grid-cols-2 gap-4 px-10 lg:px-30 xl:px-60">
      <div className="p-7 bg-pink-100 relative h-[270px]">
        <h3 className=" text-2xl font-bold text-blue-950 cursor-pointer">
          Giảm giá 23% tất cả sản phẩm
        </h3>
        <span className="text-lg font-medium underline decoration-1 text-pink-600 decoration-pink-600 underline-offset-4">
          Mua ngay
        </span>
        <img
          src="/images/image1162.png"
          alt="image"
          className="absolute bottom-0 right-0"
        />
      </div>
      <div className="p-7 bg-blue-100 relative h-[270px]">
        <h3 className=" text-2xl font-bold text-blue-950 cursor-pointer">
          Giảm giá 23% tất cả sản phẩm
        </h3>
        <span className="text-lg font-medium underline decoration-1 text-pink-600 decoration-pink-600 underline-offset-4">
          Mua ngay
        </span>
        <img
          src="/images/image1162.png"
          alt="image"
          className="absolute bottom-0 right-0"
        />
      </div>
    </div>
  );
};

export default Discount;
