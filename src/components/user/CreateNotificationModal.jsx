import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSendNotificationToAllUsersMutation } from "@/features/notification/notificationApis";
import { toast } from "react-hot-toast";
import { Loader2, X, Mail, AlertCircle, Bell, Info } from "lucide-react";

const CreateNotificationModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        metadata: {
            priority: "medium",
            category: "general"
        }
    });

    const [sendNotification, { isLoading }] = useSendNotificationToAllUsersMutation();

    const handleInputChange = (field, value) => {
        if (field === "priority" || field === "category") {
            setFormData(prev => ({
                ...prev,
                metadata: {
                    ...prev.metadata,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.title.trim() || !formData.message.trim()) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (formData.title.length > 100) {
            toast.error("Title must be less than 100 characters");
            return;
        }

        if (formData.message.length > 1000) {
            toast.error("Message must be less than 1000 characters");
            return;
        }

        try {
            const response = await sendNotification(formData).unwrap();
            toast.success("Notification sent successfully to all users!");
            onSuccess?.(response);
            onClose?.();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to send notification");
        }
    };

    const priorities = [
        { value: "low", label: "Low", color: "text-green-600" },
        { value: "medium", label: "Medium", color: "text-yellow-600" },
        { value: "high", label: "High", color: "text-red-600" },
        { value: "urgent", label: "Urgent", color: "text-red-800" }
    ];

    const categories = [
        { value: "general", label: "General" },
        { value: "announcement", label: "Announcement" },
        { value: "update", label: "Update" },
        { value: "maintenance", label: "Maintenance" },
        { value: "promotion", label: "Promotion" },
        { value: "security", label: "Security" }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="flex items-center space-x-2">
                        <Mail className="h-5 w-5" />
                        <span>Send Notification to All Users</span>
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Notification Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="flex items-center space-x-2">
                                <Bell className="h-4 w-4" />
                                <span>Notification Title *</span>
                            </Label>
                            <Input
                                id="title"
                                placeholder="Enter notification title..."
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                maxLength={100}
                                required
                            />
                            <p className="text-xs text-slate-500">
                                {formData.title.length}/100 characters
                            </p>
                        </div>

                        {/* Notification Message */}
                        <div className="space-y-2">
                            <Label htmlFor="message" className="flex items-center space-x-2">
                                <Info className="h-4 w-4" />
                                <span>Notification Message *</span>
                            </Label>
                            <Textarea
                                id="message"
                                placeholder="Enter notification message..."
                                value={formData.message}
                                onChange={(e) => handleInputChange("message", e.target.value)}
                                maxLength={1000}
                                rows={4}
                                required
                            />
                            <p className="text-xs text-slate-500">
                                {formData.message.length}/1000 characters
                            </p>
                        </div>

                        {/* Priority and Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select
                                    value={formData.metadata.priority}
                                    onValueChange={(value) => handleInputChange("priority", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {priorities.map((priority) => (
                                            <SelectItem key={priority.value} value={priority.value}>
                                                <span className={priority.color}>{priority.label}</span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={formData.metadata.category}
                                    onValueChange={(value) => handleInputChange("category", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.value} value={category.value}>
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Warning Message */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                                    <p className="font-medium">Important Notice</p>
                                    <p className="mt-1">
                                        This notification will be sent to <strong>all registered users</strong>.
                                        Please ensure the content is appropriate and necessary.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading || !formData.title.trim() || !formData.message.trim()}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Send Notification
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateNotificationModal;
