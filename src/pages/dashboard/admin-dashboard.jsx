import React from "react";
import { useSelector } from "react-redux";
import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboardApi";
import Loader from "@/components/loader/Loader";
import { getAdminRoleDisplay, getAccessibleRoutes } from "@/lib/enums";
import {
    WelcomeSection,
    StatsCards,
    AdditionalStatsCards,
    RecentEnrollments,
    QuickActions,
    ActivityFeed,
    PerformanceOverview
} from "@/components/dashboard";

const AdminDashboard = () => {
    const { data: dashboardData, isLoading, error } = useGetDashboardStatsQuery();
    const { admin } = useSelector((state) => state.adminAuth);

    const accessibleRoutes = getAccessibleRoutes(admin?.role);

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader variant="dots" size="lg" text="Loading admin dashboard..." />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400">Failed to load dashboard data</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        {error?.data?.message || "Please try again later"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <WelcomeSection />

            {/* Admin Role Info */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    Admin Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Role</p>
                        <p className="text-lg font-medium text-slate-900 dark:text-white">
                            {getAdminRoleDisplay(admin?.role)}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                        <p className="text-lg font-medium text-slate-900 dark:text-white">
                            {admin?.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* Accessible Routes */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    Your Permissions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {accessibleRoutes.map((route) => (
                        <div
                            key={route}
                            className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium"
                        >
                            {route.charAt(0).toUpperCase() + route.slice(1).replace('-', ' ')}
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <StatsCards dashboardData={dashboardData} />

            {/* Additional Stats Cards */}
            <AdditionalStatsCards dashboardData={dashboardData} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Enrollments */}
                <RecentEnrollments dashboardData={dashboardData} />

                {/* Quick Actions */}
                <QuickActions />
            </div>

            {/* Activity Feed */}
            <ActivityFeed dashboardData={dashboardData} />

            {/* Performance Overview */}
            <PerformanceOverview dashboardData={dashboardData} />
        </div>
    );
};

export default AdminDashboard;
