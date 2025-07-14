import { useEffect } from "react";
import Heading from "../../components/layouts/Heading";
import ProductTable from "./ProductTable";
import DashboardBody from "../../components/layouts/DashboardBody";
import { useNavigate } from "react-router-dom";
import { adminSideBarMenuPath } from "../../utils/constants";

const ProductManager = () => {
  const navigate = useNavigate();

  const handleNavigateAdd = () => {
    navigate(`../${adminSideBarMenuPath.ProductAdd}`);
  };
  useEffect(() => {
    document.title = "Quản trị | Sản phẩm";
  }, []);

  return (
    <>
      <Heading>Quản lý sản phẩm</Heading>
      <DashboardBody
        title="Danh sách sản phẩm"
        buttonTitle="Thêm sản phẩm"
        onClick={handleNavigateAdd}
      >
        <ProductTable navigate={navigate}></ProductTable>
      </DashboardBody>
    </>
  );
};

export default ProductManager;
