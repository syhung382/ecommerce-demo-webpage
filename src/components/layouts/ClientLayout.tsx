import { Outlet } from "react-router-dom";
import ClientMenu from "./ClientMenu";
import ClientCopyright from "./ClientCopyright";
import Fotter from "../../modules/others/Fotter";

const ClientLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen min-w-screen overflow-hidden text-gray-900 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
        <ClientMenu />

        <div className="flex-grow pt-14">
          <Outlet />
        </div>
        <Fotter />
        <ClientCopyright />
      </div>
    </>
  );
};

export default ClientLayout;
