import React, { useState } from "react";
import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboardApi";
import { useGetEarningsReportQuery } from "@/features/earnings-report/earningsreportApis";
import { useGetEnrollmentReportQuery } from "@/features/enrollment-report/enrollmentreportApis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    TrendingUp,
    Users,
    DollarSign,
    BookOpen,
    Calendar,
    Download,
    Eye,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Target,
    CheckCircle,
    Clock,
    XCircle,
    AlertCircle
} from "lucide-react";
import { exportToExcel, formatDashboardDataForExport, formatEarningsDataForExport } from "@/utils/excel-export";
import { formatEnrollmentDataForExport } from "@/utils/enrollmentUtils";
import toast from "react-hot-toast";
import Loader from "@/components/loader/Loader";

const ReportsViewPage = () => {
    const { data: dashboardData, isLoading, error } = useGetDashboardStatsQuery();

    // Earnings report with date range state
    const [earningsDateRange, setEarningsDateRange] = useState({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });
    const { data: earningsData, isLoading: earningsLoading } = useGetEarningsReportQuery(earningsDateRange);

    // Enrollment report with date range state
    const [enrollmentDateRange, setEnrollmentDateRange] = useState({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });
    const { data: enrollmentData, isLoading: enrollmentLoading } = useGetEnrollmentReportQuery(enrollmentDateRange);

    const handleExport = (type) => {
        try {
            let exportData, filename, sheetName;

            switch (type) {
                case 'dashboard':
                    exportData = formatDashboardDataForExport(dashboardData);
                    filename = `dashboard-report-${new Date().toISOString().split('T')[0]}.xlsx`;
                    sheetName = 'Dashboard Report';
                    break;
                case 'earnings':
                    exportData = formatEarningsDataForExport(earningsData);
                    filename = `earnings-report-${earningsDateRange.startDate}-to-${earningsDateRange.endDate}.xlsx`;
                    sheetName = 'Earnings Report';
                    break;
                case 'enrollment':
                    // Handle different enrollment data structures
                    const enrollmentDataToExport = enrollmentData?.enrollments || enrollmentData || [];
                    exportData = formatEnrollmentDataForExport(enrollmentDataToExport);

                    // Validate export data
                    if (!exportData || exportData.length === 0) {
                        toast.error("No enrollment data available for export");
                        return;
                    }

                    filename = `enrollment-report-${enrollmentDateRange.startDate}-to-${enrollmentDateRange.endDate}.xlsx`;
                    sheetName = 'Enrollment Report';
                    break;
                default:
                    return;
            }

            const success = exportToExcel(exportData, filename, sheetName);

            if (success) {
                toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} report exported successfully!`);
            } else {
                toast.error(`Failed to export ${type} report`);
            }
        } catch (error) {
            console.error("Export error:", error);
            toast.error(`Error exporting ${type} report`);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader variant="ring" size="lg" text="Loading reports..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Failed to load reports</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {error?.data?.message || "Please try again later"}
                    </p>
                </div>
            </div>
        );
    }

    // Calculate metrics
    const totalUsers = dashboardData?.users?.total || 0;
    const totalEnrollments = dashboardData?.enrollments?.total || 0;
    const totalRevenue = dashboardData?.earnings?.total || 0;
    const conversionRate = totalUsers > 0 ? ((totalEnrollments / totalUsers) * 100).toFixed(2) : 0;
    const successRate = totalEnrollments > 0 ? ((dashboardData?.enrollments?.completed || 0) / totalEnrollments * 100).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Reports Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Comprehensive view of all your business metrics and analytics
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                            <Button variant="outline" size="sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                Last 30 Days
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalUsers.toLocaleString()}</p>
                                    <div className="flex items-center mt-2">
                                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                                        <span className="text-sm text-green-600 dark:text-green-400">+12.5%</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
                                    <div className="flex items-center mt-2">
                                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                                        <span className="text-sm text-green-600 dark:text-green-400">+8.2%</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Enrollments</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalEnrollments.toLocaleString()}</p>
                                    <div className="flex items-center mt-2">
                                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                                        <span className="text-sm text-green-600 dark:text-green-400">+15.3%</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                                    <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{successRate}%</p>
                                    <div className="flex items-center mt-2">
                                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                                        <span className="text-sm text-green-600 dark:text-green-400">+2.1%</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                                    <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="earnings" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                            Earnings
                        </TabsTrigger>
                        <TabsTrigger value="enrollments" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                            Enrollments
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                            Analytics
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Enrollment Status */}
                            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-semibold">Enrollment Status</CardTitle>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleExport('dashboard')}
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Export
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                            <div className="flex items-center">
                                                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                                <span className="font-medium">Completed</span>
                                            </div>
                                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                {dashboardData?.enrollments?.completed || 0}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                            <div className="flex items-center">
                                                <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                                                <span className="font-medium">Pending</span>
                                            </div>
                                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                {dashboardData?.enrollments?.pending || 0}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                            <div className="flex items-center">
                                                <XCircle className="h-5 w-5 text-red-500 mr-3" />
                                                <span className="font-medium">Cancelled</span>
                                            </div>
                                            <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                                {dashboardData?.enrollments?.cancelled || 0}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Performance Metrics */}
                            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium">Conversion Rate</span>
                                                <span className="text-sm font-bold">{conversionRate}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${Math.min(conversionRate, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium">Success Rate</span>
                                                <span className="text-sm font-bold">{successRate}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${Math.min(successRate, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium">Active Users</span>
                                                <span className="text-sm font-bold">{dashboardData?.users?.active || 0}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${Math.min((dashboardData?.users?.active || 0) / totalUsers * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Earnings Tab */}
                    <TabsContent value="earnings" className="mt-6">
                        <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-semibold">Earnings Report</CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleExport('earnings')}
                                        disabled={!earningsData || earningsLoading}
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {earningsLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader variant="dots" size="md" text="Loading earnings data..." />
                                    </div>
                                ) : earningsData?.payments ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Payment ID</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Amount</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Date</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">User</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {earningsData.payments.slice(0, 10).map((payment, index) => (
                                                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                                        <td className="py-3 px-4 text-sm">{payment.id || `#${index + 1}`}</td>
                                                        <td className="py-3 px-4 text-sm font-medium">${payment.amount || 0}</td>
                                                        <td className="py-3 px-4">
                                                            <Badge
                                                                variant={payment.status === 'completed' ? 'default' : 'secondary'}
                                                                className={payment.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                                                            >
                                                                {payment.status || 'Pending'}
                                                            </Badge>
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{payment.date || 'N/A'}</td>
                                                        <td className="py-3 px-4 text-sm">{payment.user || 'Anonymous'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                        No earnings data available
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Enrollments Tab */}
                    <TabsContent value="enrollments" className="mt-6">
                        <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-semibold">Enrollment Report</CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleExport('enrollment')}
                                        disabled={!enrollmentData || enrollmentLoading}
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Export
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {enrollmentLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader variant="dots" size="md" text="Loading enrollment data..." />
                                    </div>
                                ) : enrollmentData?.enrollments ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Student</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Course</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Enrollment Date</th>
                                                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Progress</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {enrollmentData.enrollments.slice(0, 10).map((enrollment, index) => (
                                                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                                        <td className="py-3 px-4 text-sm font-medium">{enrollment.studentName || `Student ${index + 1}`}</td>
                                                        <td className="py-3 px-4 text-sm">{enrollment.course || 'Course Name'}</td>
                                                        <td className="py-3 px-4">
                                                            <Badge
                                                                variant={enrollment.status === 'completed' ? 'default' : 'secondary'}
                                                                className={enrollment.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                                                            >
                                                                {enrollment.status || 'Active'}
                                                            </Badge>
                                                        </td>
                                                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{enrollment.enrollmentDate || 'N/A'}</td>
                                                        <td className="py-3 px-4">
                                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                                <div
                                                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                                    style={{ width: `${Math.random() * 100}%` }}
                                                                ></div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                        No enrollment data available
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Weekly Revenue Chart */}
                            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold">Weekly Revenue</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-64 flex items-end justify-between space-x-2">
                                        {dashboardData?.earnings?.weekly?.map((week, index) => (
                                            <div key={index} className="flex flex-col items-center space-y-2">
                                                <div
                                                    className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg relative group transition-all duration-300 hover:scale-110"
                                                    style={{ height: `${Math.max((week.total / 9000) * 150, 15)}px` }}
                                                >
                                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                        ${week.total.toLocaleString()}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{week.week}</span>
                                            </div>
                                        )) || (
                                                <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-400">
                                                    No weekly data available
                                                </div>
                                            )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Top Performing Courses */}
                            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold">Top Performing Courses</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {dashboardData?.topProducts?.slice(0, 5).map((product, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                                                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm">{product.name || `Course ${index + 1}`}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">{product.category || 'Category'}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-sm">${product.revenue || 0}</p>
                                                    <p className="text-xs text-green-600 dark:text-green-400">+{product.growth || 0}%</p>
                                                </div>
                                            </div>
                                        )) || (
                                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                                    No course data available
                                                </div>
                                            )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ReportsViewPage;
