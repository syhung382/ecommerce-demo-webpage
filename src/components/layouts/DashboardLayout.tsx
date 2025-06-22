import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSideBar from "./DashboardSideBar";
import DashboardSideBarMenu from "./DashboardSideBarMenu";
import { IconPlus } from "../icons";

const DashboardLayout = () => {
  return (
    <div className="relative">
      <DashboardHeader></DashboardHeader>
      <main className="relative w-full lg:mt-12">
        <DashboardSideBar></DashboardSideBar>
        <div className="bg-red-500 flex-1 lg:ml-[300px] mb-12 lg:mb-0 z-30">
          <IconPlus></IconPlus>
          <Outlet></Outlet>
        </div>
        <DashboardSideBarMenu></DashboardSideBarMenu>
      </main>
    </div>
  );
};

export default DashboardLayout;
