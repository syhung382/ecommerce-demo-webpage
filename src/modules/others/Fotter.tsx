const Fotter = () => {
  return (
    <div className="w-[100vw] bg-blue-100/50 dark:bg-blue-900/20 mt-10">
      <div className="py-10 lg:py-20 px-10 lg:px-40 xl:px-60 grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold mb-2">Về chúng tôi</h3>
          <div className="flex dark:border-gray-600 my-4">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="border-none outline-none px-4 py-2 text-sm font-semibold dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
            />
            <div className="flex items-center justify-center cursor-pointer text-sm px-6 text-white dark:text-gray-200 bg-pink-500 dark:bg-pink-600/80">
              Đăng ký
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Đây là phần giới thiệu chung hoặc logo công ty. Thông tin về thương
            hiệu, sứ mệnh, v.v.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Hỗ trợ</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>Hướng dẫn</li>
            <li>Chính sách</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Tài khoản</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>Đăng nhập</li>
            <li>Đăng ký</li>
            <li>Giỏ hàng</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Kết nối</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>Facebook</li>
            <li>Zalo</li>
            <li>Email</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Fotter;
