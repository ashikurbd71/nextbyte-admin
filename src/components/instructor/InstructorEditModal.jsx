import React, { useState, useEffect } from "react";
import { useUpdateInstructorMutation } from "@/features/instractor-apis/instractorApis";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { UserCog, Save, X } from "lucide-react";
import toast from "react-hot-toast";

const InstructorEditModal = ({ instructor, isOpen, onClose, onSuccess }) => {
    const [updateInstructor, { isLoading }] = useUpdateInstructorMutation();
    const [formData, setFormData] = useState({
        role: "instructor"
    });
    const [errors, setErrors] = useState({});

    // Initialize form data when instructor changes
    useEffect(() => {
        if (instructor) {
            setFormData({
                role: instructor.role || "instructor"
            });
            setErrors({});
        }
    }, [instructor]);

    // Handle input changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    // Validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.role) {
            newErrors.role = "Role is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        try {
            const instructorId = instructor.id || instructor._id;
            await updateInstructor({
                id: instructorId,
                data: formData
            }).unwrap();

            toast.success("Instructor updated successfully!");
            onSuccess?.();
            handleClose();
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error?.data?.message || "Failed to update instructor");
        }
    };

    // Handle form close
    const handleClose = () => {
        setFormData({ role: "instructor" });
        setErrors({});
        onClose();
    };

    if (!instructor) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserCog className="h-5 w-5" />
                        Edit Instructor
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Instructor Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Instructor Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={instructor.photoUrl} alt={instructor.name} />
                                    <AvatarFallback className="text-lg">
                                        {instructor.name?.charAt(0)?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-lg font-semibold">{instructor.name}</h3>
                                    <p className="text-sm text-muted-foreground">{instructor.email}</p>
                                    <div className="flex gap-2 mt-2">
                                        <Badge variant="">{instructor.designation}</Badge>
                                        <Badge variant={instructor.isActive ? "default" : "secondary"}>
                                            {instructor.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Role Update */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Update Role</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="role">Role *</Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value) => handleInputChange("role", value)}
                                >
                                    <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="moderator">Moderator</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="super_admin">Super Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    <strong>Current Role:</strong> {instructor.role}
                                </p>
                                {formData.role !== instructor.role && (
                                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                                        <strong>New Role:</strong> {formData.role}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            <Save className="h-4 w-4 mr-2" />
                            {isLoading ? "Updating..." : "Update Instructor"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InstructorEditModal;
