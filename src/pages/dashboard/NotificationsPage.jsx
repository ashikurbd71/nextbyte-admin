import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetNotificationHistoryQuery, useGetNotificationStatsQuery } from "@/features/notification/notificationApis";
import { Bell, Mail, Clock, Users, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import NotificationCard from "@/components/notification/NotificationCard";
import CreateNotificationModal from "@/components/user/CreateNotificationModal";

// Mock data for testing
const mockNotifications = [
    {
        _id: "1",
        title: "Welcome to NextByte",
        message: "Welcome to our platform! We're excited to have you here.",
        metadata: {
            priority: "medium",
            category: "welcome"
        },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isRead: false
    },
    {
        _id: "2",
        title: "System Maintenance",
        message: "Scheduled maintenance will occur tonight at 2 AM EST.",
        metadata: {
            priority: "high",
            category: "maintenance"
        },
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isRead: true
    },
    {
        _id: "3",
        title: "New Feature Available",
        message: "Check out our new notification system!",
        metadata: {
            priority: "low",
            category: "update"
        },
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        isRead: false
    }
];

const NotificationsPage = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showReadOnly, setShowReadOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);

    const { data: apiNotifications = [], isLoading: notificationsLoading, error: notificationsError } = useGetNotificationHistoryQuery();
    const { data: stats, isLoading: statsLoading } = useGetNotificationStatsQuery();

    // Use mock data if API is not available, otherwise use API data
    const notifications = apiNotifications.length > 0 ? apiNotifications : mockNotifications;

    const filteredNotifications = showReadOnly
        ? notifications.filter(n => n.isRead)
        : notifications;

    // Pagination logic
    const totalItems = filteredNotifications.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentNotifications = filteredNotifications.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Reset to first page when filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [showReadOnly]);

    const statsCards = [
        {
            title: "Total Notifications",
            value: stats?.totalNotifications || notifications.length,
            icon: Bell,
            color: "text-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            title: "Unread Notifications",
            value: stats?.unreadNotifications || notifications.filter(n => !n.isRead).length,
            icon: EyeOff,
            color: "text-red-600",
            bgColor: "bg-red-50 dark:bg-red-900/20"
        },
        {
            title: "Sent Today",
            value: stats?.sentToday || notifications.filter(n => {
                const today = new Date();
                const notificationDate = new Date(n.createdAt);
                return today.toDateString() === notificationDate.toDateString();
            }).length,
            icon: Clock,
            color: "text-green-600",
            bgColor: "bg-green-50 dark:bg-green-900/20"
        },
        {
            title: "Active Users",
            value: stats?.activeUsers || 0,
            icon: Users,
            color: "text-purple-600",
            bgColor: "bg-purple-50 dark:bg-purple-900/20"
        }
    ];

    if (notificationsError && apiNotifications.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6 text-center">
                        <Bell className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Error Loading Notifications</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            {notificationsError?.data?.message || "Failed to load notifications"}
                        </p>
                        <Button onClick={() => window.location.reload()}>
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Notifications
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Manage and view all system notifications.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Actions Bar */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant={showReadOnly ? "default" : "outline"}
                                size="sm"
                                onClick={() => setShowReadOnly(!showReadOnly)}
                            >
                                {showReadOnly ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                                {showReadOnly ? "Show All" : "Show Read Only"}
                            </Button>
                            <Badge >
                                {totalItems} notifications
                            </Badge>
                        </div>
                        <Button size="sm" onClick={() => setShowCreateModal(true)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Send New Notification
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Notifications List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Bell className="h-5 w-5" />
                        <span>Notification History</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {notificationsLoading ? (
                        <div className="flex items-center justify-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : currentNotifications.length > 0 ? (
                        <div className="space-y-4">
                            {currentNotifications.map((notification, index) => (
                                <NotificationCard
                                    key={notification._id || index}
                                    notification={notification}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                                No notifications found
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                {showReadOnly
                                    ? "No read notifications to display."
                                    : "No notifications have been sent yet."
                                }
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} notifications
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>

                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={currentPage === pageNum ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => handlePageChange(pageNum)}
                                                className="w-8 h-8 p-0"
                                            >
                                                {pageNum}
                                            </Button>
                                        );
                                    })}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Create Notification Modal */}
            <CreateNotificationModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={() => {
                    setShowCreateModal(false);
                    // The query will automatically refetch due to cache invalidation
                }}
            />
        </div>
    );
};

export default NotificationsPage;
