import { Outlet } from "react-router-dom";
import ClientMenu from "./ClientMenu";
import ClientCopyright from "./ClientCopyright";
import Fotter from "../../modules/others/Fotter";

const ClientLayout = () => {
  return (
    <>
      <div className="min-h-screen min-w-screen overflow-hidden text-gray-900 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <div className="py-3 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 fixed top-0 left-0 right-0 z-50">
          <ClientMenu />
        </div>
        <div className="pt-14">
          <Outlet />
        </div>
        <Fotter />
        <ClientCopyright />
      </div>
    </>
  );
};

export default ClientLayout;
