import { Outlet, useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSideBar from "./DashboardSideBar";
import DashboardSideBarMenu from "./DashboardSideBarMenu";
import { localStorageName } from "../../utils/constants";
import { useEffect } from "react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem(localStorageName.USERTOKEN);

  useEffect(() => {
    if (!userToken) navigate("/sign-in");
  }, [userToken]);

  if (!userToken) return null;

  return (
    <div className="min-h-screen flex flex-col overflow-hidden  text-gray-500 dark:text-gray-400">
      <DashboardSideBar></DashboardSideBar>
      <main className="flex-1 mb-12 lg:mb-0 lg:ml-[290px] dark:bg-gray-900 bg-gray-100  relative">
        <DashboardHeader />

        <div className="flex-1 mb-12 lg:mb-0 z-30 px-5 py-5">
          <Outlet />
        </div>
        <DashboardSideBarMenu />
      </main>
    </div>
  );
};

export default DashboardLayout;
