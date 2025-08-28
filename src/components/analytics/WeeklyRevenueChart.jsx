import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const WeeklyRevenueChart = ({ dashboardData }) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Weekly Revenue Breakdown</CardTitle>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                    {dashboardData?.earnings?.weekly?.map((week, index) => (
                        <div key={index} className="flex flex-col items-center space-y-2">
                            <div className="w-8 bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg relative group"
                                style={{ height: `${Math.max((week.total / 9000) * 150, 15)}px` }}>
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    ${week.total.toLocaleString()}
                                </div>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{week.week}</span>
                        </div>
                    )) || (
                            <div className="flex items-center justify-center w-full h-full text-slate-500 dark:text-slate-400">
                                No weekly data available
                            </div>
                        )}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                        Weekly Total: ${dashboardData?.earnings?.totalWeek?.toLocaleString() || 0}
                    </span>
                    <span className="text-green-600">+8.7% vs last week</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default WeeklyRevenueChart;
