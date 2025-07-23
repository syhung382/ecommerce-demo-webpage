import { useEffect } from "react";
import { clientSiderBarMenuPath } from "../utils/constants";
import type { MapItemProps } from "../utils/interface";
import MapComponent from "../components/other/MapComponent";
import Offer from "../modules/others/Offer";
import { Link } from "react-router-dom";

const mapList: MapItemProps[] = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Về chúng tôi",
    url: "/" + clientSiderBarMenuPath.About,
  },
];

const AboutUs = () => {
  useEffect(() => {
    document.title = "Về chúng tôi";
  }, []);

  return (
    <>
      <MapComponent title="Về chúng tôi" mapItem={mapList} />
      <div className="w-full px-10 lg:px-30 xl:px-60 py-10 lg:py-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
          <img
            src="/images/about-img.png"
            alt="about"
            className="w-full rounded-lg"
          />
          <div className="py-10 flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-blue-950 text-center lg:text-left">
              Know About Our Ecommerce Business, History
            </h1>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis
              neque ultrices mattis aliquam, malesuada diam est. Malesuada sem
              tristique amet erat vitae eget dolor lobortis. Accumsan faucibus
              vitae lobortis quis bibendum quam.
            </p>
            <div className="w-full flex justify-center md:justify-start mt-10">
              <Link
                to={`/${clientSiderBarMenuPath.Contact}`}
                className="px-10 py-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold w-fit rounded-md cursor-pointer"
              >
                Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Offer />
      <div className="w-full px-10 lg:px-30 xl:px-60 py-10 lg:py-20">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-950 dark:text-blue-800 px-4">
          Khách hàng của chúng tôi
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6 mt-10 lg:mt-20">
          <div className="text-center">
            <img
              src="/images/customer.png"
              alt="customer"
              className="w-[60%] mx-auto"
            />
            <h2 className="text-2xl font-semibold text-blue-950 dark:text-blue-800 mt-5 lg:mt-8">
              Selina Gomez
            </h2>
            <span className="text-xs text-gray-500">Ceo At Webecy Digital</span>
            <p className="text-xs text-gray-500 font-semibold mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis
              ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a
              enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor
              aliquam lacus volutpat praesent.
            </p>
          </div>
          <div className="text-center">
            <img
              src="/images/customer.png"
              alt="customer"
              className="w-[60%] mx-auto"
            />
            <h2 className="text-2xl font-semibold text-blue-950 dark:text-blue-800 mt-5 lg:mt-8">
              Selina Gomez
            </h2>
            <span className="text-xs text-gray-500">Ceo At Webecy Digital</span>
            <p className="text-xs text-gray-500 font-semibold mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis
              ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a
              enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor
              aliquam lacus volutpat praesent.
            </p>
          </div>
          <div className="text-center">
            <img
              src="/images/customer.png"
              alt="customer"
              className="w-[60%] mx-auto"
            />
            <h2 className="text-2xl font-semibold text-blue-950 dark:text-blue-800 mt-5 lg:mt-8">
              Selina Gomez
            </h2>
            <span className="text-xs text-gray-500">Ceo At Webecy Digital</span>
            <p className="text-xs text-gray-500 font-semibold mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non duis
              ultrices quam vel dui sollicitudin aliquet id arcu. Nam vitae a
              enim nunc, sed sapien egestas ac nam. Tristique ultrices dolor
              aliquam lacus volutpat praesent.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
