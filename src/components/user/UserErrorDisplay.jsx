import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const UserErrorDisplay = ({ error, onRetry }) => {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Error Loading Users
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {error?.data?.message || "Failed to load users"}
                </p>
                <Button onClick={onRetry}>
                    Try Again
                </Button>
            </div>
        </div>
    );
};

export default UserErrorDisplay;
