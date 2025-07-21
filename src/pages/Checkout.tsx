import { useState } from "react";
import MapComponent from "../components/other/MapComponent";
import CheckoutContact from "../modules/checkout/CheckoutContact";
import CheckoutSuccess from "../modules/checkout/CheckoutSuccess";
import { clientSiderBarMenuPath } from "../utils/constants";
import type { MapItemProps } from "../utils/interface";

const mapList: MapItemProps[] = [
  {
    title: "Trang chủ",
    url: "/",
  },
  {
    title: "Thanh toán",
    url: "/" + clientSiderBarMenuPath.Checkout,
  },
];

const Checkout = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSetSuccess = (value: boolean) => {
    setIsSuccess(value);
  };

  return (
    <>
      <MapComponent title="Thanh toán" mapItem={mapList} />
      {isSuccess ? (
        <CheckoutSuccess />
      ) : (
        <CheckoutContact onSubmit={handleSetSuccess} />
      )}
    </>
  );
};

export default Checkout;
