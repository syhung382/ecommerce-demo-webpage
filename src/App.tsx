import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import ClientLayout from "./components/layouts/ClientLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<ClientLayout></ClientLayout>}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Route>

          <Route path="/admin" element={<DashboardLayout></DashboardLayout>}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
