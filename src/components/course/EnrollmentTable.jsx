import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Mail, CheckCircle, XCircle, ShieldOff } from "lucide-react";

const EnrollmentTable = ({
    filteredEnrollments,
    searchTerm,
    statusFilter,
    onViewProgress,
    onSendIndividualMail,
    getStatusColor,
    getProgressColor
}) => {
    // Helper function to get student status color and text
    const getStudentStatusColor = (isActive, isBanned, isVerified) => {
        if (isBanned) return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
        if (isActive && isVerified) return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
        if (isActive && !isVerified) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
        if (!isActive) return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    };

    const getStudentStatusText = (isActive, isBanned, isVerified) => {
        if (isBanned) return "Banned";
        if (isActive && isVerified) return "Active";
        if (isActive && !isVerified) return "Pending";
        if (!isActive) return "Inactive";
        return "Unknown";
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Enrolled Students ({filteredEnrollments.length})</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {filteredEnrollments.length === 0 ? (
                    <div className="text-center py-8">
                        <Users className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                            No enrollments found
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            {searchTerm || statusFilter !== "all"
                                ? "Try adjusting your search or filter criteria"
                                : "This course doesn't have any enrolled students yet."
                            }
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Student</th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Email</th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Student Status</th>

                                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Amount Paid</th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Enrolled Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEnrollments.map((enrollment) => {
                                    const student = enrollment.student || enrollment;
                                    return (
                                        <tr key={enrollment.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-bold text-xs">
                                                            {student.name?.charAt(0)?.toUpperCase() || "S"}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900 dark:text-white">
                                                            {student.name || "Unknown Student"}
                                                        </p>
                                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                                            ID: {student.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                {student.email || "No email"}
                                            </td>

                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <Badge className={getStudentStatusColor(student.isActive, student.isBanned, student.isVerified)}>
                                                        {getStudentStatusText(student.isActive, student.isBanned, student.isVerified)}
                                                    </Badge>
                                                    {student.isVerified && (
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                    )}
                                                    {student.isBanned && (
                                                        <ShieldOff className="h-4 w-4 text-red-500" />
                                                    )}
                                                </div>
                                            </td>


                                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                {enrollment.amountPaid ? `$${enrollment.amountPaid}` : "N/A"}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                                                {enrollment.enrolledAt ? new Date(enrollment.enrolledAt).toLocaleDateString() : "N/A"}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => onViewProgress(student)}
                                                        className="text-green-600 hover:text-green-800"
                                                    >
                                                        <BookOpen className="h-4 w-4 mr-1" />
                                                        Progress
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => onSendIndividualMail(student)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Mail className="h-4 w-4 mr-1" />
                                                        Send Mail
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default EnrollmentTable;
