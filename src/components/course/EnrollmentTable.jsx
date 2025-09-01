import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Mail, CheckCircle, XCircle, ShieldOff, Phone, Calendar, DollarSign } from "lucide-react";
import { formatCurrency, formatDate } from "@/utils/enrollmentUtils";

const EnrollmentTable = ({
    filteredEnrollments,
    searchTerm,
    statusFilter,
    onViewProgress,
    onSendIndividualMail,
    getStatusColor,
    getProgressColor
}) => {
    // Helper function to get enrollment status color and text
    const getEnrollmentStatusColor = (status) => {
        switch (status) {
            case "active": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
            case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
            case "completed": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
            case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        }
    };

    const getPaymentStatusColor = (paymentStatus) => {
        switch (paymentStatus) {
            case "success": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
            case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
            case "failed": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        }
    };

    const getProgressColorClass = (progress) => {
        if (progress >= 81) return "text-green-600";
        if (progress >= 61) return "text-blue-600";
        if (progress >= 41) return "text-yellow-600";
        if (progress >= 21) return "text-orange-600";
        return "text-red-600";
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
                                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Contact</th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Progress</th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Status</th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Payment</th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Enrolled Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEnrollments.map((student) => (
                                    <tr key={student.studentId} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        {/* Student Info */}
                                        <td className="py-3 px-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold text-xs">
                                                        {student.studentName?.charAt(0)?.toUpperCase() || "S"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">
                                                        {student.studentName || "Unknown Student"}
                                                    </p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                                        ID: {student.studentId}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Contact Info */}
                                        <td className="py-3 px-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                                                    <Mail className="h-3 w-3" />
                                                    <span>{student.studentEmail || "No email"}</span>
                                                </div>
                                                {student.studentPhone && (
                                                    <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                                                        <Phone className="h-3 w-3" />
                                                        <span>{student.studentPhone}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        {/* Progress */}
                                        <td className="py-3 px-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className={`text-sm font-semibold ${getProgressColorClass(student.progress)}`}>
                                                        {student.progress}%
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-300 ${student.progress >= 81 ? 'bg-green-500' :
                                                            student.progress >= 61 ? 'bg-blue-500' :
                                                                student.progress >= 41 ? 'bg-yellow-500' :
                                                                    student.progress >= 21 ? 'bg-orange-500' : 'bg-red-500'
                                                            }`}
                                                        style={{ width: `${student.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Enrollment Status */}
                                        <td className="py-3 px-4">
                                            <Badge className={getEnrollmentStatusColor(student.status)}>
                                                {student.status?.charAt(0)?.toUpperCase() + student.status?.slice(1) || "Unknown"}
                                            </Badge>
                                        </td>

                                        {/* Payment Info */}
                                        <td className="py-3 px-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <DollarSign className="h-3 w-3 text-green-600" />
                                                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                        {formatCurrency(student.amountPaid)}
                                                    </span>
                                                </div>
                                                <Badge className={getPaymentStatusColor(student.paymentStatus)}>
                                                    {student.paymentStatus?.charAt(0)?.toUpperCase() + student.paymentStatus?.slice(1) || "Unknown"}
                                                </Badge>
                                            </div>
                                        </td>

                                        {/* Enrolled Date */}
                                        <td className="py-3 px-4">
                                            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                                                <Calendar className="h-3 w-3" />
                                                <span>
                                                    {student.enrolledAt ? formatDate(student.enrolledAt) : "Not enrolled"}
                                                </span>
                                            </div>
                                            {student.completedAt && (
                                                <div className="flex items-center space-x-2 text-sm text-green-600 mt-1">
                                                    <CheckCircle className="h-3 w-3" />
                                                    <span>Completed: {formatDate(student.completedAt)}</span>
                                                </div>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="py-3 px-4">
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onViewProgress({
                                                        id: student.studentId,
                                                        name: student.studentName,
                                                        email: student.studentEmail
                                                    })}
                                                    className="text-green-600 hover:text-green-800"
                                                >
                                                    <BookOpen className="h-4 w-4 mr-1" />
                                                    Progress
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onSendIndividualMail({
                                                        id: student.studentId,
                                                        name: student.studentName,
                                                        email: student.studentEmail
                                                    })}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <Mail className="h-4 w-4 mr-1" />
                                                    Send Mail
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default EnrollmentTable;
