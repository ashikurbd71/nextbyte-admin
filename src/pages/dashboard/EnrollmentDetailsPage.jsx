import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    User,
    BookOpen,
    CreditCard,
    Calendar,
    DollarSign,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    GraduationCap,
    Download,
    Edit,
    Trash2
} from "lucide-react";
import { toast } from "react-hot-toast";
import Loader from "@/components/loader/Loader";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// API hooks
import { useGetEnrollmentByIdQuery } from "@/features/enrollment-apis/enrollmentApis";

const EnrollmentDetailsPage = () => {
    const { enrollmentId } = useParams();
    const navigate = useNavigate();
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    // API hooks
    const { data: enrollment, isLoading, error } = useGetEnrollmentByIdQuery(enrollmentId);

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case "active": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
            case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
            case "completed": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
            case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        }
    };

    // Get payment status color
    const getPaymentStatusColor = (paymentStatus) => {
        switch (paymentStatus) {
            case "success": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
            case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
            case "failed": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
        }
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Format currency
    const formatCurrency = (amount) => {
        if (!amount) return "$0.00";
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Handle navigation to student details
    const handleViewStudent = () => {
        if (enrollment?.student?.id) {
            navigate(`/users/${enrollment.student.id}`);
        } else {
            toast.error("Student information not available");
        }
    };

    // Handle navigation to course details
    const handleViewCourse = () => {
        if (enrollment?.course?.id) {
            navigate(`/courses/${enrollment.course.id}`);
        } else {
            toast.error("Course information not available");
        }
    };

    // Handle navigation to course enrollments
    const handleViewCourseEnrollments = () => {
        if (enrollment?.course?.id) {
            navigate(`/course/${enrollment.course.id}/enrollments`);
        } else {
            toast.error("Course information not available");
        }
    };

    // Handle edit enrollment
    const handleEditEnrollment = () => {
        if (enrollment?.id) {
            navigate(`/enrollments/edit/${enrollment.id}`);
        } else {
            toast.error("Enrollment information not available");
        }
    };

    // Handle delete enrollment
    const handleDeleteEnrollment = () => {
        if (enrollment?.id) {
            if (window.confirm("Are you sure you want to delete this enrollment? This action cannot be undone.")) {
                // TODO: Implement delete functionality
                toast.success("Delete functionality will be implemented");
            }
        } else {
            toast.error("Enrollment information not available");
        }
    };

    // Generate PDF for enrollment details
    const generateEnrollmentPDF = async () => {
        try {
            setIsGeneratingPDF(true);

            const doc = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            // Colors
            const primaryColor = "#bd0000";
            const secondaryColor = "#3498db";
            const textColor = "#333333";

            // Header Section
            doc.setFillColor(primaryColor);
            doc.rect(0, 0, 210, 40, "F");

            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            doc.setTextColor("#ffffff");
            doc.text("ENROLLMENT DETAILS", 105, 25, { align: "center" });

            // Transaction ID
            doc.setFontSize(12);
            doc.text(`Transaction ID: ${enrollment.transactionId}`, 105, 35, { align: "center" });

            // Content starts at y=50
            let yPosition = 50;

            // Student Information Section
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(textColor);
            doc.text("Student Information", 14, yPosition);
            yPosition += 8;

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");

            const studentInfo = [
                ["Name", enrollment.student?.name || "N/A"],
                ["Email", enrollment.student?.email || "N/A"],
                ["Phone", enrollment.student?.phone || "N/A"],
                ["Age", enrollment.student?.age || "N/A"],
                ["Institute", enrollment.student?.instituteName || "N/A"],
                ["Semester", enrollment.student?.semester || "N/A"],
                ["Subject", enrollment.student?.subject || "N/A"],
                ["Address", enrollment.student?.address || "N/A"],
                ["Status", enrollment.student?.isActive ? "Active" : "Inactive"]
            ];

            doc.autoTable({
                startY: yPosition,
                head: [["Field", "Value"]],
                body: studentInfo,
                theme: "grid",
                styles: {
                    font: "helvetica",
                    fontSize: 9,
                    textColor: textColor,
                    lineColor: "#e0e0e0",
                    lineWidth: 0.1,
                },
                headStyles: {
                    fillColor: secondaryColor,
                    textColor: "#ffffff",
                    fontSize: 10,
                    fontStyle: "bold",
                },
                columnStyles: {
                    0: { cellWidth: 40, cellPadding: 2 },
                    1: { cellWidth: 120, cellPadding: 2 },
                },
                margin: { left: 14, right: 14 },
            });

            yPosition = doc.lastAutoTable.finalY + 10;

            // Course Information Section
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Course Information", 14, yPosition);
            yPosition += 8;

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");

            const courseInfo = [
                ["Course Name", enrollment.course?.name || "N/A"],
                ["Duration", enrollment.course?.duration || "N/A"],
                ["Original Price", formatCurrency(enrollment.course?.price)],
                ["Discounted Price", formatCurrency(enrollment.course?.discountPrice)],
                ["Total Seats", enrollment.course?.totalSeat || "N/A"],
                ["Enrolled", enrollment.course?.totalJoin || "N/A"],
                ["Modules", enrollment.course?.totalModules || "N/A"],
                ["Status", enrollment.course?.isActive ? "Active" : "Inactive"]
            ];

            doc.autoTable({
                startY: yPosition,
                head: [["Field", "Value"]],
                body: courseInfo,
                theme: "grid",
                styles: {
                    font: "helvetica",
                    fontSize: 9,
                    textColor: textColor,
                    lineColor: "#e0e0e0",
                    lineWidth: 0.1,
                },
                headStyles: {
                    fillColor: secondaryColor,
                    textColor: "#ffffff",
                    fontSize: 10,
                    fontStyle: "bold",
                },
                columnStyles: {
                    0: { cellWidth: 40, cellPadding: 2 },
                    1: { cellWidth: 120, cellPadding: 2 },
                },
                margin: { left: 14, right: 14 },
            });

            yPosition = doc.lastAutoTable.finalY + 10;

            // Payment Information Section
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Payment Information", 14, yPosition);
            yPosition += 8;

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");

            const paymentInfo = [
                ["Amount Paid", formatCurrency(enrollment.amountPaid)],
                ["Payment Method", enrollment.paymentMethod || "N/A"],
                ["Payment Status", enrollment.paymentStatus || "N/A"],
                ["Enrollment Status", enrollment.status || "N/A"],
                ["Progress", `${enrollment.progress || 0}%`],
                ["Created At", formatDate(enrollment.createdAt)],
                ["Enrolled At", formatDate(enrollment.enrolledAt)],
                ["Paid At", formatDate(enrollment.paidAt)],
                ["Completed At", formatDate(enrollment.completedAt)]
            ];

            doc.autoTable({
                startY: yPosition,
                head: [["Field", "Value"]],
                body: paymentInfo,
                theme: "grid",
                styles: {
                    font: "helvetica",
                    fontSize: 9,
                    textColor: textColor,
                    lineColor: "#e0e0e0",
                    lineWidth: 0.1,
                },
                headStyles: {
                    fillColor: secondaryColor,
                    textColor: "#ffffff",
                    fontSize: 10,
                    fontStyle: "bold",
                },
                columnStyles: {
                    0: { cellWidth: 40, cellPadding: 2 },
                    1: { cellWidth: 120, cellPadding: 2 },
                },
                margin: { left: 14, right: 14 },
            });

            // Footer
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor("#666666");
                doc.text("NEXTBYTE EDUCATION", 14, 287);
                doc.text(`Page ${i} of ${pageCount}`, 190, 287, { align: "right" });
            }

            // Save the PDF
            const fileName = `enrollment_${enrollment.transactionId}_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);

            toast.success("Enrollment details PDF generated successfully!");
        } catch (error) {
            console.error("Error generating PDF:", error);
            toast.error("Failed to generate PDF. Please try again.");
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader variant="ring" size="lg" text="Loading enrollment details..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Card className="w-full max-w-md">
                        <CardContent className="p-6 text-center">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Error Loading Enrollment</h3>
                            <p className="text-slate-600 mb-4">
                                Failed to load enrollment details. Please try again.
                            </p>
                            <Button onClick={() => navigate(-1)}>
                                Go Back
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (!enrollment) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Card className="w-full max-w-md">
                        <CardContent className="p-6 text-center">
                            <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Enrollment Not Found</h3>
                            <p className="text-slate-600 mb-4">
                                The enrollment you're looking for doesn't exist.
                            </p>
                            <Button onClick={() => navigate(-1)}>
                                Go Back
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Enrollment Details
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Transaction ID: {enrollment.transactionId}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(enrollment.status)}>
                        {enrollment.status}
                    </Badge>
                    <Badge className={getPaymentStatusColor(enrollment.paymentStatus)}>
                        {enrollment.paymentStatus}
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Student Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <User className="h-5 w-5" />
                                <span>Student Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                                    {enrollment.student?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{enrollment.student?.name}</h3>
                                    <p className="text-slate-600">{enrollment.student?.email}</p>
                                    <p className="text-sm text-slate-500">{enrollment.student?.phone}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Age:</span> {enrollment.student?.age || 'N/A'}
                                </div>
                                <div>
                                    <span className="font-medium">Institute:</span> {enrollment.student?.instituteName || 'N/A'}
                                </div>
                                <div>
                                    <span className="font-medium">Semester:</span> {enrollment.student?.semester || 'N/A'}
                                </div>
                                <div>
                                    <span className="font-medium">Subject:</span> {enrollment.student?.subject || 'N/A'}
                                </div>
                                <div>
                                    <span className="font-medium">Address:</span> {enrollment.student?.address || 'N/A'}
                                </div>
                                <div>
                                    <span className="font-medium">Status:</span>
                                    <Badge
                                        variant={enrollment.student?.isActive ? "default" : "secondary"}
                                        className="ml-2"
                                    >
                                        {enrollment.student?.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Course Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <BookOpen className="h-5 w-5" />
                                <span>Course Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold">{enrollment.course?.name}</h3>
                                <p className="text-slate-600">{enrollment.course?.duration}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Original Price:</span> {formatCurrency(enrollment.course?.price)}
                                </div>
                                <div>
                                    <span className="font-medium">Discounted Price:</span> {formatCurrency(enrollment.course?.discountPrice)}
                                </div>
                                <div>
                                    <span className="font-medium">Total Seats:</span> {enrollment.course?.totalSeat}
                                </div>
                                <div>
                                    <span className="font-medium">Enrolled:</span> {enrollment.course?.totalJoin}
                                </div>
                                <div>
                                    <span className="font-medium">Modules:</span> {enrollment.course?.totalModules}
                                </div>
                                <div>
                                    <span className="font-medium">Status:</span>
                                    <Badge
                                        variant={enrollment.course?.isActive ? "default" : "secondary"}
                                        className="ml-2"
                                    >
                                        {enrollment.course?.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <CreditCard className="h-5 w-5" />
                                <span>Payment Details</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-medium">Amount Paid:</span>
                                    <p className="text-lg font-semibold text-green-600">{formatCurrency(enrollment.amountPaid)}</p>
                                </div>
                                <div>
                                    <span className="font-medium">Payment Method:</span>
                                    <p className="text-lg">{enrollment.paymentMethod}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="font-medium">Transaction ID:</span> {enrollment.transactionId}
                                </div>
                                {enrollment.sslcommerzSessionKey && (
                                    <div>
                                        <span className="font-medium">SSL Session Key:</span> {enrollment.sslcommerzSessionKey}
                                    </div>
                                )}
                                {enrollment.sslcommerzTranId && (
                                    <div>
                                        <span className="font-medium">SSL Transaction ID:</span> {enrollment.sslcommerzTranId}
                                    </div>
                                )}
                                {enrollment.sslcommerzValId && (
                                    <div>
                                        <span className="font-medium">SSL Validation ID:</span> {enrollment.sslcommerzValId}
                                    </div>
                                )}
                                {enrollment.sslcommerzBankTranId && (
                                    <div>
                                        <span className="font-medium">SSL Bank Transaction ID:</span> {enrollment.sslcommerzBankTranId}
                                    </div>
                                )}
                                {enrollment.sslcommerzCardType && (
                                    <div>
                                        <span className="font-medium">Card Type:</span> {enrollment.sslcommerzCardType}
                                    </div>
                                )}
                                {enrollment.sslcommerzCardIssuer && (
                                    <div>
                                        <span className="font-medium">Card Issuer:</span> {enrollment.sslcommerzCardIssuer}
                                    </div>
                                )}
                                {enrollment.sslcommerzCardBrand && (
                                    <div>
                                        <span className="font-medium">Card Brand:</span> {enrollment.sslcommerzCardBrand}
                                    </div>
                                )}
                                {enrollment.sslcommerzError && (
                                    <div>
                                        <span className="font-medium text-red-600">SSL Error:</span> {enrollment.sslcommerzError}
                                    </div>
                                )}
                                {enrollment.failureReason && (
                                    <div>
                                        <span className="font-medium text-red-600">Failure Reason:</span> {enrollment.failureReason}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Enrollment Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Enrollment Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Status:</span>
                                <Badge className={getStatusColor(enrollment.status)}>
                                    {enrollment.status}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Payment Status:</span>
                                <Badge className={getPaymentStatusColor(enrollment.paymentStatus)}>
                                    {enrollment.paymentStatus}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Progress:</span>
                                <span className="text-sm font-medium">{enrollment.progress}%</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Important Dates */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Important Dates</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <span className="text-sm font-medium">Created:</span>
                                <p className="text-sm text-slate-600">{formatDate(enrollment.createdAt)}</p>
                            </div>
                            {enrollment.paidAt && (
                                <div>
                                    <span className="text-sm font-medium">Paid At:</span>
                                    <p className="text-sm text-slate-600">{formatDate(enrollment.paidAt)}</p>
                                </div>
                            )}
                            {enrollment.enrolledAt && (
                                <div>
                                    <span className="text-sm font-medium">Enrolled At:</span>
                                    <p className="text-sm text-slate-600">{formatDate(enrollment.enrolledAt)}</p>
                                </div>
                            )}
                            {enrollment.completedAt && (
                                <div>
                                    <span className="text-sm font-medium">Completed At:</span>
                                    <p className="text-sm text-slate-600">{formatDate(enrollment.completedAt)}</p>
                                </div>
                            )}
                            {enrollment.failedAt && (
                                <div>
                                    <span className="text-sm font-medium text-red-600">Failed At:</span>
                                    <p className="text-sm text-red-600">{formatDate(enrollment.failedAt)}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">




                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={generateEnrollmentPDF}
                                disabled={isGeneratingPDF}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                {isGeneratingPDF ? "Generating..." : "Download PDF"}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={handleDeleteEnrollment}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Enrollment
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentDetailsPage;
