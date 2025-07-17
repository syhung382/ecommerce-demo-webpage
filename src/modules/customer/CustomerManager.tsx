import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminSideBarMenuPath } from "../../utils/constants";
import Heading from "../../components/layouts/Heading";
import DashboardBody from "../../components/layouts/DashboardBody";
import CustomerTable from "./CustomerTable";

const CustomerManager = () => {
  const navigate = useNavigate();

  const handleNavigateAdd = () => {
    navigate(`../${adminSideBarMenuPath.CustomerAdd}`);
  };
  useEffect(() => {
    document.title = "Quản trị | Khách hàng";
  }, []);

  return (
    <>
      <Heading>Quản lý khách hàng</Heading>
      <DashboardBody
        title="Danh sách khách hàng"
        buttonTitle="Thêm khách hàng"
        onClick={handleNavigateAdd}
      >
        <CustomerTable navigate={navigate}></CustomerTable>
      </DashboardBody>
    </>
  );
};

export default CustomerManager;
