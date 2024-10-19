import { createBrowserRouter } from "react-router-dom";

import DashboardPage from "../pages/Dashboard";
import LoginPage from "../pages/Login";
import SettingPage from "../pages/Setting";
import CategoryPage from "../pages/Category";
import NewCategoryPage from "../pages/NewCategory";
import UserPage from "../pages/User";
import UserDetailPage from "../pages/UserDetail";
import RootLayout from "../route/Root";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "/category", element: <CategoryPage /> },
      { path: "/category/new", element: <NewCategoryPage /> },
      { path: "/user", element: <UserPage /> },
      { path: "/user/:userId", element: <UserDetailPage /> },
      { path: "/setting", element: <SettingPage /> },
    ],
  },

  { path: "/login", element: <LoginPage /> },
]);
