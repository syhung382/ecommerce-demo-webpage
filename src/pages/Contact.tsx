import { useEffect } from "react";
import { clientSiderBarMenuPath } from "../utils/constants";
import type { MapItemProps } from "../utils/interface";
import MapComponent from "../components/other/MapComponent";

const mapList: MapItemProps[] = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Liên hệ",
    url: "/" + clientSiderBarMenuPath.Contact,
  },
];

const Contact = () => {
  useEffect(() => {
    document.title = "Liên hệ";
  }, []);

  return (
    <>
      <MapComponent title="Liên hệ" mapItem={mapList} />
      <div className="w-full px-10 lg:px-30 xl:px-60 py-10 lg:py-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full flex flex-col justify-between items-center lg:items-start text-center lg:text-left gap-4">
            <div className="w-full">
              <h2 className="text-2xl font-bold text-blue-950 dark:text-blue-800">
                Về chúng tôi
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellendus incidunt, molestias quisquam reprehenderit saepe
                deserunt quasi ullam perspiciatis id a. Maiores molestias iusto
                necessitatibus delectus corporis ipsam mollitia, quod
                consectetur.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="w-6 h-6 bg-blue-800 rounded-full"></div>
              <div className="w-6 h-6 bg-pink-600 rounded-full"></div>
              <div className="w-6 h-6 bg-cyan-500 rounded-full"></div>
            </div>
          </div>
          <div className="w-full ">
            <h2 className="text-2xl font-bold text-blue-950 dark:text-blue-800 text-center lg:text-left">
              Thông tin liên lạc
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5 mt-2">
              <div className="flex gap-2 items-center">
                <div className="w-10 h-10 bg-blue-800 rounded-full shrink-0"></div>
                <div className="text-xs font-semibold text-gray-400 flex flex-col">
                  <span>Điện thoại: 0123-456-789</span>
                  <span>Email: sho@store.com</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-10 h-10 bg-pink-600 rounded-full shrink-0"></div>
                <div className="text-xs font-semibold text-gray-400 flex flex-col">
                  <span>Diễn đàn hỗ trợ</span>
                  <span>24/7</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-10 h-10 bg-orange-300 rounded-full shrink-0"></div>
                <div className="text-xs font-semibold text-gray-400 flex flex-col">
                  <span>20 Margaret st, London</span>
                  <span>Great britain, 3NM98-LK</span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full shrink-0"></div>
                <div className="text-xs font-semibold text-gray-400 flex flex-col">
                  <span>Vận chuyển miễn phí</span>
                  <span>Cho tất cả đơn hàng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-10 lg:px-30 xl:px-60 py-10 lg:py-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="w-full">
            <h2 className="text-2xl font-bold text-blue-950 dark:text-blue-800">
              Liên hệ
            </h2>
            <span className="text-xs text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices tristique amet erat vitae eget dolor los vitae
              lobortis quis bibendum quam.
            </span>

            <div className="w-full mt-4 lg:mt-10 flex flex-col gap-4 lg:gap-8">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Tên của bạn *"
                  className="border w-full border-gray-300 text-blue-950 dark:text-gray-300 placeholder:text-gray-500 rounded-md px-3 py-2 shadow-sm hover:border-blue-300 focus:border-blue-400 outline-none transition"
                />
                <input
                  type="text"
                  placeholder="Email *"
                  className="border w-full border-gray-300 text-blue-950 dark:text-gray-300 placeholder:text-gray-500 rounded-md px-3 py-2 shadow-sm hover:border-blue-300 focus:border-blue-400 outline-none transition"
                />
              </div>
              <input
                type="text"
                placeholder="Tiêu đề"
                className="border w-full border-gray-300 text-blue-950 dark:text-gray-300 placeholder:text-gray-500 rounded-md px-3 py-2 shadow-sm hover:border-blue-300 focus:border-blue-400 outline-none transition"
              />
              <textarea
                placeholder="Nhập nội dung..."
                className="border border-gray-300 text-blue-950 dark:text-gray-300 placeholder:text-gray-500 rounded-md px-3 py-2 h-32 resize-none shadow-sm hover:border-blue-300 focus:border-blue-400 outline-none transition"
              ></textarea>
              <button
                className="w-fit px-6 py-2 text-center text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 rounded-md transform cursor-pointer"
                type="button"
              >
                Gửi email
              </button>
            </div>
          </div>
          <div className="w-full">
            <img
              src="/images/contact-img.png"
              alt="Liên hệ"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
