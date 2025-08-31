import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import { exportToExcel } from "@/utils/excel-export";
import { formatEnrollmentDataForExport } from "@/utils/enrollmentUtils";
import EnrollmentCard from "./EnrollmentCard";

const EnrollmentList = ({
    filteredEnrollments,
    formatDate,
    formatCurrency,
    onView,
    onDelete,
    isDeleting
}) => {
    // Handle Excel export
    const handleExportToExcel = () => {
        if (!filteredEnrollments || filteredEnrollments.length === 0) {
            toast.error("No enrollment data to export");
            return;
        }

        try {
            const exportData = formatEnrollmentDataForExport(filteredEnrollments);

            // Validate export data
            if (!exportData || exportData.length === 0) {
                toast.error("No valid data to export");
                return;
            }

            const filename = `enrollments_${new Date().toISOString().split('T')[0]}.xlsx`;
            const success = exportToExcel(exportData, filename, 'Enrollments');

            if (success) {
                toast.success(`Successfully exported ${filteredEnrollments.length} enrollments to Excel`);
            } else {
                toast.error("Failed to export enrollments. Please try again.");
            }
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Error exporting enrollments. Please check your browser settings.");
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Enrollments ({filteredEnrollments.length})</span>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2"
                        onClick={handleExportToExcel}
                        disabled={!filteredEnrollments || filteredEnrollments.length === 0}
                    >
                        <Download className="h-4 w-4" />
                        <span>Export to Excel</span>
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {filteredEnrollments.length === 0 ? (
                        <div className="text-center py-8">
                            <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 mb-2">No enrollments found</h3>
                            <p className="text-slate-600">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        filteredEnrollments.map((enrollment) => (
                            <EnrollmentCard
                                key={enrollment.id}
                                enrollment={enrollment}
                                formatDate={formatDate}
                                formatCurrency={formatCurrency}
                                onView={onView}
                                onDelete={onDelete}
                                isDeleting={isDeleting}
                            />
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default EnrollmentList;
