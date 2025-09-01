import { Routes, Route, Navigate } from 'react-router-dom';
import RoleBasedRoute from '@/components/auth/RoleBasedRoute';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

// Import admin login page
import AdminLoginPage from '@/pages/auth/admin-login';

// Import existing dashboard pages for admin routes
import DashboardHome from '@/pages/dashboard/DashboardHome';
import UsersPage from '@/pages/dashboard/UsersPage';
import CategoriesPage from '@/pages/dashboard/CategoriesPage';
import CoursesPage from '@/pages/dashboard/CoursesPage';
import ModulesPage from '@/pages/dashboard/ModulesPage';
import LessonsPage from '@/pages/dashboard/LessonsPage';
import ReviewsManagementPage from '@/pages/dashboard/ReviewsManagementPage';
import NotificationsPage from '@/pages/dashboard/NotificationsPage';
import Assignments from '@/pages/dashboard/Assignments';
import AssignmentSubmissionsPage from '@/pages/dashboard/AssignmentSubmissionsPage';
import InstructorsPage from '@/pages/dashboard/InstructorsPage';
import EnrollmentsPage from '@/pages/dashboard/EnrollmentsPage';
import SupportTicketsPage from '@/pages/dashboard/SupportTicketsPage';
import AnalyticsPage from '@/pages/dashboard/AnalyticsPage';
import SettingsPage from '@/pages/dashboard/SettingsPage';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Admin Login */}
      <Route path="/login" element={<AdminLoginPage />} />

      {/* Protected Admin Routes using DashboardLayout */}
      <Route path="/" element={<DashboardLayout />}>
        {/* Super Admin Only Routes */}
        <Route path="dashboard" element={
          <RoleBasedRoute requiredRoute="dashboard">
            <DashboardHome />
          </RoleBasedRoute>
        } />

        <Route path="analytics" element={
          <RoleBasedRoute requiredRoute="analytics">
            <AnalyticsPage />
          </RoleBasedRoute>
        } />

        <Route path="instructors" element={
          <RoleBasedRoute requiredRoute="instructor">
            <InstructorsPage />
          </RoleBasedRoute>
        } />

        <Route path="enrollments" element={
          <RoleBasedRoute requiredRoute="enrollment">
            <EnrollmentsPage />
          </RoleBasedRoute>
        } />

        <Route path="support-tickets" element={
          <RoleBasedRoute requiredRoute="support-tickets">
            <SupportTicketsPage />
          </RoleBasedRoute>
        } />

        {/* Admin & Moderator Routes */}
        <Route path="users" element={
          <RoleBasedRoute requiredRoute="user">
            <UsersPage />
          </RoleBasedRoute>
        } />

        <Route path="categories" element={
          <RoleBasedRoute requiredRoute="categories">
            <CategoriesPage />
          </RoleBasedRoute>
        } />

        <Route path="courses" element={
          <RoleBasedRoute requiredRoute="courses">
            <CoursesPage />
          </RoleBasedRoute>
        } />

        <Route path="modules" element={
          <RoleBasedRoute requiredRoute="modules">
            <ModulesPage />
          </RoleBasedRoute>
        } />

        <Route path="lessons" element={
          <RoleBasedRoute requiredRoute="lessons">
            <LessonsPage />
          </RoleBasedRoute>
        } />

        <Route path="reviews" element={
          <RoleBasedRoute requiredRoute="reviews">
            <ReviewsManagementPage />
          </RoleBasedRoute>
        } />

        <Route path="notifications" element={
          <RoleBasedRoute requiredRoute="notifications">
            <NotificationsPage />
          </RoleBasedRoute>
        } />

        {/* Admin Only Routes (No Moderator Access) */}
        <Route path="assignments" element={
          <RoleBasedRoute requiredRoute="assignments">
            <Assignments />
          </RoleBasedRoute>
        } />

        <Route path="submissions" element={
          <RoleBasedRoute requiredRoute="assignment-submissions">
            <AssignmentSubmissionsPage />
          </RoleBasedRoute>
        } />

        {/* Settings - Accessible to all authenticated admins */}
        <Route path="settings" element={<SettingsPage />} />

        {/* Default redirect */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
