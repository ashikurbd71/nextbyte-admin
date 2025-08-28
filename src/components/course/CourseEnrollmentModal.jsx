import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Users, Calendar, Star } from "lucide-react";
import { useGetEnrolledStudentsQuery } from "@/features/course-apis/coursesApis";

const CourseEnrollmentModal = ({ courseId, courseTitle, onClose }) => {
    const { data: enrollments = [], isLoading, error } = useGetEnrolledStudentsQuery(courseId);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <CardHeader>
                        <CardTitle>Loading enrollments...</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="animate-pulse space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                                    <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                                        <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <CardHeader>
                        <CardTitle>Error loading enrollments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-600">Failed to load enrollments. Please try again.</p>
                        <Button onClick={onClose} className="mt-4">Close</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Course Enrollments
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                            {courseTitle}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {enrollments.length} enrolled students
                        </p>
                    </div>

                    {enrollments.length === 0 ? (
                        <div className="text-center py-8">
                            <Users className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                No enrollments yet
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                This course doesn't have any enrolled students yet.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {enrollments.map((enrollment) => (
                                <div
                                    key={enrollment.id}
                                    className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">
                                                {enrollment.student?.name?.charAt(0)?.toUpperCase() || "S"}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-slate-900 dark:text-white">
                                                {enrollment.student?.name || "Unknown Student"}
                                            </h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                {enrollment.student?.email || "No email"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="h-4 w-4 text-slate-400" />
                                            <span className="text-slate-600 dark:text-slate-400">
                                                {formatDate(enrollment.enrolledAt)}
                                            </span>
                                        </div>
                                        {enrollment.progress && (
                                            <Badge variant="secondary">
                                                {enrollment.progress}% Complete
                                            </Badge>
                                        )}
                                        {enrollment.rating && (
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                <span className="text-slate-600 dark:text-slate-400">
                                                    {enrollment.rating.toFixed(1)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default CourseEnrollmentModal;
