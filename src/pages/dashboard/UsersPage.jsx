import React, { useState } from "react";
import {
    useGetAllUsersQuery,
    useGetUserStatsQuery,
} from "@/features/user/userApis";
import UserRegistrationForm from "@/components/user/UserRegistrationForm";
import UserDetailsModal from "@/components/user/UserDetailsModal";
import UserEnrollmentModal from "@/components/user/UserEnrollmentModal";
import DataTable from "@/components/ui/data-table";
import UserStatsCards from "@/components/user/UserStatsCards";
import UserActionsBar from "@/components/user/UserActionsBar";
import UserQuickActions from "@/components/user/UserQuickActions";
import UserErrorDisplay from "@/components/user/UserErrorDisplay";
import { createUserTableColumns } from "@/components/user/UserTableColumns";
import { useUserActions } from "@/hooks/useUserActions";

const UsersPage = () => {
    const [showBannedUsers, setShowBannedUsers] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserForEnrollment, setSelectedUserForEnrollment] = useState(null);

    // API hooks
    const { data: users = [], isLoading: usersLoading, error: usersError, refetch: refetchUsers } = useGetAllUsersQuery();
    const { data: stats, isLoading: statsLoading } = useGetUserStatsQuery();

    // User actions hook
    const {
        handleDeleteUser,
        handleBanUser,
        handleUnbanUser,
        handleActivateUser,
        handleVerifyUser,
        handleToggleUserStatus,
        loadingStates
    } = useUserActions(refetchUsers);

    // Filter users based on banned status
    const filteredUsers = showBannedUsers
        ? users.filter(user => user.isBanned)
        : users;

    // Create table columns with action handlers
    const columns = createUserTableColumns({
        onViewDetails: setSelectedUserId,
        onViewEnrollment: setSelectedUserForEnrollment,
        onToggleStatus: handleToggleUserStatus,
        onUnban: handleUnbanUser,
        onVerify: handleVerifyUser,
        onBan: handleBanUser,
        onDelete: handleDeleteUser,
        loadingStates
    });

    if (usersError) {
        return <UserErrorDisplay error={usersError} onRetry={refetchUsers} />;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Users Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Manage your users, roles, and permissions.
                </p>
            </div>

            {/* Stats Cards */}
            <UserStatsCards stats={stats} statsLoading={statsLoading} />

            {/* Actions Bar */}
            <UserActionsBar
                showBannedUsers={showBannedUsers}
                setShowBannedUsers={setShowBannedUsers}
                setShowRegistrationForm={setShowRegistrationForm}
                users={filteredUsers}
            />

            {/* Users DataTable */}
            <DataTable
                data={filteredUsers}
                columns={columns}
                title={showBannedUsers ? "Banned Users" : "All Users"}
                searchPlaceholder="Search users by name, email, or phone..."
                searchKeys={['name', 'email', 'phone']}
                itemsPerPage={10}
                loading={usersLoading}
                emptyMessage="No users found"
                onRowClick={(user) => setSelectedUserId(user.id)}
            />



            {/* User Registration Form Modal */}
            {showRegistrationForm && (
                <UserRegistrationForm
                    onClose={() => setShowRegistrationForm(false)}
                    onSuccess={() => {
                        setShowRegistrationForm(false);
                        refetchUsers();
                    }}
                />
            )}

            {/* User Details Modal */}
            {selectedUserId && (
                <UserDetailsModal
                    userId={selectedUserId}
                    onClose={() => setSelectedUserId(null)}
                />
            )}

            {/* User Enrollment Modal */}
            {selectedUserForEnrollment && (
                <UserEnrollmentModal
                    userId={selectedUserForEnrollment.id}
                    userName={selectedUserForEnrollment.name}
                    onClose={() => setSelectedUserForEnrollment(null)}
                />
            )}
        </div>
    );
};

export default UsersPage;
