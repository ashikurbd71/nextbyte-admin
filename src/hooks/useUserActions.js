import { toast } from "react-hot-toast";
import {
    useDeleteUserMutation,
    useBanUserMutation,
    useUnbanUserMutation,
    useActivateUserMutation,
    useDeactivateUserMutation,
    useVerifyUserMutation,
} from "@/features/user/userApis";

export const useUserActions = (refetchUsers) => {
    const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
    const [banUser, { isLoading: banLoading }] = useBanUserMutation();
    const [unbanUser, { isLoading: unbanLoading }] = useUnbanUserMutation();
    const [activateUser, { isLoading: activateLoading }] = useActivateUserMutation();
    const [deactivateUser, { isLoading: deactivateLoading }] = useDeactivateUserMutation();
    const [verifyUser, { isLoading: verifyLoading }] = useVerifyUserMutation();

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(userId).unwrap();
                toast.success("User deleted successfully");
            } catch (error) {
                console.error("Delete user error:", error);
                toast.error(error?.data?.message || "Failed to delete user");
            }
        }
    };

    const handleBanUser = async (userId) => {
        const reason = prompt("Please provide a reason for banning this user:");
        if (reason) {
            try {
                await banUser({ id: userId, reason }).unwrap();
                toast.success("User banned successfully");
            } catch (error) {
                console.error("Ban user error:", error);
                toast.error(error?.data?.message || "Failed to ban user");
            }
        }
    };

    const handleUnbanUser = async (userId) => {
        try {
            await unbanUser(userId).unwrap();
            toast.success("User unbanned successfully");
        } catch (error) {
            toast.error("Failed to unban user");
        }
    };

    const handleActivateUser = async (userId) => {
        try {
            await activateUser(userId).unwrap();
            toast.success("User activated successfully");
        } catch (error) {
            console.error("Activate user error:", error);
            toast.error(error?.data?.message || "Failed to activate user");
        }
    };

    const handleVerifyUser = async (userId) => {
        try {
            await verifyUser(userId).unwrap();
            toast.success("User verified successfully");
        } catch (error) {
            toast.error("Failed to verify user");
        }
    };

    const handleToggleUserStatus = async (userId, isActive) => {
        try {
            console.log("Toggling user status:", { userId, isActive });

            if (isActive) {
                console.log("Deactivating user:", userId);
                await deactivateUser(userId).unwrap();
                toast.success("User deactivated successfully");
            } else {
                console.log("Activating user:", userId);
                await activateUser(userId).unwrap();
                toast.success("User activated successfully");
            }

            // Refetch users to update the UI
            refetchUsers();
        } catch (error) {
            console.error("Toggle user status error:", error);
            toast.error(error?.data?.message || "Failed to toggle user status");
        }
    };

    const loadingStates = {
        deleteLoading,
        banLoading,
        unbanLoading,
        activateLoading,
        deactivateLoading,
        verifyLoading
    };

    return {
        handleDeleteUser,
        handleBanUser,
        handleUnbanUser,
        handleActivateUser,
        handleVerifyUser,
        handleToggleUserStatus,
        loadingStates
    };
};
