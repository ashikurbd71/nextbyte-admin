import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Download, Eye } from "lucide-react";
import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboardApi";
import { exportToExcel, formatDashboardDataForExport } from "@/utils/excel-export";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ActionBar = () => {
    const { data: dashboardData } = useGetDashboardStatsQuery();

    const handleExport = () => {
        if (!dashboardData) {
            toast.error("No data available for export");
            return;
        }

        try {
            const exportData = formatDashboardDataForExport(dashboardData);
            const success = exportToExcel(
                exportData,
                `analytics-report-${new Date().toISOString().split('T')[0]}.xlsx`,
                'Analytics Report'
            );

            if (success) {
                toast.success("Analytics report exported successfully!");
            } else {
                toast.error("Failed to export analytics report");
            }
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Error exporting analytics report");
        }
    };

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm">
                            <Calendar className="mr-2 h-4 w-4" />
                            Last 30 Days
                        </Button>
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleExport}
                            disabled={!dashboardData}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Link to="/reports">
                            <Button size="sm">
                                <Eye className="mr-2 h-4 w-4" />
                                View Report
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ActionBar;
