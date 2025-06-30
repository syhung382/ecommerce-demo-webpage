import { lazy, Suspense, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const CategoriesManager = lazy(
  () => import("./modules/categories/CategoriesManager")
);

import ClientLayout from "./components/layouts/ClientLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "./hooks/hook";
import { adminSideBarMenuPath, localStorageName } from "./utils/constants";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { handleCheckUserAsync } from "./stores/handles";

function App() {
  const darkMode = useAppSelector((state) => state.global.darkMode);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const body = document.body;
    body.classList.add("transition-colors", "duration-300", "ease-in-out");
  }, []);

  const didRunRef = useRef(false);

  useEffect(() => {
    if (didRunRef.current) return;
    didRunRef.current = true;

    const userToken = localStorage.getItem(localStorageName.USERTOKEN);

    if (userToken) dispatch(handleCheckUserAsync());
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<ClientLayout></ClientLayout>}>
            <Route index element={<HomePage />} />

            <Route path="sign-in" element={<LoginPage />} />
            <Route path="sign-up" element={<RegisterPage />} />
            <Route path="*" element={<PageNotFound></PageNotFound>} />
          </Route>

          <Route path="/admin" element={<DashboardLayout></DashboardLayout>}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard></Dashboard>} />
            <Route
              path={adminSideBarMenuPath.CategoryManager}
              element={<CategoriesManager></CategoriesManager>}
            />
            <Route path="*" element={<PageNotFound></PageNotFound>} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
