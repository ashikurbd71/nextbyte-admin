import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "@/hooks/useAuth";

const PrivateRoute = ({ children, redirectTo = "/admin/login" }) => {
  const location = useLocation();
  const { isLoading, authChecked } = useAuth();
  const { isAuthenticated } = useSelector((state) => state.adminAuth);

  // Show loading while checking authentication
  if (!authChecked || isLoading) {
    return (
      <div className="h-screen w-screen center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate state={{ from: location }} to={redirectTo} replace />
  );
};

export default PrivateRoute;
