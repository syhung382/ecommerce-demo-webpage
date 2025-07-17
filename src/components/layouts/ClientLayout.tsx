import { Outlet } from "react-router-dom";
import ClientMenu from "./ClientMenu";

const ClientLayout = () => {
  return (
    <div className="min-h-screen min-w-screen overflow-hidden text-gray-900 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
      <div className="py-3 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
        <ClientMenu />
      </div>
      <Outlet />
    </div>
  );
};

export default ClientLayout;
