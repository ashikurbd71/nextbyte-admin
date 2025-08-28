import React, { useState, useEffect } from "react";
import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboardApi";
import { useGetEarningsReportQuery } from "@/features/earnings-report/earningsreportApis";
import { useGetEnrollmentReportQuery } from "@/features/enrollment-report/enrollmentreportApis";
import Loader from "@/components/loader/Loader";
import {
    AnalyticsHeader,
    ActionBar,
    MetricsCards,
    ChartsSection,
    WeeklyRevenueChart,
    PerformanceOverview,
    EarningsReport,
    EnrollmentReport
} from "@/components/analytics";

const AnalyticsPage = () => {
    const { data: dashboardData, isLoading, error } = useGetDashboardStatsQuery();

    // Earnings report with date range state
    const [earningsDateRange, setEarningsDateRange] = useState({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
        endDate: new Date().toISOString().split('T')[0] // today
    });
    const { data: earningsData, isLoading: earningsLoading, error: earningsError, refetch: refetchEarnings } = useGetEarningsReportQuery(earningsDateRange);

    // Enrollment report with date range state
    const [enrollmentDateRange, setEnrollmentDateRange] = useState({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
        endDate: new Date().toISOString().split('T')[0] // today
    });
    const { data: enrollmentData, isLoading: enrollmentLoading, error: enrollmentError, refetch: refetchEnrollment } = useGetEnrollmentReportQuery(enrollmentDateRange);

    // Date picker state for earnings
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Date picker state for enrollment
    const [showEnrollmentDatePicker, setShowEnrollmentDatePicker] = useState(false);
    const [selectedEnrollmentStartDate, setSelectedEnrollmentStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    const [selectedEnrollmentEndDate, setSelectedEnrollmentEndDate] = useState(new Date());
    const [currentEnrollmentMonth, setCurrentEnrollmentMonth] = useState(new Date());

    // Date picker handlers for earnings
    const handleApplyDateRange = () => {
        setShowDatePicker(false);
        const newDateRange = {
            startDate: selectedStartDate.toISOString().split('T')[0],
            endDate: selectedEndDate.toISOString().split('T')[0]
        };
        setEarningsDateRange(newDateRange);
        refetchEarnings();
    };

    const handleResetDateRange = () => {
        const today = new Date();
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        setSelectedStartDate(thirtyDaysAgo);
        setSelectedEndDate(today);
    };

    // Date picker handlers for enrollment
    const handleApplyEnrollmentDateRange = () => {
        setShowEnrollmentDatePicker(false);
        const newDateRange = {
            startDate: selectedEnrollmentStartDate.toISOString().split('T')[0],
            endDate: selectedEnrollmentEndDate.toISOString().split('T')[0]
        };
        setEnrollmentDateRange(newDateRange);
        refetchEnrollment();
    };

    const handleResetEnrollmentDateRange = () => {
        const today = new Date();
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        setSelectedEnrollmentStartDate(thirtyDaysAgo);
        setSelectedEnrollmentEndDate(today);
    };

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

    // Calculate conversion rate - using raw API response
    const totalEnrollments = dashboardData?.enrollments?.statusStats?.total || dashboardData?.enrollments?.total || 0;
    const totalUsers = dashboardData?.users?.total || dashboardData?.users || 0;
    const conversionRate = totalUsers > 0 ? ((totalEnrollments / totalUsers) * 100).toFixed(2) : 0;

    // Calculate success rate - using raw API response
    const completedEnrollments = dashboardData?.enrollments?.statusStats?.completed || dashboardData?.enrollments?.completed || 0;
    const successRate = totalEnrollments > 0 ? ((completedEnrollments / totalEnrollments) * 100).toFixed(1) : 0;

    // Transform earnings data for chart - using raw API response
    const chartData = dashboardData?.earnings?.monthly?.map(item => ({
        month: item.month,
        revenue: item.total,
        users: Math.floor(Math.random() * 1000) + 500, // Mock data for demo
        orders: Math.floor(Math.random() * 500) + 100 // Mock data for demo
    })) || dashboardData?.earnings?.map((item, index) => ({
        month: item.month || `Month ${index + 1}`,
        revenue: item.total || item.amount || 0,
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

    // Transform top courses data - using raw API response
    const topProducts = dashboardData?.courses?.topCourses?.map((course, index) => ({
        name: course.name || `Course ${index + 1}`,
        sales: course.enrollmentCount || course.enrollments || 0,
        revenue: `$${((course.enrollmentCount || course.enrollments || 0) * 100).toLocaleString()}`,
        growth: `+${Math.floor(Math.random() * 20) + 5}%`
    })) || dashboardData?.courses?.map((course, index) => ({
        name: course.name || `Course ${index + 1}`,
        sales: course.enrollmentCount || course.enrollments || 0,
        revenue: `$${((course.enrollmentCount || course.enrollments || 0) * 100).toLocaleString()}`,
        growth: `+${Math.floor(Math.random() * 20) + 5}%`
    })) || [
            { name: "No courses available", sales: 0, revenue: "$0", growth: "0%" }
        ];

    // Transform enrollment status data - using raw API response
    const totalEnrollmentsForPercentage = dashboardData?.enrollments?.statusStats?.total || dashboardData?.enrollments?.total || 1;
    const trafficSources = [
        {
            source: "Active",
            percentage: Math.round((dashboardData?.enrollments?.statusStats?.active || dashboardData?.enrollments?.active || 0) / totalEnrollmentsForPercentage * 100),
            color: "bg-green-500"
        },
        {
            source: "Pending",
            percentage: Math.round((dashboardData?.enrollments?.statusStats?.pending || dashboardData?.enrollments?.pending || 0) / totalEnrollmentsForPercentage * 100),
            color: "bg-yellow-500"
        },
        {
            source: "Completed",
            percentage: Math.round((dashboardData?.enrollments?.statusStats?.completed || dashboardData?.enrollments?.completed || 0) / totalEnrollmentsForPercentage * 100),
            color: "bg-blue-500"
        },
        {
            source: "Cancelled",
            percentage: Math.round((dashboardData?.enrollments?.statusStats?.cancelled || dashboardData?.enrollments?.cancelled || 0) / totalEnrollmentsForPercentage * 100),
            color: "bg-red-500"
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <AnalyticsHeader />

            {/* Action Bar */}
            <ActionBar />

            {/* Metrics Cards */}
            <MetricsCards
                dashboardData={dashboardData}
                conversionRate={conversionRate}
                successRate={successRate}
            />

            {/* Charts Section */}
            <ChartsSection
                dashboardData={dashboardData}
                chartData={chartData}
                trafficSources={trafficSources}
            />

            {/* Weekly Revenue Chart */}
            <WeeklyRevenueChart dashboardData={dashboardData} />

            {/* Performance Overview */}
            <PerformanceOverview
                dashboardData={dashboardData}
                topProducts={topProducts}
                successRate={successRate}
            />

            {/* Earnings Report Section */}
            <EarningsReport
                earningsData={earningsData}
                earningsLoading={earningsLoading}
                earningsError={earningsError}
                earningsDateRange={earningsDateRange}
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                selectedStartDate={selectedStartDate}
                setSelectedStartDate={setSelectedStartDate}
                selectedEndDate={selectedEndDate}
                setSelectedEndDate={setSelectedEndDate}
                handleApplyDateRange={handleApplyDateRange}
                handleResetDateRange={handleResetDateRange}
            />

            {/* Enrollment Report Section */}
            <EnrollmentReport
                enrollmentData={enrollmentData}
                enrollmentLoading={enrollmentLoading}
                enrollmentError={enrollmentError}
                enrollmentDateRange={enrollmentDateRange}
                showEnrollmentDatePicker={showEnrollmentDatePicker}
                setShowEnrollmentDatePicker={setShowEnrollmentDatePicker}
                currentEnrollmentMonth={currentEnrollmentMonth}
                setCurrentEnrollmentMonth={setCurrentEnrollmentMonth}
                selectedEnrollmentStartDate={selectedEnrollmentStartDate}
                setSelectedEnrollmentStartDate={setSelectedEnrollmentStartDate}
                selectedEnrollmentEndDate={selectedEnrollmentEndDate}
                setSelectedEnrollmentEndDate={setSelectedEnrollmentEndDate}
                handleApplyEnrollmentDateRange={handleApplyEnrollmentDateRange}
                handleResetEnrollmentDateRange={handleResetEnrollmentDateRange}
            />
        </div>
    );
};

export default AnalyticsPage;
