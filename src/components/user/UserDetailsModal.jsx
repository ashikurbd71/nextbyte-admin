import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Mail, Phone, MapPin, Calendar, User, GraduationCap, BookOpen, Shield, ShieldOff, CheckCircle, XCircle } from "lucide-react";
import { useGetUserByIdQuery } from "@/features/user/userApis";
import { Loader2 } from "lucide-react";

const UserDetailsModal = ({ userId, onClose }) => {
    const { data: user, isLoading, error } = useGetUserByIdQuery(userId, {
        skip: !userId,
    });

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

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

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 max-w-2xl w-full mx-4">
                    <div className="flex items-center justify-center h-32">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <span className="ml-2 text-slate-600 dark:text-slate-400">Loading user details...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 max-w-2xl w-full mx-4">
                    <div className="text-center">
                        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            Error Loading User Details
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            {error?.data?.message || "Failed to load user details"}
                        </p>
                        <Button onClick={onClose}>Close</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                {user?.name || "Unknown User"}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">{user?.email}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Status and Verification */}
                    <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(user?.isActive, user?.isBanned, user?.isVerified)}`}>
                            {getStatusText(user?.isActive, user?.isBanned, user?.isVerified)}
                        </span>
                        {user?.isVerified ? (
                            <div className="flex items-center space-x-1 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-sm font-medium">Verified</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-1 text-yellow-600">
                                <XCircle className="h-4 w-4" />
                                <span className="text-sm font-medium">Not Verified</span>
                            </div>
                        )}
                        {user?.isBanned && (
                            <div className="flex items-center space-x-1 text-red-600">
                                <ShieldOff className="h-4 w-4" />
                                <span className="text-sm font-medium">Banned</span>
                                {user?.banReason && (
                                    <span className="text-xs text-slate-500">({user.banReason})</span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* User Photo */}
                    {user?.photoUrl && (
                        <div className="flex justify-center">
                            <img
                                src={user.photoUrl}
                                alt={user.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-slate-200 dark:border-slate-700"
                            />
                        </div>
                    )}

                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <User className="h-5 w-5" />
                                <span>Personal Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Full Name</label>
                                    <p className="text-slate-900 dark:text-white">{user?.name || "N/A"}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Age</label>
                                    <p className="text-slate-900 dark:text-white">{user?.age || "N/A"}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</label>
                                    <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4 text-slate-400" />
                                        <p className="text-slate-900 dark:text-white">{user?.email || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Phone</label>
                                    <div className="flex items-center space-x-2">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                        <p className="text-slate-900 dark:text-white">{user?.phone || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Address</label>
                                    <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4 text-slate-400" />
                                        <p className="text-slate-900 dark:text-white">{user?.address || "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Academic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <GraduationCap className="h-5 w-5" />
                                <span>Academic Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Student ID</label>
                                    <p className="text-slate-900 dark:text-white">{user?.studentId || "N/A"}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Institute Name</label>
                                    <p className="text-slate-900 dark:text-white">{user?.instituteName || "N/A"}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Semester</label>
                                    <p className="text-slate-900 dark:text-white">{user?.semester || "N/A"}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Subject</label>
                                    <p className="text-slate-900 dark:text-white">{user?.subject || "N/A"}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Shield className="h-5 w-5" />
                                <span>Account Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">User ID</label>
                                    <p className="text-slate-900 dark:text-white font-mono">{user?.id || "N/A"}</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Account Status</label>
                                    <div className="flex items-center space-x-2">
                                        {user?.isActive ? (
                                            <div className="flex items-center space-x-1 text-green-600">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-sm">Active</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center space-x-1 text-gray-600">
                                                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                                <span className="text-sm">Inactive</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Created At</label>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-slate-400" />
                                        <p className="text-slate-900 dark:text-white">{formatDate(user?.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Last Updated</label>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-slate-400" />
                                        <p className="text-slate-900 dark:text-white">{formatDate(user?.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200 dark:border-slate-700">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsModal;
