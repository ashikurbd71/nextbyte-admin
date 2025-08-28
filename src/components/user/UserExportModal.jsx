import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { exportToExcel, formatUserDataForExport } from "@/utils/exportUtils";
import { toast } from "react-hot-toast";

const UserExportModal = ({ isOpen, onClose, users = [] }) => {
    const [selectedFields, setSelectedFields] = useState([
        'User ID', 'Name', 'Email', 'Phone', 'Status', 'Joined Date'
    ]);
    const [isExporting, setIsExporting] = useState(false);

    const availableFields = [
        { key: 'User ID', label: 'User ID' },
        { key: 'Name', label: 'Name' },
        { key: 'Email', label: 'Email' },
        { key: 'Phone', label: 'Phone' },
        { key: 'Status', label: 'Status' },
        { key: 'Is Active', label: 'Active Status' },
        { key: 'Is Verified', label: 'Verification Status' },
        { key: 'Is Banned', label: 'Ban Status' },
        { key: 'Joined Date', label: 'Joined Date' },
        { key: 'Last Updated', label: 'Last Updated' },
        { key: 'Role', label: 'Role' },
        { key: 'Address', label: 'Address' },
        { key: 'City', label: 'City' },
        { key: 'Country', label: 'Country' },
        { key: 'Postal Code', label: 'Postal Code' }
    ];

    const handleFieldToggle = (fieldKey) => {
        setSelectedFields(prev =>
            prev.includes(fieldKey)
                ? prev.filter(field => field !== fieldKey)
                : [...prev, fieldKey]
        );
    };

    const handleSelectAll = () => {
        setSelectedFields(availableFields.map(field => field.key));
    };

    const handleSelectNone = () => {
        setSelectedFields([]);
    };

    const handleExport = async () => {
        if (selectedFields.length === 0) {
            toast.error("Please select at least one field to export");
            return;
        }

        if (!users || users.length === 0) {
            toast.error("No users to export");
            return;
        }

        setIsExporting(true);

        try {
            // Format data with only selected fields
            const formattedData = users.map(user => {
                const userData = {
                    'User ID': user.id,
                    'Name': user.name || 'N/A',
                    'Email': user.email || 'N/A',
                    'Phone': user.phone || 'N/A',
                    'Status': getStatusText(user.isActive, user.isBanned, user.isVerified),
                    'Is Active': user.isActive ? 'Yes' : 'No',
                    'Is Verified': user.isVerified ? 'Yes' : 'No',
                    'Is Banned': user.isBanned ? 'Yes' : 'No',
                    'Joined Date': user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
                    'Last Updated': user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A',
                    'Role': user.role || 'N/A',
                    'Address': user.address || 'N/A',
                    'City': user.city || 'N/A',
                    'Country': user.country || 'N/A',
                    'Postal Code': user.postalCode || 'N/A'
                };

                // Filter to only include selected fields
                const filteredData = {};
                selectedFields.forEach(field => {
                    if (userData[field] !== undefined) {
                        filteredData[field] = userData[field];
                    }
                });

                return filteredData;
            });

            const filename = `users_export_${new Date().toISOString().split('T')[0]}.xlsx`;
            const success = exportToExcel(formattedData, filename, 'Users');

            if (success) {
                toast.success(`Successfully exported ${users.length} users to Excel`);
                onClose();
            } else {
                toast.error("Failed to export users");
            }
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Failed to export users");
        } finally {
            setIsExporting(false);
        }
    };

    const getStatusText = (isActive, isBanned, isVerified) => {
        if (isBanned) return 'Banned';
        if (isActive && isVerified) return 'Active';
        if (isActive && !isVerified) return 'Pending';
        if (!isActive) return 'Inactive';
        return 'Unknown';
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                        <FileSpreadsheet className="h-5 w-5" />
                        <span>Export Users to Excel</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        Select the fields you want to include in the export.
                        {users.length > 0 && (
                            <span className="font-medium"> {users.length} users will be exported.</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Export Fields</Label>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSelectAll}
                                    className="text-xs"
                                >
                                    Select All
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleSelectNone}
                                    className="text-xs"
                                >
                                    Select None
                                </Button>
                            </div>
                        </div>

                        <div className="max-h-60 overflow-y-auto border rounded-md p-3 space-y-2">
                            {availableFields.map((field) => (
                                <div key={field.key} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={field.key}
                                        checked={selectedFields.includes(field.key)}
                                        onCheckedChange={() => handleFieldToggle(field.key)}
                                    />
                                    <Label
                                        htmlFor={field.key}
                                        className="text-sm cursor-pointer flex-1"
                                    >
                                        {field.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleExport}
                            disabled={isExporting || selectedFields.length === 0}
                            className="min-w-[100px]"
                        >
                            {isExporting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Exporting...
                                </>
                            ) : (
                                <>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserExportModal;
