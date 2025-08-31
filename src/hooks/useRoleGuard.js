import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { canAccessRoute } from '@/lib/enums';

export const useRoleGuard = (requiredRoute) => {
    const navigate = useNavigate();
    const { admin, isAuthenticated } = useSelector((state) => state.adminAuth);

    const checkAccess = () => {
        if (!isAuthenticated || !admin) {
            navigate('/admin/login');
            return false;
        }

        if (!canAccessRoute(admin.role, requiredRoute)) {
            navigate('/');
            return false;
        }

        return true;
    };

    return { checkAccess, hasAccess: canAccessRoute(admin?.role, requiredRoute) };
};
