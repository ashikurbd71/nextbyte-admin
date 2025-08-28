export const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
};

export const getStatusColor = (isActive, isBanned, isVerified) => {
    if (isBanned) return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    if (isActive && isVerified) return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    if (isActive && !isVerified) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    if (!isActive) return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
};

export const getStatusText = (isActive, isBanned, isVerified) => {
    if (isBanned) return "Banned";
    if (isActive && isVerified) return "Active";
    if (isActive && !isVerified) return "Pending";
    if (!isActive) return "Inactive";
    return "Unknown";
};
