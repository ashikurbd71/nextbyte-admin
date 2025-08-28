import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Clock, AlertCircle, Info, CheckCircle, Trash2 } from "lucide-react";
import { useDeleteNotificationMutation } from "@/features/notification/notificationApis";
import { toast } from "react-hot-toast";

const NotificationCard = ({ notification, isDropdown = false, onClick, showDeleteButton = true }) => {
    const [deleteNotification, { isLoading: isDeleting }] = useDeleteNotificationMutation();

    // Debug: Log notification structure
    React.useEffect(() => {
        if (notification && showDeleteButton) {
            console.log("Notification object:", notification);
        }
    }, [notification, showDeleteButton]);

    const handleDelete = async (e) => {
        e.stopPropagation(); // Prevent triggering the card click

        // Try different possible ID field names
        const notificationId = notification?._id || notification?.id || notification?.notificationId || notification?.notification_id;

        if (!notificationId) {
            console.error("Notification object:", notification);
            console.error("Available keys:", Object.keys(notification || {}));
            toast.error("Cannot delete notification: ID not found");
            return;
        }

        try {
            await deleteNotification(notificationId).unwrap();
            toast.success("Notification deleted successfully");
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete notification");
        }
    };
    const getPriorityIcon = (priority) => {
        switch (priority) {
            case "high":
            case "urgent":
                return <AlertCircle className="h-4 w-4 text-red-500" />;
            case "medium":
                return <Info className="h-4 w-4 text-yellow-500" />;
            case "low":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            default:
                return <Bell className="h-4 w-4 text-blue-500" />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
            case "urgent":
                return "border-l-red-500";
            case "medium":
                return "border-l-yellow-500";
            case "low":
                return "border-l-green-500";
            default:
                return "border-l-blue-500";
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) return "Just now";
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 48) return "Yesterday";
        return date.toLocaleDateString();
    };

    return (
        <Card
            className={`mb-3 cursor-pointer hover:shadow-md transition-shadow ${!notification?.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
                } ${getPriorityColor(notification?.metadata?.priority || "medium")} border-l-4`}
            onClick={onClick}
        >
            <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                        {getPriorityIcon(notification?.metadata?.priority || "medium")}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                {notification?.title || "Notification"}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-slate-500">
                                <Clock className="h-3 w-3" />
                                <span>{formatDate(notification?.createdAt)}</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                            {notification?.message || "No message content"}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                            {notification?.metadata?.category && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                                    {notification.metadata.category}
                                </span>
                            )}
                            {showDeleteButton && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default NotificationCard;
