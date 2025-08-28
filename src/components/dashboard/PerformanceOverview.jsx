import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const PerformanceOverview = ({ dashboardData }) => {
    return (
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
                                    {dashboardData?.courses?.total || dashboardData?.courses || 0} courses
                                </p>
                            </div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {dashboardData?.courses?.total || dashboardData?.courses || 0}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    Active Courses
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {dashboardData?.courses?.totalActive || dashboardData?.courses?.active || 0} active
                                </p>
                            </div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {dashboardData?.courses?.totalActive || dashboardData?.courses?.active || 0}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    Average Rating
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {dashboardData?.courses?.averageRating || dashboardData?.courses?.rating || 0} stars
                                </p>
                            </div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {dashboardData?.courses?.averageRating || dashboardData?.courses?.rating || 0}/5
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    Total Certificates
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {dashboardData?.courses?.totalCertificates || dashboardData?.courses?.certificates || 0} issued
                                </p>
                            </div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {dashboardData?.courses?.totalCertificates || dashboardData?.courses?.certificates || 0}
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
                                {dashboardData?.enrollments?.statusStats?.active || dashboardData?.enrollments?.active || 0}
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
                                {dashboardData?.enrollments?.statusStats?.pending || dashboardData?.enrollments?.pending || 0}
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
                                {dashboardData?.enrollments?.statusStats?.completed || dashboardData?.enrollments?.completed || 0}
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
                                {dashboardData?.enrollments?.statusStats?.cancelled || dashboardData?.enrollments?.cancelled || 0}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PerformanceOverview;
