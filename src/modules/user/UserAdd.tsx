import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/layouts/Heading";
import DashboardBody from "../../components/layouts/DashboardBody";
import UserForm from "./UserForm";

const UserAdd = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history?.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    document.title = "Quản trị | Thêm mới tài khoản";
  }, []);
  return (
    <>
      <Heading>Quản lý thành viên</Heading>
      <DashboardBody
        title="Thêm mới"
        buttonTitle="Trở lại"
        buttonColor="secondary"
        onClick={handleBack}
      >
        <UserForm handleSuccess={handleBack} />
      </DashboardBody>
    </>
  );
};

export default UserAdd;
