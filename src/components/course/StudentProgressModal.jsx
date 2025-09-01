import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, Clock, DollarSign, TrendingUp, GraduationCap, AlertCircle } from "lucide-react";
import Loader from "@/components/loader/Loader";

const StudentProgressModal = ({
    isOpen,
    onClose,
    selectedStudent,
    studentProgress,
    progressLoading,
    getStatusColor,
    getProgressColor,
    formatCurrency,
    formatDate
}) => {
    if (!isOpen || !selectedStudent) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5" />
                        <span>Progress Report - {selectedStudent.name}</span>
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8"
                    >
                        <span className="sr-only">Close</span>
                        ×
                    </Button>
                </CardHeader>
                <CardContent>
                    {progressLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader variant="ring" size="lg" text="Loading progress data..." />
                        </div>
                    ) : studentProgress ? (
                        <div className="space-y-6">
                            {/* Student Info */}
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">
                                            {selectedStudent.name?.charAt(0)?.toUpperCase() || "S"}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {selectedStudent.name}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {selectedStudent.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Overall Statistics */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <BookOpen className="h-6 w-6 text-blue-600" />
                                            <div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">Total Enrollments</p>
                                                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                                                    {studentProgress.totalEnrollments || 0}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <CheckCircle className="h-6 w-6 text-green-600" />
                                            <div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">Completed Courses</p>
                                                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                                                    {studentProgress.completedCourses || 0}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <Clock className="h-6 w-6 text-yellow-600" />
                                            <div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">Active Courses</p>
                                                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                                                    {studentProgress.activeCourses || 0}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-3">
                                            <DollarSign className="h-6 w-6 text-green-600" />
                                            <div>
                                                <p className="text-sm text-slate-600 dark:text-slate-400">Total Spent</p>
                                                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                                                    {formatCurrency(studentProgress.totalSpent)}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Average Progress */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <TrendingUp className="h-5 w-5" />
                                        <span>Average Progress</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">Overall Progress</span>
                                            <span className="text-lg font-semibold text-slate-900 dark:text-white">
                                                {studentProgress.averageProgress || 0}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${getProgressColor(studentProgress.averageProgress || 0)}`}
                                                style={{ width: `${studentProgress.averageProgress || 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Course Enrollments */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <GraduationCap className="h-5 w-5" />
                                        <span>Course Enrollments</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {studentProgress.enrollments && studentProgress.enrollments.length > 0 ? (
                                        <div className="space-y-4">
                                            {studentProgress.enrollments.map((enrollment, index) => (
                                                <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h4 className="font-semibold text-slate-900 dark:text-white">
                                                            {enrollment.courseName}
                                                        </h4>
                                                        <Badge className={getStatusColor(enrollment.status)}>
                                                            {enrollment.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-slate-600 dark:text-slate-400">Progress</p>
                                                            <p className="font-medium text-slate-900 dark:text-white">
                                                                {enrollment.progress || 0}%
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-600 dark:text-slate-400">Amount Paid</p>
                                                            <p className="font-medium text-slate-900 dark:text-white">
                                                                {formatCurrency(enrollment.amountPaid)}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-600 dark:text-slate-400">Enrolled Date</p>
                                                            <p className="font-medium text-slate-900 dark:text-white">
                                                                {formatDate(enrollment.enrolledAt)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {enrollment.progress > 0 && (
                                                        <div className="mt-3">
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className={`h-2 rounded-full ${getProgressColor(enrollment.progress)}`}
                                                                    style={{ width: `${enrollment.progress}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <BookOpen className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                                No enrollments found
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                This student hasn't enrolled in any courses yet.
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                Error Loading Progress
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Failed to load progress data for this student.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentProgressModal;
