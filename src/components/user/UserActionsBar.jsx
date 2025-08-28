import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Plus, Download, Settings, Mail } from "lucide-react";
import { exportToExcel, formatUserDataForExport } from "@/utils/exportUtils";
import { toast } from "react-hot-toast";
import UserExportModal from "./UserExportModal";
import CreateNotificationModal from "./CreateNotificationModal";

const UserActionsBar = ({
    showBannedUsers,
    setShowBannedUsers,
    setShowRegistrationForm,
    users = []
}) => {
    const [showExportModal, setShowExportModal] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);

    const handleQuickExport = () => {
        if (!users || users.length === 0) {
            toast.error("No users to export");
            return;
        }

        try {
            const formattedData = formatUserDataForExport(users);
            const filename = `users_export_${new Date().toISOString().split('T')[0]}.xlsx`;
            const success = exportToExcel(formattedData, filename, 'Users');

            if (success) {
                toast.success(`Successfully exported ${users.length} users to Excel`);
            } else {
                toast.error("Failed to export users");
            }
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Failed to export users");
        }
    };

    return (
        <>
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant={showBannedUsers ? "default" : "outline"}
                                size="sm"
                                onClick={() => setShowBannedUsers(!showBannedUsers)}
                            >
                                <Ban className="mr-2 h-4 w-4" />
                                {showBannedUsers ? "Show All" : "Show Banned"}
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowNotificationModal(true)}

                            >
                                <Mail className="mr-2 h-4 w-4" />
                                Send Mail
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleQuickExport}
                                disabled={!users || users.length === 0}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Quick Export
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowExportModal(true)}
                                disabled={!users || users.length === 0}
                            >
                                <Settings className="mr-2 h-4 w-4" />
                                Advanced Export
                            </Button>
                            <Button size="sm" onClick={() => setShowRegistrationForm(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add User
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Export Modal */}
            <UserExportModal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                users={users}
            />

            {/* Notification Modal */}
            <CreateNotificationModal
                isOpen={showNotificationModal}
                onClose={() => setShowNotificationModal(false)}
                onSuccess={() => {
                    setShowNotificationModal(false);
                    toast.success("Notification sent successfully!");
                }}
            />
        </>
    );
};

export default UserActionsBar;
