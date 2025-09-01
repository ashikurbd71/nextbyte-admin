import React from "react";
import { formatCurrency } from "@/utils/enrollmentUtils";

const EnrollmentStatistics = ({ statistics }) => {
    if (!statistics) return null;

    const {
        totalStudents,
        activeStudents,
        completedStudents,
        pendingStudents,
        progress,
        payments,
        trends,
        summary
    } = statistics;

    const StatCard = ({ title, value, subtitle, icon, color = "blue" }) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
                    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
                </div>
                {icon && (
                    <div className={`p-3 bg-${color}-100 rounded-full`}>
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );

    const ProgressBar = ({ percentage, color = "blue" }) => (
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
                className={`bg-${color}-600 h-2 rounded-full transition-all duration-300`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Main Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Students"
                    value={totalStudents}
                    color="blue"
                    icon={
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    }
                />

                <StatCard
                    title="Active Students"
                    value={activeStudents}
                    subtitle={`${((activeStudents / totalStudents) * 100).toFixed(1)}% of total`}
                    color="green"
                    icon={
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />

                <StatCard
                    title="Completed Students"
                    value={completedStudents}
                    subtitle={`${trends.completionRate}% completion rate`}
                    color="purple"
                    icon={
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    }
                />

                <StatCard
                    title="Pending Students"
                    value={pendingStudents}
                    subtitle="Awaiting enrollment"
                    color="yellow"
                    icon={
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
            </div>

            {/* Progress and Payment Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Progress Statistics */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Overview</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Average Progress</span>
                            <span className="text-lg font-bold text-blue-600">{progress.averageProgress}%</span>
                        </div>
                        <ProgressBar percentage={progress.averageProgress} color="blue" />

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">{progress.highProgressStudents}</p>
                                <p className="text-xs text-gray-500">High Progress</p>
                                <p className="text-xs text-gray-400">(81-100%)</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-yellow-600">{progress.mediumProgressStudents}</p>
                                <p className="text-xs text-gray-500">Medium Progress</p>
                                <p className="text-xs text-gray-400">(21-80%)</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-red-600">{progress.lowProgressStudents}</p>
                                <p className="text-xs text-gray-500">Low Progress</p>
                                <p className="text-xs text-gray-400">(0-20%)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Statistics */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Overview</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Total Revenue</span>
                            <span className="text-lg font-bold text-green-600">{formatCurrency(payments.totalRevenue)}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <p className="text-xl font-bold text-green-600">{payments.successfulPayments}</p>
                                <p className="text-xs text-gray-500">Successful</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-yellow-600">{payments.pendingPayments}</p>
                                <p className="text-xs text-gray-500">Pending</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-red-600">{payments.failedPayments}</p>
                                <p className="text-xs text-gray-500">Failed</p>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Average Amount</span>
                                <span className="text-sm font-semibold text-gray-900">{formatCurrency(payments.averageAmount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Distribution Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Distribution</h3>
                <div className="grid grid-cols-5 gap-4">
                    {Object.entries(progress.progressDistribution).map(([range, count]) => (
                        <div key={range} className="text-center">
                            <div className="bg-gray-100 rounded-lg p-4 mb-2">
                                <p className="text-2xl font-bold text-gray-900">{count}</p>
                            </div>
                            <p className="text-sm text-gray-600">{range}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">Enrollment Growth</h4>
                    <p className="text-blue-700">{summary.enrollmentGrowth}</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h4 className="text-sm font-semibold text-purple-800 mb-2">Performance Overview</h4>
                    <p className="text-purple-700">{summary.performanceOverview}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <h4 className="text-sm font-semibold text-green-800 mb-2">Revenue Status</h4>
                    <p className="text-green-700">{summary.revenueStatus}</p>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentStatistics;
