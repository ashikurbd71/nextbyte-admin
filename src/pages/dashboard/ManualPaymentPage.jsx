import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, BookOpen, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import Loader from "@/components/loader/Loader";

// API hooks
import { useCreateManualPaymentMutation } from "@/features/enrollment-apis/enrollmentApis";
import { useGetAllUsersQuery } from "@/features/user/userApis";
import { useGetCoursesQuery } from "@/features/course-apis/coursesApis";

const ManualPaymentPage = () => {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        studentId: "",
        courseId: "",
        amountPaid: "",
        transactionId: "",
        paymentMethod: "manual"
    });

    // API hooks
    const [createManualPayment, { isLoading: isCreating }] = useCreateManualPaymentMutation();
    const { data: users = [], isLoading: usersLoading, error: usersError } = useGetAllUsersQuery();
    const { data: coursesData, isLoading: coursesLoading, error: coursesError } = useGetCoursesQuery();

    // Derived state
    const courses = coursesData?.data || [];
    const selectedStudent = users.find(user => user.id === parseInt(formData.studentId));
    const selectedCourse = courses.find(course => course.id === parseInt(formData.courseId));

    // Generate transaction ID
    useEffect(() => {
        if (!formData.transactionId) {
            const timestamp = Date.now();
            const random = Math.floor(Math.random() * 10000);
            setFormData(prev => ({
                ...prev,
                transactionId: `TXN_${timestamp}_${random}`
            }));
        }
    }, [formData.transactionId]);

    // Update amount when course is selected
    useEffect(() => {
        if (selectedCourse && !formData.amountPaid) {
            setFormData(prev => ({
                ...prev,
                amountPaid: selectedCourse.discountPrice || selectedCourse.price
            }));
        }
    }, [selectedCourse, formData.amountPaid]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.studentId || !formData.courseId || !formData.amountPaid) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            const enrollmentData = {
                studentId: parseInt(formData.studentId),
                courseId: parseInt(formData.courseId),
                amountPaid: parseFloat(formData.amountPaid),
                transactionId: formData.transactionId,
                paymentMethod: formData.paymentMethod
            };

            await createManualPayment(enrollmentData).unwrap();
            toast.success("Manual payment enrollment created successfully!");

            // Reset form
            setFormData({
                studentId: "",
                courseId: "",
                amountPaid: "",
                transactionId: "",
                paymentMethod: "manual"
            });

        } catch (error) {
            console.error("Error creating manual payment:", error);
            if (error?.data?.message) {
                toast.error(error.data.message);
            } else {
                toast.error("Failed to create manual payment enrollment");
            }
        }
    };

    const handleReset = () => {
        setFormData({
            studentId: "",
            courseId: "",
            amountPaid: "",
            transactionId: "",
            paymentMethod: "manual"
        });
    };

    if (usersLoading || coursesLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader variant="ring" size="lg" text="Loading data..." />
            </div>
        );
    }

    if (usersError || coursesError) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Card className="w-full max-w-md">
                        <CardContent className="p-6 text-center">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
                            <p className="text-slate-600 mb-4">
                                Failed to load students or courses. Please try again.
                            </p>
                            <Button onClick={() => window.location.reload()}>
                                Retry
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
                            Manual Payment Enrollment
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Create enrollment with manual payment
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <CreditCard className="h-5 w-5" />
                                <span>Payment Details</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Student Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="studentId" className="flex items-center space-x-2">
                                        <User className="h-4 w-4" />
                                        <span>Student *</span>
                                    </Label>
                                    <Select
                                        value={formData.studentId}
                                        onValueChange={(value) => handleInputChange("studentId", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a student" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem key={user.id} value={user.id.toString()}>
                                                    <div className="flex items-center space-x-2">
                                                        <span>{user.name}</span>
                                                        <Badge variant="outline" className="text-xs">
                                                            {user.email}
                                                        </Badge>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Course Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="courseId" className="flex items-center space-x-2">
                                        <BookOpen className="h-4 w-4" />
                                        <span>Course *</span>
                                    </Label>
                                    <Select
                                        value={formData.courseId}
                                        onValueChange={(value) => handleInputChange("courseId", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a course" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {courses.map((course) => (
                                                <SelectItem key={course.id} value={course.id.toString()}>
                                                    <div className="flex items-center space-x-2">
                                                        <span>{course.name}</span>
                                                        <Badge variant="outline" className="text-xs">
                                                            ${course.discountPrice || course.price}
                                                        </Badge>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Amount Paid */}
                                <div className="space-y-2">
                                    <Label htmlFor="amountPaid">Amount Paid *</Label>
                                    <Input
                                        id="amountPaid"
                                        type="number"
                                        step="0.01"
                                        value={formData.amountPaid}
                                        onChange={(e) => handleInputChange("amountPaid", e.target.value)}
                                        placeholder="Enter amount paid"
                                    />
                                </div>

                                {/* Transaction ID */}
                                <div className="space-y-2">
                                    <Label htmlFor="transactionId">Transaction ID</Label>
                                    <Input
                                        id="transactionId"
                                        value={formData.transactionId}
                                        onChange={(e) => handleInputChange("transactionId", e.target.value)}
                                        placeholder="Transaction ID"
                                    />
                                </div>

                                {/* Payment Method */}
                                <div className="space-y-2">
                                    <Label htmlFor="paymentMethod">Payment Method</Label>
                                    <Select
                                        value={formData.paymentMethod}
                                        onValueChange={(value) => handleInputChange("paymentMethod", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="manual">Manual Payment</SelectItem>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                            <SelectItem value="check">Check</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4 pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isCreating || !formData.studentId || !formData.courseId || !formData.amountPaid}
                                        className="flex-1"
                                    >
                                        {isCreating ? (
                                            <>
                                                <Loader variant="ring" size="sm" className="mr-2" />
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Create Enrollment
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleReset}
                                        disabled={isCreating}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    {/* Selected Student Info */}
                    {selectedStudent && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Selected Student</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                        {selectedStudent.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium">{selectedStudent.name}</p>
                                        <p className="text-sm text-slate-600">{selectedStudent.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Phone:</span> {selectedStudent.phone || 'N/A'}</p>
                                    <p><span className="font-medium">Status:</span>
                                        <Badge
                                            variant={selectedStudent.isActive ? "default" : "secondary"}
                                            className="ml-2"
                                        >
                                            {selectedStudent.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Selected Course Info */}
                    {selectedCourse && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Selected Course</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <h4 className="font-medium">{selectedCourse.name}</h4>
                                    <p className="text-sm text-slate-600">{selectedCourse.duration}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Original Price:</span>
                                        <span className="text-sm line-through">${selectedCourse.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium">Discounted Price:</span>
                                        <span className="text-sm font-medium text-green-600">${selectedCourse.discountPrice || selectedCourse.price}</span>
                                    </div>
                                </div>
                                <div className="pt-2 border-t">
                                    <p className="text-sm">
                                        <span className="font-medium">Seats:</span> {selectedCourse.totalJoin}/{selectedCourse.totalSeat}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Payment Summary */}
                    {(selectedStudent && selectedCourse) && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">Payment Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm">Course Price:</span>
                                        <span className="text-sm">${selectedCourse.discountPrice || selectedCourse.price}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm">Amount Paid:</span>
                                        <span className="text-sm font-medium">${formData.amountPaid || '0.00'}</span>
                                    </div>
                                    <div className="pt-2 border-t">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium">Transaction ID:</span>
                                            <span className="text-xs text-slate-600 font-mono">{formData.transactionId}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManualPaymentPage;
