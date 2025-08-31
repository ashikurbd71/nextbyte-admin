import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { canAccessRoute } from '@/lib/enums';

const RoleBasedRoute = ({ children, requiredRoute, fallbackPath = '/admin/login' }) => {
    const { admin, isAuthenticated } = useSelector((state) => state.adminAuth);

    // If no required route is specified, allow access (for dashboard)
    if (!requiredRoute) {
        return children;
    }

    // First check: If not authenticated, redirect to admin login
    if (!isAuthenticated || !admin) {
        return <Navigate to="/admin/login" replace />;
    }

    // Second check: If authenticated but no role, redirect to login
    if (!admin.role) {
        return <Navigate to="/admin/login" replace />;
    }

    // Third check: Check if user has permission for this route
    const hasAccess = canAccessRoute(admin.role, requiredRoute);

    if (!hasAccess) {
        // Redirect to fallback path or show access denied
        return <Navigate to={fallbackPath} replace />;
    }

    return children;
};

export default RoleBasedRoute;
