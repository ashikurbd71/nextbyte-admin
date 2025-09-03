import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

// Helper function to safely render values
const safeRender = (value, fallback = 0) => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === 'object') return fallback;
    return value;
};

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
                                    {safeRender(dashboardData?.courses?.total)} courses
                                </p>
                            </div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {safeRender(dashboardData?.courses?.total)}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    Active Courses
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {safeRender(dashboardData?.courses?.totalActive)} active
                                </p>
                            </div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {safeRender(dashboardData?.courses?.totalActive)}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    Average Rating
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {safeRender(dashboardData?.courses?.averageRating)} stars
                                </p>
                            </div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {safeRender(dashboardData?.courses?.averageRating)}/5
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    Total Certificates
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    {safeRender(dashboardData?.courses?.totalCertificates)} issued
                                </p>
                            </div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {safeRender(dashboardData?.courses?.totalCertificates)}
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
                                {safeRender(dashboardData?.enrollments?.statusStats?.active)}
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
                                {safeRender(dashboardData?.enrollments?.statusStats?.pending)}
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
                                {safeRender(dashboardData?.enrollments?.statusStats?.completed)}
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
                                {safeRender(dashboardData?.enrollments?.statusStats?.cancelled)}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PerformanceOverview;
