import { createBrowserRouter } from "react-router-dom";

// LAYOUTS

import DashboardLayout from "./components/dashboard/DashboardLayout";

import ErrorPage from "./pages/common/errorPage";

import LoginPage from "./pages/auth/login";

import PrivateRoute from "./hooks/usePrivateRoute";

import ForgotPasswordRequestPage from "./pages/auth/forgot-password/password-request";
import ResetPasswordPage from "./pages/auth/forgot-password/reset-password";
import RegisterPage from "./pages/auth/register";

// DASHBOARD PAGES
import DashboardHome from "./pages/dashboard/DashboardHome";
import UsersPage from "./pages/dashboard/UsersPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import ReportsViewPage from "./pages/dashboard/ReportsViewPage";

export const routes = createBrowserRouter([


  // Dashboard Routes
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "/reports",
        element: <ReportsViewPage />,
      },
      {
        path: "/calendar",
        element: <div className="p-6"><h1 className="text-2xl font-bold">Calendar</h1><p>Calendar page coming soon...</p></div>,
      },
      {
        path: "/messages",
        element: <div className="p-6"><h1 className="text-2xl font-bold">Messages</h1><p>Messages page coming soon...</p></div>,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },

  { path: "/sign-in", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordRequestPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "*", element: <ErrorPage /> },
]);
