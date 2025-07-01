import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Quản trị | Dashboard";
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
