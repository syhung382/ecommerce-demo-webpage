const BannerBottom = () => {
  return (
    <div
      className="relative w-full h-[300px] bg-cover bg-center flex items-center justify-center text-center px-4 mt-10"
      style={{ backgroundImage: "url('/images/image-bottom.png')" }}
    >
      <div className="p-6 rounded-md text-blue-900 max-w-[600px]">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Nhận thông tin cập nhật mới nhất bằng cách đăng ký Bản tin của chúng
          tôi
        </h2>
        <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md font-semibold transition cursor-pointer">
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
};

export default BannerBottom;
