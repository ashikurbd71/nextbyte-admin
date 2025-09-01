import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import AtomLoader from '@/components/loader/AtomLoader';

const AuthGuard = ({
    children,
    requireAuth = true,
    redirectTo = '/admin/login',
    showLoader = true
}) => {
    const { isLoading, authChecked } = useAuth();
    const { isAuthenticated, admin } = useSelector((state) => state.adminAuth);

    // Show loading while checking authentication
    if (!authChecked || isLoading) {
        if (showLoader) {
            return (
                <div className="h-screen w-screen center">
                    <AtomLoader />
                </div>
            );
        }
        return null;
    }

    // If authentication is required but user is not authenticated
    if (requireAuth && (!isAuthenticated || !admin)) {
        return <Navigate to={redirectTo} replace />;
    }

    // If authentication is not required but user is authenticated (e.g., login page)
    if (!requireAuth && isAuthenticated && admin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AuthGuard;
