import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X, Loader2 } from "lucide-react";

const ModuleForm = ({ isOpen, onClose, onSubmit, module, courses, loading }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        order: 1,
        duration: "",
        courseId: "",
        isActive: true,
    });
    const [errors, setErrors] = useState({});

    // Reset form when modal opens/closes or module changes
    useEffect(() => {
        if (isOpen) {
            if (module) {
                setFormData({
                    title: module.title || "",
                    description: module.description || "",
                    order: module.order || 1,
                    duration: module.duration || "",
                    courseId: module.courseId || module.course?.id || "",
                    isActive: module.isActive !== undefined ? module.isActive : true,
                });
            } else {
                setFormData({
                    title: "",
                    description: "",
                    order: 1,
                    duration: "",
                    courseId: "",
                    isActive: true,
                });
            }
            setErrors({});
        }
    }, [isOpen, module]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = "Module title is required";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Module description is required";
        }

        if (!formData.courseId) {
            newErrors.courseId = "Please select a course";
        }

        if (!formData.order || formData.order < 1) {
            newErrors.order = "Order must be at least 1";
        }

        if (!formData.duration.trim()) {
            newErrors.duration = "Duration is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const submitData = module ? { id: module.id, ...formData } : formData;
        onSubmit(submitData);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>{module ? "Edit Module" : "Create New Module"}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Course Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="courseId" className="text-sm font-medium">
                            Course *
                        </Label>
                        <Select
                            value={formData.courseId}
                            onValueChange={(value) => handleInputChange("courseId", value)}
                            disabled={loading}
                        >
                            <SelectTrigger className={errors.courseId ? "border-red-500" : ""}>
                                <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                    <SelectItem key={course.id} value={course.id.toString()}>
                                        {course.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.courseId && (
                            <p className="text-sm text-red-500">{errors.courseId}</p>
                        )}
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium">
                            Module Title *
                        </Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                            placeholder="Enter module title"
                            disabled={loading}
                            className={errors.title ? "border-red-500" : ""}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                            Description *
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            placeholder="Enter module description"
                            rows={4}
                            disabled={loading}
                            className={errors.description ? "border-red-500" : ""}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description}</p>
                        )}
                    </div>

                    {/* Order and Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="order" className="text-sm font-medium">
                                Order *
                            </Label>
                            <Input
                                id="order"
                                type="number"
                                min="1"
                                value={formData.order}
                                onChange={(e) => handleInputChange("order", parseInt(e.target.value) || 1)}
                                placeholder="Module order"
                                disabled={loading}
                                className={errors.order ? "border-red-500" : ""}
                            />
                            {errors.order && (
                                <p className="text-sm text-red-500">{errors.order}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration" className="text-sm font-medium">
                                Duration *
                            </Label>
                            <Input
                                id="duration"
                                value={formData.duration}
                                onChange={(e) => handleInputChange("duration", e.target.value)}
                                placeholder="e.g., 4 hours, 2 days"
                                disabled={loading}
                                className={errors.duration ? "border-red-500" : ""}
                            />
                            {errors.duration && (
                                <p className="text-sm text-red-500">{errors.duration}</p>
                            )}
                        </div>
                    </div>

                    {/* Active Status */}
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="isActive"
                            checked={formData.isActive}
                            onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                            disabled={loading}
                        />
                        <Label htmlFor="isActive" className="text-sm font-medium">
                            Active Module
                        </Label>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-2 pt-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {module ? "Updating..." : "Creating..."}
                                </>
                            ) : (
                                module ? "Update Module" : "Create Module"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ModuleForm;
