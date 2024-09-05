import { createBrowserRouter } from "react-router-dom";

import DashboardPage from "../pages/Dashboard";
import LoginPage from "../pages/Login";
import SettingPage from "../pages/Setting";
import CategoryPage from "../pages/Category";
import NewCategoryPage from "../pages/NewCategory";
import UserPage from "../pages/User";
import UserDetailPage from "../pages/UserDetail";
import RootLayout from "../pages/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "/category", element: <CategoryPage /> },
      { path: "/category/new", element: <NewCategoryPage /> },
      { path: "/users", element: <UserPage /> },
      { path: "/users/:userId", element: <UserDetailPage /> },
      { path: "/categorys/news", element: <NewCategoryPage /> },
      
      
      {
        path: "/user",
        children: [
          { index: true, element: <UserPage /> },
          { path: ":userId", element: <UserDetailPage /> },
        ],
      },
      { path: "/setting", element: <SettingPage /> },
    ],
  },

  { path: "/login", element: <LoginPage /> },
]);
