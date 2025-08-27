import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  MoreHorizontal,
  Calendar,
  Clock,
  Star,
  BookOpen,
  GraduationCap,
  CreditCard
} from "lucide-react";
import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboardApi";
import Loader from "@/components/loader/Loader";

const DashboardHome = () => {
  const { data: dashboardData, isLoading, error } = useGetDashboardStatsQuery();

  console.log(dashboardData);

  // Loading state
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-64">
  //       <Loader variant="dots" size="lg" text="Loading dashboard data..." />
  //     </div>
  //   );
  // }

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

  // Transform API data into stats format
  const stats = [
    {
      title: "Total Revenue",
      value: `$${dashboardData?.earnings?.totalYear?.toLocaleString() || 0}`,
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      title: "Total Users",
      value: dashboardData?.users?.total?.toLocaleString() || 0,
      change: "+180.1%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Total Courses",
      value: dashboardData?.courses?.total?.toLocaleString() || 0,
      change: "+19%",
      trend: "up",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      title: "Pending Enrollments",
      value: dashboardData?.enrollments?.totalPending?.toLocaleString() || 0,
      change: "-2.1%",
      trend: "down",
      icon: GraduationCap,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20"
    }
  ];

  // Transform recent enrollments data
  const recentOrders = dashboardData?.recentActivity?.recentEnrollments?.slice(0, 4).map(enrollment => ({
    id: `#${enrollment.id}`,
    customer: enrollment.student?.name || "Unknown",
    email: enrollment.student?.email || "No email",
    amount: `$${parseFloat(enrollment.amountPaid).toLocaleString()}`,
    status: enrollment.status === "active" ? "Completed" :
      enrollment.status === "pending" ? "Pending" :
        enrollment.status === "cancelled" ? "Cancelled" : "Processing",
    date: new Date(enrollment.createdAt).toLocaleDateString(),
    courseName: enrollment.course?.name || "Unknown Course"
  })) || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Welcome back, Admin! 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div className="flex items-center space-x-1 text-xs">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span className="text-slate-500 dark:text-slate-400">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enrollments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Enrollments</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {order.customer}
                      </p>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {order.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {order.email}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Course: {order.courseName}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {order.amount}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {order.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add New User
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Star className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardData?.recentActivity?.recentEnrollments?.slice(0, 4).map((enrollment, index) => {
              const timeAgo = new Date(enrollment.createdAt);
              const now = new Date();
              const diffInHours = Math.floor((now - timeAgo) / (1000 * 60 * 60));
              const timeText = diffInHours < 1 ? "Just now" :
                diffInHours < 24 ? `${diffInHours} hours ago` :
                  `${Math.floor(diffInHours / 24)} days ago`;

              return (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800`}>
                    {enrollment.status === "active" ? (
                      <GraduationCap className="h-4 w-4 text-green-600" />
                    ) : enrollment.status === "pending" ? (
                      <Clock className="h-4 w-4 text-orange-600" />
                    ) : (
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {enrollment.status === "active" ? "Enrollment completed" :
                        enrollment.status === "pending" ? "New enrollment" : "Payment processed"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {enrollment.student?.name} enrolled in {enrollment.course?.name}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Amount: ${parseFloat(enrollment.amountPaid).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>{timeText}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Course Statistics</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Total Courses
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {dashboardData?.courses?.total || 0} courses
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {dashboardData?.courses?.total || 0}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Active Courses
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {dashboardData?.courses?.totalActive || 0} active
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {dashboardData?.courses?.totalActive || 0}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Average Rating
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {dashboardData?.courses?.averageRating || 0} stars
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {dashboardData?.courses?.averageRating || 0}/5
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Total Certificates
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {dashboardData?.courses?.totalCertificates || 0} issued
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {dashboardData?.courses?.totalCertificates || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Enrollment Status</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Active
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {dashboardData?.enrollments?.statusStats?.active || 0}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Pending
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {dashboardData?.enrollments?.statusStats?.pending || 0}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Completed
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {dashboardData?.enrollments?.statusStats?.completed || 0}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Cancelled
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {dashboardData?.enrollments?.statusStats?.cancelled || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
