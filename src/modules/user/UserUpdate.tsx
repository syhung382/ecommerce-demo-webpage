import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../../components/layouts/Heading";
import DashboardBody from "../../components/layouts/DashboardBody";
import { toast } from "react-toastify";
import UserForm from "./UserForm";

const UserUpdate = () => {
  const [userId, setUserId] = useState<number>();

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
    document.title = "Quản trị | Thêm mới tài khoản";
  }, []);

  useEffect(() => {
    if (currentId) {
      const idNumber = Number(currentId);
      if (!isNaN(idNumber)) {
        setUserId(idNumber);
      } else {
        toast.error("Id không hợp lệ!");
        handleBack();
      }
    }
  }, [currentId]);

  return (
    <>
      <Heading>Quản lý thành viên</Heading>
      <DashboardBody
        title="Thêm mới"
        buttonTitle="Trở lại"
        buttonColor="secondary"
        onClick={handleBack}
      >
        <UserForm id={userId} handleSuccess={handleBack} />
      </DashboardBody>
    </>
  );
};

export default UserUpdate;
