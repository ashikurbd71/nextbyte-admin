import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ChartsSection = ({ dashboardData, chartData, trafficSources }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart */}
            <Card className="lg:col-span-2">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Revenue Overview</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">Revenue</Button>
                            <Button variant="outline" size="sm">Users</Button>
                            <Button variant="outline" size="sm">Orders</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-80 flex items-end justify-between space-x-2">
                        {chartData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center space-y-2">
                                <div className="w-12 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg relative group"
                                    style={{ height: `${Math.max((data.revenue / 9000) * 200, 20)}px` }}>
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ${data.revenue.toLocaleString()}
                                    </div>
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{data.month}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">
                            Total Revenue: ${dashboardData?.earnings?.totalYear?.toLocaleString() || 0}
                        </span>
                        <span className="text-green-600">+12.5% vs last period</span>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <div className="text-center">
                            <div className="font-medium text-slate-900 dark:text-white">
                                ${dashboardData?.earnings?.totalMonth?.toLocaleString() || 0}
                            </div>
                            <div>This Month</div>
                        </div>
                        <div className="text-center">
                            <div className="font-medium text-slate-900 dark:text-white">
                                ${dashboardData?.earnings?.totalWeek?.toLocaleString() || 0}
                            </div>
                            <div>This Week</div>
                        </div>
                        <div className="text-center">
                            <div className="font-medium text-slate-900 dark:text-white">
                                ${dashboardData?.earnings?.totalToday?.toLocaleString() || 0}
                            </div>
                            <div>Today</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Enrollment Status Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle>Enrollment Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {trafficSources.map((source, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                        {source.source}
                                    </span>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        {source.percentage}%
                                    </span>
                                </div>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${source.color}`}
                                        style={{ width: `${source.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChartsSection;
