import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
    Edit,
    Save,
    X,
    User,
    BookOpen,
    CreditCard,
    Calendar,
    DollarSign,
    AlertCircle
} from "lucide-react";
import { toast } from "react-hot-toast";
import Loader from "@/components/loader/Loader";

// API hooks
import {
    useUpdateEnrollmentMutation,
    useUpdateEnrollmentStatusMutation,
    useUpdatePaymentStatusMutation
} from "@/features/enrollment-apis/enrollmentApis";

// Enums and helpers
import {
    EnrollmentStatus,
    PaymentStatus,
    PaymentMethod,
    getEnrollmentStatusDisplay,
    getPaymentStatusDisplay,
    getPaymentMethodDisplay,
    getEnrollmentStatusOptions,
    getPaymentStatusOptions,
    getPaymentMethodOptions,
    getEnrollmentStatusColor,
    getPaymentStatusColor
} from "@/lib/enums";

const EnrollmentUpdater = ({ enrollment, onClose, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        status: enrollment?.status || EnrollmentStatus.PENDING,
        paymentStatus: enrollment?.paymentStatus || PaymentStatus.PENDING,
        paymentMethod: enrollment?.paymentMethod || PaymentMethod.MANUAL,
        amountPaid: enrollment?.amountPaid || "",
        transactionId: enrollment?.transactionId || "",
        progress: enrollment?.progress || 0,
        notes: ""
    });

    // API hooks
    const [updateEnrollment, { isLoading: isUpdating }] = useUpdateEnrollmentMutation();
    const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateEnrollmentStatusMutation();
    const [updatePayment, { isLoading: isUpdatingPayment }] = useUpdatePaymentStatusMutation();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        try {
            const updateData = {
                id: enrollment.id,
                ...formData
            };

            await updateEnrollment(updateData).unwrap();
            toast.success("Enrollment updated successfully!");
            setIsEditing(false);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Error updating enrollment:", error);
            toast.error("Failed to update enrollment");
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        try {
            await updateStatus({ id: enrollment.id, status: newStatus }).unwrap();
            setFormData(prev => ({ ...prev, status: newStatus }));
            toast.success(`Enrollment status updated to ${getEnrollmentStatusDisplay(newStatus)}`);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update enrollment status");
        }
    };

    const handlePaymentStatusUpdate = async (newPaymentStatus) => {
        try {
            const paymentData = {
                paymentStatus: newPaymentStatus,
                paidAt: newPaymentStatus === PaymentStatus.SUCCESS ? new Date().toISOString() : null
            };

            await updatePayment({ id: enrollment.id, ...paymentData }).unwrap();
            setFormData(prev => ({ ...prev, paymentStatus: newPaymentStatus }));
            toast.success(`Payment status updated to ${getPaymentStatusDisplay(newPaymentStatus)}`);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Error updating payment status:", error);
            toast.error("Failed to update payment status");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            status: enrollment?.status || EnrollmentStatus.PENDING,
            paymentStatus: enrollment?.paymentStatus || PaymentStatus.PENDING,
            paymentMethod: enrollment?.paymentMethod || PaymentMethod.MANUAL,
            amountPaid: enrollment?.amountPaid || "",
            transactionId: enrollment?.transactionId || "",
            progress: enrollment?.progress || 0,
            notes: ""
        });
    };

    if (!enrollment) {
        return (
            <Card className="w-full max-w-2xl">
                <CardContent className="p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Enrollment Selected</h3>
                    <p className="text-slate-600">Please select an enrollment to update</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Edit className="h-5 w-5" />
                        <span>Update Enrollment</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {isEditing ? (
                            <>
                                <Button
                                    size="sm"
                                    onClick={handleSave}
                                    disabled={isUpdating}
                                    className="flex items-center space-x-2"
                                >
                                    {isUpdating ? (
                                        <Loader variant="ring" size="sm" />
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    <span>Save</span>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleCancel}
                                    disabled={isUpdating}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </>
                        ) : (
                            <Button
                                size="sm"
                                onClick={() => setIsEditing(true)}
                                className="flex items-center space-x-2"
                            >
                                <Edit className="h-4 w-4" />
                                <span>Edit</span>
                            </Button>
                        )}
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={onClose}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Student and Course Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <User className="h-5 w-5 text-slate-600" />
                        <div>
                            <p className="font-medium">{enrollment.student?.name}</p>
                            <p className="text-sm text-slate-600">{enrollment.student?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <BookOpen className="h-5 w-5 text-slate-600" />
                        <div>
                            <p className="font-medium">{enrollment.course?.name}</p>
                            <p className="text-sm text-slate-600">{enrollment.course?.duration}</p>
                        </div>
                    </div>
                </div>

                {/* Current Status Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="text-sm font-medium">Current Status</Label>
                        <div className="mt-1">
                            <Badge className={getEnrollmentStatusColor(enrollment.status)}>
                                {getEnrollmentStatusDisplay(enrollment.status)}
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <Label className="text-sm font-medium">Payment Status</Label>
                        <div className="mt-1">
                            <Badge className={getPaymentStatusColor(enrollment.paymentStatus)}>
                                {getPaymentStatusDisplay(enrollment.paymentStatus)}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Quick Status Updates */}
                {!isEditing && (
                    <div className="space-y-4">
                        <div>
                            <Label className="text-sm font-medium">Quick Status Update</Label>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {getEnrollmentStatusOptions().map((option) => (
                                    <Button
                                        key={option.value}
                                        size="sm"
                                        variant={enrollment.status === option.value ? "default" : "outline"}
                                        onClick={() => handleStatusUpdate(option.value)}
                                        disabled={isUpdatingStatus}
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Label className="text-sm font-medium">Quick Payment Status Update</Label>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {getPaymentStatusOptions().map((option) => (
                                    <Button
                                        key={option.value}
                                        size="sm"
                                        variant={enrollment.paymentStatus === option.value ? "default" : "outline"}
                                        onClick={() => handlePaymentStatusUpdate(option.value)}
                                        disabled={isUpdatingPayment}
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Form */}
                {isEditing && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="status">Enrollment Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => handleInputChange("status", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getEnrollmentStatusOptions().map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="paymentStatus">Payment Status</Label>
                                <Select
                                    value={formData.paymentStatus}
                                    onValueChange={(value) => handleInputChange("paymentStatus", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getPaymentStatusOptions().map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="paymentMethod">Payment Method</Label>
                                <Select
                                    value={formData.paymentMethod}
                                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getPaymentMethodOptions().map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="amountPaid">Amount Paid</Label>
                                <Input
                                    id="amountPaid"
                                    type="number"
                                    step="0.01"
                                    value={formData.amountPaid}
                                    onChange={(e) => handleInputChange("amountPaid", e.target.value)}
                                    placeholder="Enter amount"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="transactionId">Transaction ID</Label>
                                <Input
                                    id="transactionId"
                                    value={formData.transactionId}
                                    onChange={(e) => handleInputChange("transactionId", e.target.value)}
                                    placeholder="Transaction ID"
                                />
                            </div>
                            <div>
                                <Label htmlFor="progress">Progress (%)</Label>
                                <Input
                                    id="progress"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={formData.progress}
                                    onChange={(e) => handleInputChange("progress", e.target.value)}
                                    placeholder="0-100"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => handleInputChange("notes", e.target.value)}
                                placeholder="Add any additional notes..."
                                rows={3}
                            />
                        </div>
                    </div>
                )}

                {/* Enrollment Details */}
                <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Enrollment Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium">Created:</span>
                            <p className="text-slate-600">
                                {new Date(enrollment.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <span className="font-medium">Progress:</span>
                            <p className="text-slate-600">{enrollment.progress}%</p>
                        </div>
                        {enrollment.paidAt && (
                            <div>
                                <span className="font-medium">Paid At:</span>
                                <p className="text-slate-600">
                                    {new Date(enrollment.paidAt).toLocaleDateString()}
                                </p>
                            </div>
                        )}
                        {enrollment.enrolledAt && (
                            <div>
                                <span className="font-medium">Enrolled At:</span>
                                <p className="text-slate-600">
                                    {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EnrollmentUpdater;
