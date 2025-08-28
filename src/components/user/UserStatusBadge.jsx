import React from "react";
import { CheckCircle } from "lucide-react";

const UserStatusBadge = ({ isActive, isBanned, isVerified }) => {
    const getStatusColor = (isActive, isBanned, isVerified) => {
        if (isBanned) return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
        if (isActive && isVerified) return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
        if (isActive && !isVerified) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
        if (!isActive) return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    };

    const getStatusText = (isActive, isBanned, isVerified) => {
        if (isBanned) return "Banned";
        if (isActive && isVerified) return "Active";
        if (isActive && !isVerified) return "Pending";
        if (!isActive) return "Inactive";
        return "Unknown";
    };

    return (
        <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(isActive, isBanned, isVerified)}`}>
                {getStatusText(isActive, isBanned, isVerified)}
            </span>
            {isVerified && (
                <CheckCircle className="h-4 w-4 text-green-500" />
            )}
        </div>
    );
};

export default UserStatusBadge;
