import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PerformanceOverview = ({ dashboardData, topProducts, successRate }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Courses */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Top Performing Courses</CardTitle>
                        <Button variant="ghost" size="sm">View All</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topProducts.map((product, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {product.sales} sales
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-slate-900 dark:text-white">
                                        {product.revenue}
                                    </p>
                                    <p className="text-xs text-green-600">
                                        {product.growth}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
                <CardHeader>
                    <CardTitle>Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    Average Course Rating
                                </span>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    {dashboardData?.courses?.averageRating || dashboardData?.courses?.rating || 0}/5
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="h-2 bg-green-500 rounded-full" style={{ width: `${(dashboardData?.courses?.averageRating || dashboardData?.courses?.rating || 0) / 5 * 100}%` }}></div>
                            </div>
                            <p className="text-xs text-green-600">Based on student reviews</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    Student to Instructor Ratio
                                </span>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    {dashboardData?.users?.totalStudents || dashboardData?.users?.students || 0}:{dashboardData?.users?.totalInstructors || dashboardData?.users?.instructors || 0}
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="h-2 bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                            </div>
                            <p className="text-xs text-blue-600">Good balance</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    Course Completion Rate
                                </span>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    {successRate}%
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="h-2 bg-purple-500 rounded-full" style={{ width: `${successRate}%` }}></div>
                            </div>
                            <p className="text-xs text-purple-600">Based on completed enrollments</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    Certificate Issuance
                                </span>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                    {dashboardData?.courses?.totalCertificates || dashboardData?.courses?.certificates || 0}
                                </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="h-2 bg-orange-500 rounded-full" style={{ width: "45%" }}></div>
                            </div>
                            <p className="text-xs text-orange-600">Certificates issued</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PerformanceOverview;
