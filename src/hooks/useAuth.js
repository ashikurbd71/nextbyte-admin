import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useGetMyProfileQuery } from "@/features/settings/settingsApiSlice";
// import { userDetailsFetched } from "@/features/auth/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading: authLoading } = useSelector((state) => state.adminAuth);
  const [authChecked, setAuthChecked] = useState(false);

  // const { data, isSuccess, isLoading, refetch } = useGetMyProfileQuery(
  //   undefined,
  //   {
  //     skip: !isAuthenticated,
  //   }
  // );

  useEffect(() => {
    // Set authChecked to true after a short delay to ensure Redux state is initialized
    const timer = setTimeout(() => {
      setAuthChecked(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Additional check for when authentication state changes
  useEffect(() => {
    if (authChecked) {
      // If we're authenticated but still loading, wait for loading to complete
      if (isAuthenticated && authLoading) {
        return;
      }
      // If we're not authenticated, we're done checking
      if (!isAuthenticated) {
        return;
      }
    }
  }, [isAuthenticated, authLoading, authChecked]);

  return {
    isLoading: authLoading || (isAuthenticated && !authChecked),
    authChecked,
    // refetchProfile: refetch,
  };
};

export default useAuth;
