import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboardApi";
import Loader from "@/components/loader/Loader";
import {
  WelcomeSection,
  StatsCards,
  AdditionalStatsCards,
  RecentEnrollments,
  QuickActions,
  ActivityFeed,
  PerformanceOverview
} from "@/components/dashboard";

const DashboardHome = () => {
  const { data: dashboardData, isLoading, error } = useGetDashboardStatsQuery();

  console.log(dashboardData);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader variant="dots" size="lg" text="Loading dashboard data..." />
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

export default DashboardHome;
