import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Download,
    Users,
    Star
} from "lucide-react";
import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboardApi";
import { exportToExcel, formatDashboardDataForExport } from "@/utils/excel-export";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const QuickActions = () => {
    const { data: dashboardData } = useGetDashboardStatsQuery();

    const handleDownloadReport = () => {
        if (!dashboardData) {
            toast.error("No data available for export");
            return;
        }

        try {
            const exportData = formatDashboardDataForExport(dashboardData);
            const success = exportToExcel(
                exportData,
                `dashboard-report-${new Date().toISOString().split('T')[0]}.xlsx`,
                'Dashboard Report'
            );

            if (success) {
                toast.success("Report exported successfully!");
            } else {
                toast.error("Failed to export report");
            }
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Error exporting report");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Meeting
                </Button>
                <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={handleDownloadReport}
                    disabled={!dashboardData}
                >
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                </Button>
                <Button className="w-full  justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Add New User
                </Button>


                <Button className="w-full justify-start" variant="outline">
                    <Link to="/analytics" className="mt-3 flex items-center">
                        <Star className="mr-2 h-4 w-4" />
                        View Analytics
                    </Link>
                </Button>

            </CardContent>
        </Card >
    );
};

export default QuickActions;
