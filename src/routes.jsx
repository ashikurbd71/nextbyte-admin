import { createBrowserRouter } from "react-router-dom";

// LAYOUTS
import DashboardLayout from "./components/dashboard/DashboardLayout";

import ErrorPage from "./pages/common/errorPage";

import AdminLoginPage from "./pages/auth/admin-login";

import AuthGuard from "./components/auth/AuthGuard";
import RoleBasedRoute from "./components/auth/RoleBasedRoute";

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
  // Dashboard Routes with Role-Based Access
  {
    path: "/",
    element: (
      <AuthGuard requireAuth={true}>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/users",
        element: (
          <RoleBasedRoute requiredRoute="user">
            <UsersPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/instructors",
        element: (
          <RoleBasedRoute requiredRoute="instructor">
            <InstructorsPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/courses",
        element: (
          <RoleBasedRoute requiredRoute="courses">
            <CoursesPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/analytics",
        element: (
          <RoleBasedRoute requiredRoute="analytics">
            <AnalyticsPage />
          </RoleBasedRoute>
        ),
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
        element: (
          <RoleBasedRoute requiredRoute="notifications">
            <NotificationsPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <RoleBasedRoute requiredRoute="categories">
            <CategoriesPage />
          </RoleBasedRoute>
        ),
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
        path: "/modules",
        element: (
          <RoleBasedRoute requiredRoute="modules">
            <ModulesPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/modules/:moduleId",
        element: <ModuleDetailsPage />,
      },
      {
        path: "/lessons",
        element: (
          <RoleBasedRoute requiredRoute="lessons">
            <LessonsPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/lessons/:lessonId",
        element: <LessonDetailPage />,
      },
      {
        path: "/assignments",
        element: (
          <RoleBasedRoute requiredRoute="assignments">
            <Assignments />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/assignment-submissions",
        element: (
          <RoleBasedRoute requiredRoute="assignment-submissions">
            <AssignmentSubmissionsPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/reviews",
        element: (
          <RoleBasedRoute requiredRoute="reviews">
            <ReviewsManagementPage />
          </RoleBasedRoute>
        ),
      },
      {
        path: "/enrollments",
        element: (
          <RoleBasedRoute requiredRoute="enrollment">
            <EnrollmentsPage />
          </RoleBasedRoute>
        ),
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
        element: (
          <RoleBasedRoute requiredRoute="support-tickets">
            <SupportTicketsPage />
          </RoleBasedRoute>
        ),
      },
    ],
  },

  {
    path: "/admin/login",
    element: (
      <AuthGuard requireAuth={false} redirectTo="/">
        <AdminLoginPage />
      </AuthGuard>
    )
  },
  { path: "*", element: <ErrorPage /> },
]);
