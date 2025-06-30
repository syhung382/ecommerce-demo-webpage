import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="text-gray-900 dark:text-gray-400">
      <Outlet></Outlet>
    </div>
  );
};

export default ClientLayout;
