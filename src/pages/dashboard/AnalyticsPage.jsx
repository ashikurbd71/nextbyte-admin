import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    ShoppingCart,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Download,
    Filter,
    Eye,
    Target,
    PieChart,
    LineChart,
    BookOpen,
    GraduationCap,
    CreditCard
} from "lucide-react";
import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboardApi";
import Loader from "@/components/loader/Loader";

const AnalyticsPage = () => {
    const { data: dashboardData, isLoading, error } = useGetDashboardStatsQuery();

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader variant="ring" size="lg" text="Loading analytics..." />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400">Failed to load analytics data</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        {error?.data?.message || "Please try again later"}
                    </p>
                </div>
            </div>
        );
    }

    // Calculate conversion rate
    const totalEnrollments = dashboardData?.enrollments?.statusStats?.total || 0;
    const totalUsers = dashboardData?.users?.total || 0;
    const conversionRate = totalUsers > 0 ? ((totalEnrollments / totalUsers) * 100).toFixed(2) : 0;

    // Calculate success rate
    const completedEnrollments = dashboardData?.enrollments?.statusStats?.completed || 0;
    const successRate = totalEnrollments > 0 ? ((completedEnrollments / totalEnrollments) * 100).toFixed(1) : 0;

    const metrics = [
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
            title: "Conversion Rate",
            value: `${conversionRate}%`,
            change: "+0.5%",
            trend: "up",
            icon: Target,
            color: "text-purple-600",
            bgColor: "bg-purple-100 dark:bg-purple-900/20"
        },
        {
            title: "Success Rate",
            value: `${successRate}%`,
            change: "-2.1%",
            trend: "down",
            icon: Activity,
            color: "text-orange-600",
            bgColor: "bg-orange-100 dark:bg-orange-900/20"
        }
    ];

    // Transform earnings data for chart
    const chartData = dashboardData?.earnings?.monthly?.map(item => ({
        month: item.month,
        revenue: item.total,
        users: Math.floor(Math.random() * 1000) + 500, // Mock data for demo
        orders: Math.floor(Math.random() * 500) + 100 // Mock data for demo
    })) || [
            { month: "Jan", revenue: 0, users: 0, orders: 0 },
            { month: "Feb", revenue: 0, users: 0, orders: 0 },
            { month: "Mar", revenue: 0, users: 0, orders: 0 },
            { month: "Apr", revenue: 0, users: 0, orders: 0 },
            { month: "May", revenue: 0, users: 0, orders: 0 },
            { month: "Jun", revenue: 0, users: 0, orders: 0 },
            { month: "Jul", revenue: 0, users: 0, orders: 0 },
        ];

    // Transform top courses data
    const topProducts = dashboardData?.courses?.topCourses?.map((course, index) => ({
        name: `Course ${index + 1}`,
        sales: course.enrollmentCount || 0,
        revenue: `$${((course.enrollmentCount || 0) * 100).toLocaleString()}`,
        growth: `+${Math.floor(Math.random() * 20) + 5}%`
    })) || [
            { name: "No courses available", sales: 0, revenue: "$0", growth: "0%" }
        ];

    // Transform enrollment status data
    const totalEnrollmentsForPercentage = dashboardData?.enrollments?.statusStats?.total || 1;
    const trafficSources = [
        {
            source: "Active",
            percentage: Math.round((dashboardData?.enrollments?.statusStats?.active || 0) / totalEnrollmentsForPercentage * 100),
            color: "bg-green-500"
        },
        {
            source: "Pending",
            percentage: Math.round((dashboardData?.enrollments?.statusStats?.pending || 0) / totalEnrollmentsForPercentage * 100),
            color: "bg-yellow-500"
        },
        {
            source: "Completed",
            percentage: Math.round((dashboardData?.enrollments?.statusStats?.completed || 0) / totalEnrollmentsForPercentage * 100),
            color: "bg-blue-500"
        },
        {
            source: "Cancelled",
            percentage: Math.round((dashboardData?.enrollments?.statusStats?.cancelled || 0) / totalEnrollmentsForPercentage * 100),
            color: "bg-red-500"
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Analytics Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Track your performance and gain insights into your business metrics.
                </p>
            </div>

            {/* Action Bar */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                Last 30 Days
                            </Button>
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Export
                            </Button>
                            <Button size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                View Report
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                {metric.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                {metric.value}
                            </div>
                            <div className="flex items-center space-x-1 text-xs">
                                {metric.trend === "up" ? (
                                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                                ) : (
                                    <ArrowDownRight className="h-3 w-3 text-red-600" />
                                )}
                                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                                    {metric.change}
                                </span>
                                <span className="text-slate-500 dark:text-slate-400">from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Revenue Overview</CardTitle>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">Revenue</Button>
                                <Button variant="outline" size="sm">Users</Button>
                                <Button variant="outline" size="sm">Orders</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80 flex items-end justify-between space-x-2">
                            {chartData.map((data, index) => (
                                <div key={index} className="flex flex-col items-center space-y-2">
                                    <div className="w-12 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg"
                                        style={{ height: `${(data.revenue / 4000) * 200}px` }}>
                                    </div>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{data.month}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Total Revenue: $18,390</span>
                            <span className="text-green-600">+12.5% vs last period</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Enrollment Status Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>Enrollment Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {trafficSources.map((source, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                                            {source.source}
                                        </span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                            {source.percentage}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${source.color}`}
                                            style={{ width: `${source.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Courses */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Top Performing Courses</CardTitle>
                            <Button variant="ghost" size="sm">View All</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topProducts.map((product, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {product.sales} sales
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            {product.revenue}
                                        </p>
                                        <p className="text-xs text-green-600">
                                            {product.growth}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Key Metrics */}
                <Card>
                    <CardHeader>
                        <CardTitle>Key Performance Indicators</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        Average Course Rating
                                    </span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        {dashboardData?.courses?.averageRating || 0}/5
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div className="h-2 bg-green-500 rounded-full" style={{ width: `${(dashboardData?.courses?.averageRating || 0) / 5 * 100}%` }}></div>
                                </div>
                                <p className="text-xs text-green-600">Based on student reviews</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        Student to Instructor Ratio
                                    </span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        {dashboardData?.users?.totalStudents || 0}:{dashboardData?.users?.totalInstructors || 0}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                                </div>
                                <p className="text-xs text-blue-600">Good balance</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        Course Completion Rate
                                    </span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        {successRate}%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div className="h-2 bg-purple-500 rounded-full" style={{ width: `${successRate}%` }}></div>
                                </div>
                                <p className="text-xs text-purple-600">Based on completed enrollments</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        Certificate Issuance
                                    </span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        {dashboardData?.courses?.totalCertificates || 0}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div className="h-2 bg-orange-500 rounded-full" style={{ width: "45%" }}></div>
                                </div>
                                <p className="text-xs text-orange-600">Certificates issued</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Enrollments Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Enrollments Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {dashboardData?.recentActivity?.recentEnrollments?.slice(0, 5).map((enrollment, index) => {
                            const timeAgo = new Date(enrollment.createdAt);
                            const now = new Date();
                            const diffInMinutes = Math.floor((now - timeAgo) / (1000 * 60));
                            const timeText = diffInMinutes < 1 ? "Just now" :
                                diffInMinutes < 60 ? `${diffInMinutes} minutes ago` :
                                    `${Math.floor(diffInMinutes / 60)} hours ago`;

                            return (
                                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <div className={`w-2 h-2 rounded-full ${enrollment.status === "active" ? "bg-green-500" :
                                        enrollment.status === "pending" ? "bg-yellow-500" : "bg-red-500"
                                        }`}></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                                            {enrollment.status === "active" ? "Enrollment completed" :
                                                enrollment.status === "pending" ? "New enrollment" : "Payment failed"}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            by {enrollment.student?.name} • {timeText}
                                        </p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">
                                            Course: {enrollment.course?.name}
                                        </p>
                                    </div>
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        ${parseFloat(enrollment.amountPaid).toLocaleString()}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AnalyticsPage;
