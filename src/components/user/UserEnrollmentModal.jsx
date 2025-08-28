import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    X,
    BookOpen,
    CheckCircle,
    Clock,
    DollarSign,
    TrendingUp,
    GraduationCap,
    Calendar,
    Loader2,
    AlertCircle
} from "lucide-react";
import { useGetUserEnrollmentPerformanceQuery } from "@/features/user/userApis";

const UserEnrollmentModal = ({ userId, userName, onClose }) => {
    const { data: enrollmentData, isLoading, error } = useGetUserEnrollmentPerformanceQuery(userId, {
        skip: !userId,
    });

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatCurrency = (amount) => {
        if (!amount) return "N/A";
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const getProgressColor = (progress) => {
        if (progress >= 80) return "text-green-600";
        if (progress >= 60) return "text-yellow-600";
        if (progress >= 40) return "text-orange-600";
        return "text-red-600";
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
            case 'active':
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
            case 'paused':
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
            case 'cancelled':
                return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        }
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 max-w-4xl w-full mx-4">
                    <div className="flex items-center justify-center h-32">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <span className="ml-2 text-slate-600 dark:text-slate-400">Loading enrollment data...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 max-w-4xl w-full mx-4">
                    <div className="text-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            Error Loading Enrollment Data
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            {error?.data?.message || "Failed to load enrollment data"}
                        </p>
                        <Button onClick={onClose}>Close</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            <GraduationCap className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Enrollment Performance
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">{userName}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Performance Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                        <BookOpen className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Total Enrollments
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {enrollmentData?.totalEnrollments || 0}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Completed Courses
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {enrollmentData?.completedCourses || 0}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                                        <Clock className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Active Courses
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {enrollmentData?.activeCourses || 0}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                                        <TrendingUp className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                            Average Progress
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {enrollmentData?.averageProgress || 0}%
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Total Spent Card */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                                    <DollarSign className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                        Total Amount Spent
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(enrollmentData?.totalSpent)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Enrollments List */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <BookOpen className="h-5 w-5" />
                                <span>Course Enrollments</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {enrollmentData?.enrollments && enrollmentData.enrollments.length > 0 ? (
                                <div className="space-y-4">
                                    {enrollmentData.enrollments.map((enrollment) => (
                                        <div
                                            key={enrollment.id}
                                            className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                                    {enrollment.courseName}
                                                </h4>
                                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(enrollment.status)}`}>
                                                    {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Progress</p>
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                                            <div
                                                                className={`h-2 rounded-full ${getProgressColor(enrollment.progress).replace('text-', 'bg-')}`}
                                                                style={{ width: `${enrollment.progress}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className={`text-sm font-semibold ${getProgressColor(enrollment.progress)}`}>
                                                            {enrollment.progress}%
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Amount Paid</p>
                                                    <p className="text-slate-900 dark:text-white font-semibold">
                                                        {formatCurrency(enrollment.amountPaid)}
                                                    </p>
                                                </div>

                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Enrolled Date</p>
                                                    <div className="flex items-center space-x-1">
                                                        <Calendar className="h-3 w-3 text-slate-400" />
                                                        <p className="text-slate-900 dark:text-white text-sm">
                                                            {formatDate(enrollment.enrolledAt)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Completed Date</p>
                                                    <div className="flex items-center space-x-1">
                                                        <Calendar className="h-3 w-3 text-slate-400" />
                                                        <p className="text-slate-900 dark:text-white text-sm">
                                                            {enrollment.completedAt ? formatDate(enrollment.completedAt) : "Not completed"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                                    <p className="text-slate-600 dark:text-slate-400">
                                        No enrollments found for this user.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200 dark:border-slate-700">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserEnrollmentModal;
