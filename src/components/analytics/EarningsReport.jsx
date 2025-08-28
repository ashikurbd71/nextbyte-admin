import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, DollarSign, CreditCard, CalendarDays } from "lucide-react";
import DatePicker from "./DatePicker";
import Loader from "@/components/loader/Loader";
import { exportToExcel, formatEarningsDataForExport } from "@/utils/excel-export";
import toast from "react-hot-toast";

const EarningsReport = ({
    earningsData,
    earningsLoading,
    earningsError,
    earningsDateRange,
    showDatePicker,
    setShowDatePicker,
    currentMonth,
    setCurrentMonth,
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    handleApplyDateRange,
    handleResetDateRange
}) => {
    const handleExportEarnings = () => {
        if (!earningsData) {
            toast.error("No earnings data available for export");
            return;
        }

        try {
            const exportData = formatEarningsDataForExport(earningsData);
            const success = exportToExcel(
                exportData, 
                `earnings-report-${earningsDateRange.startDate}-to-${earningsDateRange.endDate}.xlsx`,
                'Earnings Report'
            );
            
            if (success) {
                toast.success("Earnings report exported successfully!");
            } else {
                toast.error("Failed to export earnings report");
            }
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Error exporting earnings report");
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Earnings Report</CardTitle>
                    <div className="flex items-center space-x-2">
                        <DatePicker
                            showDatePicker={showDatePicker}
                            setShowDatePicker={setShowDatePicker}
                            currentMonth={currentMonth}
                            setCurrentMonth={setCurrentMonth}
                            selectedStartDate={selectedStartDate}
                            setSelectedStartDate={setSelectedStartDate}
                            selectedEndDate={selectedEndDate}
                            setSelectedEndDate={setSelectedEndDate}
                            onApply={handleApplyDateRange}
                            onReset={handleResetDateRange}
                            title="Select Earnings Date Range"
                        />
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleExportEarnings}
                            disabled={!earningsData || earningsLoading}
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {earningsLoading ? (
                    <div className="flex items-center justify-center h-32">
                        <Loader variant="ring" size="md" text="Loading earnings data..." />
                    </div>
                ) : earningsError ? (
                    <div className="text-center py-8">
                        <p className="text-red-600 dark:text-red-400">Failed to load earnings data</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            {earningsError?.data?.message || "Please try again later"}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Earnings Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Earnings</p>
                                            <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                                                ${earningsData?.totalEarnings?.toLocaleString() || 0}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-green-100 dark:bg-green-800/30 rounded-lg">
                                            <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Payments</p>
                                            <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                                                {earningsData?.totalPayments?.toLocaleString() || 0}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                                            <CreditCard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Date Range Information */}
                        <Card className="bg-slate-50 dark:bg-slate-800/50">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <CalendarDays className="h-4 w-4 text-slate-500" />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Report Period:</span>
                                    </div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">
                                        {new Date(earningsDateRange.startDate).toLocaleDateString()} - {new Date(earningsDateRange.endDate).toLocaleDateString()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payments List */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Payment Details</h3>
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                    {earningsData?.payments?.length || 0} payments
                                </span>
                            </div>

                            {earningsData?.payments && earningsData.payments.length > 0 ? (
                                <div className="space-y-3">
                                    {earningsData.payments.map((payment, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                                                    <DollarSign className="h-5 w-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">
                                                        Payment #{payment.id || index + 1}
                                                    </p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                                        {payment.date ? new Date(payment.date).toLocaleDateString() : 'Date not available'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-slate-900 dark:text-white">
                                                    ${payment.amount?.toLocaleString() || 0}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {payment.status || 'Completed'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <DollarSign className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400">No payment data available for this period</p>
                                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                                        Payments will appear here when transactions are processed
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default EarningsReport;
