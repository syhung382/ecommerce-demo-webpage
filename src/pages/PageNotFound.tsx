import { useEffect, useState } from "react";
import LoadingComponent from "../components/layouts/LoadingComponent";
import { IconNotFound } from "../components/icons";
import type { MapItemProps } from "../utils/interface";
import MapComponent from "../components/other/MapComponent";
import { Link } from "react-router-dom";

const mapList: MapItemProps[] = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "404 Not Found!",
    url: "/",
  },
];

const PageNotFound = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "404 Not Found!";

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingComponent></LoadingComponent>;

  return (
    <div className="lg:min-h-[calc(100vh-3.5rem)] w-full flex flex-col items-center justify-center relative">
      <MapComponent title="Cửa hàng" mapItem={mapList} />
      <IconNotFound className="max-w-[80%] lg:max-w-[60%]" />

      <div className="mt-[-40px] lg:mt-0 lg:absolute lg:bottom-10 items-center text-center flex flex-col mx-10">
        <h1 className="font-bold text-lg lg:text-2xl text-blue-900">
          Ops!!! Không tìm thấy trang bạn yêu cầu!
        </h1>
        <Link
          className="mt-4 lg:mt-10 px-6 py-2 rounded-md text-sm lg:text-ba bg-pink-600 text-blue-100 font-bold"
          to={`/`}
        >
          Trở lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
