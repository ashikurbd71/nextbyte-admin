import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { canAccessRoute } from '@/lib/enums';

const useAdminPrivateRoute = (requiredRoute = null) => {
    const navigate = useNavigate();
    const { admin, isAuthenticated } = useSelector((state) => state.adminAuth);

    useEffect(() => {
        // Check authentication first
        if (!isAuthenticated || !admin) {
            navigate('/admin/login');
            return;
        }

        // Check if admin has a role
        if (!admin.role) {
            navigate('/admin/login');
            return;
        }

        // If a specific route is required, check role-based access
        if (requiredRoute && !canAccessRoute(admin.role, requiredRoute)) {
            // Redirect to dashboard instead of login for unauthorized access
            navigate('/');
            return;
        }
    }, [isAuthenticated, admin, requiredRoute, navigate]);

    return {
        isAuthenticated,
        admin,
        hasAccess: requiredRoute ? canAccessRoute(admin?.role, requiredRoute) : true
    };
};

export default useAdminPrivateRoute;
