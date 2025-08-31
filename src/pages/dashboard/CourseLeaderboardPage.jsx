import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Medal, Award, Star, TrendingUp, Users, Target, Download } from "lucide-react";
import { useGetCourseLeaderboardQuery } from "@/features/enrollment-apis/enrollmentApis";
import { useGetCourseByIdQuery } from "@/features/course-apis/coursesApis";
import { exportToExcel } from "@/utils/excel-export";
import { toast } from "react-hot-toast";
import Loader from "@/components/loader/Loader";

const CourseLeaderboardPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const { data: leaderboardData, isLoading, error } = useGetCourseLeaderboardQuery(courseId);
    const { data: course, isLoading: courseLoading } = useGetCourseByIdQuery(courseId);

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <Trophy className="h-8 w-8 text-yellow-500" />;
            case 2:
                return <Medal className="h-8 w-8 text-gray-400" />;
            case 3:
                return <Award className="h-8 w-8 text-amber-600" />;
            default:
                return <span className="text-xl font-bold text-slate-600">#{rank}</span>;
        }
    };

    const getRankBadgeColor = (rank) => {
        switch (rank) {
            case 1:
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case 2:
                return "bg-gray-100 text-gray-800 border-gray-200";
            case 3:
                return "bg-amber-100 text-amber-800 border-amber-200";
            default:
                return "bg-slate-100 text-slate-800 border-slate-200";
        }
    };

    const getProgressColor = (progress) => {
        if (progress >= 80) return "text-green-600";
        if (progress >= 60) return "text-yellow-600";
        if (progress >= 40) return "text-orange-600";
        return "text-red-600";
    };

    const getAverageMarksColor = (marks) => {
        if (marks >= 80) return "text-green-600";
        if (marks >= 60) return "text-yellow-600";
        if (marks >= 40) return "text-orange-600";
        return "text-red-600";
    };

    const handleExportToExcel = () => {
        if (!leaderboardData || leaderboardData.length === 0) {
            toast.error("No leaderboard data to export");
            return;
        }

        const exportData = leaderboardData.map((item, index) => ({
            'Rank': item.rank || index + 1,
            'Student Name': item.studentName || item.student?.name || 'Unknown',
            'Email': item.student?.email || 'No email',
            'Phone': item.student?.phone || 'No phone',
            'Average Marks': item.averageMarks?.toFixed(1) || '0.0',
            'Assignment Count': item.assignmentCount || 0,
            'Total Marks': item.totalMarks || 0,
            'Progress': `${item.progress || 0}%`,
            'Status': item.status || 'pending',
            'Enrolled At': item.enrolledAt ? new Date(item.enrolledAt).toLocaleDateString() : 'N/A',
            'Completed At': item.completedAt ? new Date(item.completedAt).toLocaleDateString() : 'N/A'
        }));

        const filename = `${course?.data?.name || 'Course'}_leaderboard_${new Date().toISOString().split('T')[0]}.xlsx`;
        const success = exportToExcel(exportData, filename, 'Course Leaderboard');

        if (success) {
            toast.success(`Successfully exported ${leaderboardData.length} leaderboard entries to Excel`);
        } else {
            toast.error("Failed to export leaderboard data");
        }
    };

    if (isLoading || courseLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader variant="ring" size="lg" text="Loading leaderboard..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-600 mb-4">
                        <TrendingUp className="h-12 w-12 mx-auto" />
                    </div>
                    <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Leaderboard</h2>
                    <p className="text-gray-600 mb-4">Failed to load leaderboard data. Please try again.</p>
                    <Button onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const leaderboard = leaderboardData || [];
    const courseName = course?.data?.name || 'Course';

    return (
        <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" onClick={() => navigate(-1)}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center space-x-3">
                            <Trophy className="h-8 w-8 text-yellow-500" />
                            <span>Course Leaderboard</span>
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                            {courseName} - Student Performance Rankings
                        </p>
                    </div>
                </div>
                <Button onClick={handleExportToExcel} className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export to Excel</span>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <Users className="h-8 w-8 text-blue-600" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{leaderboard.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <Target className="h-8 w-8 text-green-600" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Active Students</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {leaderboard.filter(item => item.status === 'active').length}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <Star className="h-8 w-8 text-yellow-600" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Avg Marks</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {leaderboard.length > 0
                                        ? (leaderboard.reduce((sum, item) => sum + (item.averageMarks || 0), 0) / leaderboard.length).toFixed(1)
                                        : '0.0'
                                    }
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-3">
                            <TrendingUp className="h-8 w-8 text-purple-600" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Avg Progress</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {leaderboard.length > 0
                                        ? (leaderboard.reduce((sum, item) => sum + (item.progress || 0), 0) / leaderboard.length).toFixed(1)
                                        : '0.0'
                                    }%
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Leaderboard */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Student Rankings</span>
                        <Badge variant="outline" className="text-sm">
                            {leaderboard.length} Students
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {leaderboard.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                No Leaderboard Data
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                No students have enrolled in this course yet.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Leaderboard Header */}
                            <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg font-medium text-sm">
                                <div className="col-span-1 text-center">Rank</div>
                                <div className="col-span-3">Student</div>
                                <div className="col-span-2 text-center">Avg Marks</div>
                                <div className="col-span-2 text-center">Assignments</div>
                                <div className="col-span-2 text-center">Progress</div>
                                <div className="col-span-2 text-center">Status</div>
                            </div>

                            {/* Leaderboard Items */}
                            {leaderboard.map((item, index) => (
                                <div
                                    key={item.student?.id || index}
                                    className="grid grid-cols-12 gap-4 p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    {/* Rank */}
                                    <div className="col-span-1 flex items-center justify-center">
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${getRankBadgeColor(item.rank)}`}>
                                            {getRankIcon(item.rank)}
                                        </div>
                                    </div>

                                    {/* Student Info */}
                                    <div className="col-span-3 flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">
                                                {item.student?.name?.charAt(0)?.toUpperCase() || "S"}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">
                                                {item.studentName || item.student?.name || "Unknown"}
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                {item.student?.email || "No email"}
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                {item.student?.phone || "No phone"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Average Marks */}
                                    <div className="col-span-2 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className={`font-bold text-xl ${getAverageMarksColor(item.averageMarks)}`}>
                                                {item.averageMarks?.toFixed(1) || "0.0"}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                / 100
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                Total: {item.totalMarks || 0}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assignment Count */}
                                    <div className="col-span-2 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="font-bold text-xl text-slate-900 dark:text-white">
                                                {item.assignmentCount || 0}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                completed
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="col-span-2 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className={`font-bold text-xl ${getProgressColor(item.progress)}`}>
                                                {item.progress || 0}%
                                            </div>
                                            <div className="w-20 h-2 bg-slate-200 rounded-full mt-1">
                                                <div
                                                    className={`h-full rounded-full ${getProgressColor(item.progress).replace('text-', 'bg-')}`}
                                                    style={{ width: `${item.progress || 0}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="col-span-2 flex items-center justify-center">
                                        <Badge
                                            variant={item.status === "active" ? "default" : "secondary"}
                                            className={item.status === "active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"}
                                        >
                                            {item.status || "pending"}
                                        </Badge>
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

export default CourseLeaderboardPage;

