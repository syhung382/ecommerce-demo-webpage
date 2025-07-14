import { useEffect } from "react";
import DashboardBody from "../../components/layouts/DashboardBody";
import Heading from "../../components/layouts/Heading";
import ProductForm from "./ProductForm";
import { useNavigate } from "react-router-dom";

const ProductAdd = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    document.title = "Quản trị | Thêm mới sản phẩm";
  }, []);
  return (
    <>
      <Heading>Quản lý sản phẩm</Heading>
      <DashboardBody
        title="Thêm mới"
        buttonTitle="Trở lại"
        buttonColor="secondary"
        onClick={handleBack}
      >
        <ProductForm id={null} handleSuccess={handleBack} />
      </DashboardBody>
    </>
  );
};

export default ProductAdd;
