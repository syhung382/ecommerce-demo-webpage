import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import { adminSideBarMenuPath } from "../utils/constants";
import CategoryUpdate from "../modules/categories/CategoryUpdate";

const ClientLayout = lazy(() => import("../components/layouts/ClientLayout"));
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

const DashboardLayout = lazy(
  () => import("../components/layouts/DashboardLayout")
);
const Dashboard = lazy(() => import("../pages/Dashboard"));
const CategoriesManager = lazy(
  () => import("../modules/categories/CategoriesManager")
);
const CategoriesAdd = lazy(() => import("../modules/categories/CategoriesAdd"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "sign-in", element: <LoginPage /> },
      { path: "sign-up", element: <RegisterPage /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: adminSideBarMenuPath.CategoryManager,
        element: <CategoriesManager />,
      },
      {
        path: adminSideBarMenuPath.CategoryAdd,
        element: <CategoriesAdd />,
      },
      {
        path: adminSideBarMenuPath.CategoryUpdate,
        element: <CategoryUpdate />,
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);
