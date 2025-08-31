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
import CoursesPage from "./pages/dashboard/CoursesPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import ReportsViewPage from "./pages/dashboard/ReportsViewPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import CategoriesPage from "./pages/dashboard/CategoriesPage";
import InstructorsPage from "./pages/dashboard/InstructorsPage";
import CourseEnrollmentViewPage from "./pages/dashboard/CourseEnrollmentViewPage";
import CourseReviewViewPage from "./pages/dashboard/CourseReviewViewPage";
import CourseLeaderboardPage from "./pages/dashboard/CourseLeaderboardPage";
import ModulesPage from "./pages/dashboard/ModulesPage";
import ModuleDetailsPage from "./pages/dashboard/ModuleDetailsPage";
import LessonsPage from "./pages/dashboard/LessonsPage";
import LessonDetailPage from "./pages/dashboard/LessonDetailPage";
import Assignments from "./pages/dashboard/Assignments";
import AssignmentSubmissionsPage from "./pages/dashboard/AssignmentSubmissionsPage";
import ReviewsManagementPage from "./pages/dashboard/ReviewsManagementPage";
import ManualPaymentPage from "./pages/dashboard/ManualPaymentPage";
import EnrollmentsPage from "./pages/dashboard/EnrollmentsPage";
import EnrollmentDetailsPage from "./pages/dashboard/EnrollmentDetailsPage";
import SupportTicketsPage from "./pages/dashboard/SupportTicketsPage";

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
        path: "/instructors",
        element: <InstructorsPage />,
      },
      {
        path: "/courses",
        element: <CoursesPage />,
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
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/notifications",
        element: <NotificationsPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/course/:courseId/enrollments",
        element: <CourseEnrollmentViewPage />,
      },
      {
        path: "/course/:courseId/reviews",
        element: <CourseReviewViewPage />,
      },
      {
        path: "/course/:courseId/leaderboard",
        element: <CourseLeaderboardPage />,
      },
      {
        path: "/modules",
        element: <ModulesPage />,
      },
      {
        path: "/modules/:moduleId",
        element: <ModuleDetailsPage />,
      },
      {
        path: "/lessons",
        element: <LessonsPage />,
      },
      {
        path: "/lessons/:lessonId",
        element: <LessonDetailPage />,
      },
      {
        path: "/assignments",
        element: <Assignments />,
      },
      {
        path: "/assignment-submissions",
        element: <AssignmentSubmissionsPage />,
      },
      {
        path: "/reviews",
        element: <ReviewsManagementPage />,
      },
      {
        path: "/enrollments",
        element: <EnrollmentsPage />,
      },
      {
        path: "/manual-payment",
        element: <ManualPaymentPage />,
      },
      {
        path: "/enrollments/:enrollmentId",
        element: <EnrollmentDetailsPage />,
      },
      {
        path: "/support-tickets",
        element: <SupportTicketsPage />,
      },
    ],
  },

  { path: "/sign-in", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordRequestPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "*", element: <ErrorPage /> },
]);
