import { useEffect } from "react";
import DashboardBody from "../../components/layouts/DashboardBody";
import Heading from "../../components/layouts/Heading";
import ProductForm from "./ProductForm";
import { useNavigate, useSearchParams } from "react-router-dom";

const ProductUpdate = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const currentId: string | null = params.get("id");

  const handleBack = () => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    document.title = "Quản trị | Cập nhật sản phẩm";
  }, []);
  return (
    <>
      <Heading>Quản lý sản phẩm</Heading>
      <DashboardBody
        title="Cập nhật"
        buttonTitle="Trở lại"
        buttonColor="secondary"
        onClick={handleBack}
      >
        <ProductForm id={currentId} handleSuccess={handleBack} />
      </DashboardBody>
    </>
  );
};

export default ProductUpdate;
