import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminSideBarMenuPath } from "../../utils/constants";
import Heading from "../../components/layouts/Heading";
import DashboardBody from "../../components/layouts/DashboardBody";
import UserTable from "./UserTable";

const UserManager = () => {
  const navigate = useNavigate();

  const handleNavigateAdd = () => {
    navigate(`../${adminSideBarMenuPath.MemberAdd}`);
  };
  useEffect(() => {
    document.title = "Quản trị | Thành viên";
  }, []);

  return (
    <>
      <Heading>Quản lý thành viên</Heading>
      <DashboardBody
        title="Danh sách thành viên"
        buttonTitle="Thêm thành viên"
        onClick={handleNavigateAdd}
      >
        <UserTable navigate={navigate}></UserTable>
      </DashboardBody>
    </>
  );
};

export default UserManager;
