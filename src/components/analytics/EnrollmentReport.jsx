import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Users, Activity, Target, TrendingUp, CalendarDays } from "lucide-react";
import DatePicker from "./DatePicker";
import Loader from "@/components/loader/Loader";
import { exportToExcel } from "@/utils/excel-export";
import { formatEnrollmentDataForExport } from "@/utils/enrollmentUtils";
import toast from "react-hot-toast";

const EnrollmentReport = ({
    enrollmentData,
    enrollmentLoading,
    enrollmentError,
    enrollmentDateRange,
    showEnrollmentDatePicker,
    setShowEnrollmentDatePicker,
    currentEnrollmentMonth,
    setCurrentEnrollmentMonth,
    selectedEnrollmentStartDate,
    setSelectedEnrollmentStartDate,
    selectedEnrollmentEndDate,
    setSelectedEnrollmentEndDate,
    handleApplyEnrollmentDateRange,
    handleResetEnrollmentDateRange
}) => {
    const handleExportEnrollment = () => {
        if (!enrollmentData) {
            toast.error("No enrollment data available for export");
            return;
        }

        try {
            // Handle different enrollment data structures
            const enrollmentDataToExport = enrollmentData?.enrollments || enrollmentData || [];
            const exportData = formatEnrollmentDataForExport(enrollmentDataToExport);

            // Validate export data
            if (!exportData || exportData.length === 0) {
                toast.error("No enrollment data available for export");
                return;
            }

            const success = exportToExcel(
                exportData,
                `enrollment-report-${enrollmentDateRange.startDate}-to-${enrollmentDateRange.endDate}.xlsx`,
                'Enrollment Report'
            );

            if (success) {
                toast.success("Enrollment report exported successfully!");
            } else {
                toast.error("Failed to export enrollment report. Please try again.");
            }
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Error exporting enrollment report. Please check your browser settings.");
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Enrollment Report</CardTitle>
                    <div className="flex items-center space-x-2">
                        <DatePicker
                            showDatePicker={showEnrollmentDatePicker}
                            setShowDatePicker={setShowEnrollmentDatePicker}
                            currentMonth={currentEnrollmentMonth}
                            setCurrentMonth={setCurrentEnrollmentMonth}
                            selectedStartDate={selectedEnrollmentStartDate}
                            setSelectedStartDate={setSelectedEnrollmentStartDate}
                            selectedEndDate={selectedEnrollmentEndDate}
                            setSelectedEndDate={setSelectedEnrollmentEndDate}
                            onApply={handleApplyEnrollmentDateRange}
                            onReset={handleResetEnrollmentDateRange}
                            title="Select Enrollment Date Range"
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleExportEnrollment}
                            disabled={!enrollmentData || enrollmentLoading}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {enrollmentLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <Loader variant="ring" size="md" text="Loading enrollment data..." />
                    </div>
                ) : enrollmentError ? (
                    <div className="text-center py-8">
                        <p className="text-red-600 dark:text-red-400">Failed to load enrollment data</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            {enrollmentError?.data?.message || "Please try again later"}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Enrollment Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Enrollments</p>
                                            <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                                                {enrollmentData?.totalEnrollments?.toLocaleString() || 0}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
                                            <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-green-600 dark:text-green-400">Completed</p>
                                            <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                                                {enrollmentData?.completedEnrollments?.toLocaleString() || 0}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-green-100 dark:bg-green-800/30 rounded-lg">
                                            <Activity className="h-8 w-8 text-green-600 dark:text-green-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Active</p>
                                            <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                                                {enrollmentData?.activeEnrollments?.toLocaleString() || 0}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                                            <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Completion Rate</p>
                                            <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">
                                                {enrollmentData?.completionRate?.toFixed(1) || 0}%
                                            </p>
                                        </div>
                                        <div className="p-3 bg-orange-100 dark:bg-orange-800/30 rounded-lg">
                                            <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Date Range Information */}
                        <Card className="bg-slate-50 dark:bg-slate-800/50">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <CalendarDays className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Report Period:</span>
                                    </div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">
                                        {new Date(enrollmentDateRange.startDate).toLocaleDateString()} - {new Date(enrollmentDateRange.endDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Enrollments List */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Enrollment Details</h3>
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                    {enrollmentData?.enrollments?.length || 0} enrollments
                                </span>
                            </div>

                            {enrollmentData?.enrollments && enrollmentData.enrollments.length > 0 ? (
                                <div className="space-y-3">
                                    {enrollmentData.enrollments.map((enrollment, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${enrollment.status === 'completed' ? 'bg-green-500' :
                                                    enrollment.status === 'active' ? 'bg-blue-500' :
                                                        enrollment.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}>
                                                    <Users className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">
                                                        {enrollment.studentName || `Student ${index + 1}`}
                                                    </p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                                        {enrollment.courseName || 'Course Name'}
                                                    </p>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500">
                                                        {enrollment.enrollmentDate ? new Date(enrollment.enrollmentDate).toLocaleDateString() : 'Date not available'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${enrollment.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                                    enrollment.status === 'active' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                                        enrollment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                    }`}>
                                                    {enrollment.status?.charAt(0).toUpperCase() + enrollment.status?.slice(1) || 'Unknown'}
                                                </div>
                                                {enrollment.progress && (
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                                        {enrollment.progress}% complete
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Users className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400">No enrollment data available for this period</p>
                                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                                        Enrollments will appear here when students register for courses
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default EnrollmentReport;
