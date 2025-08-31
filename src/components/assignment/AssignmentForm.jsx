import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Calendar, Link, Github, ExternalLink } from "lucide-react";
import { useGetModulesQuery } from "@/features/modules-apis/moduleApis";

const AssignmentForm = ({ assignment, onSubmit, onClose, isLoading = false }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        githubLink: "",
        liveLink: "",
        totalMarks: 100,
        dueDate: "",
        moduleId: "",
    });

    const { data: modulesData, isLoading: modulesLoading } = useGetModulesQuery();
    const modules = modulesData || [];

    useEffect(() => {
        if (assignment) {
            setFormData({
                title: assignment.title || "",
                description: assignment.description || "",
                githubLink: assignment.githubLink || "",
                liveLink: assignment.liveLink || "",
                totalMarks: assignment.totalMarks || 100,
                dueDate: assignment.dueDate ? new Date(assignment.dueDate).toISOString().slice(0, 16) : "",
                moduleId: assignment.moduleId || assignment.module?.id || "",
            });
        }
    }, [assignment]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert dueDate to ISO string if it exists
        const submitData = {
            ...formData,
            dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        };

        onSubmit(submitData);
    };

    const isFormValid = () => {
        return formData.title && formData.description && formData.moduleId && formData.totalMarks > 0;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl font-semibold">
                        {assignment ? "Edit Assignment" : "Create New Assignment"}
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Assignment Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                placeholder="Enter assignment title"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Enter assignment description"
                                rows={4}
                                required
                            />
                        </div>

                        {/* Module Selector */}
                        <div className="space-y-2">
                            <Label htmlFor="moduleId">Module *</Label>
                            <Select
                                value={formData.moduleId}
                                onValueChange={(value) => handleInputChange("moduleId", value)}
                                disabled={modulesLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a module" />
                                </SelectTrigger>
                                <SelectContent>
                                    {modules.map((module) => (
                                        <SelectItem key={module.id} value={module.id.toString()}>
                                            {module.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {modulesLoading && (
                                <p className="text-sm text-muted-foreground">Loading modules...</p>
                            )}
                        </div>

                        {/* Total Marks */}
                        <div className="space-y-2">
                            <Label htmlFor="totalMarks">Total Marks *</Label>
                            <Input
                                id="totalMarks"
                                type="number"
                                min="1"
                                max="1000"
                                value={formData.totalMarks}
                                onChange={(e) => handleInputChange("totalMarks", parseInt(e.target.value) || 0)}
                                placeholder="Enter total marks"
                                required
                            />
                        </div>

                        {/* Due Date */}
                        <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="dueDate"
                                    type="datetime-local"
                                    value={formData.dueDate}
                                    onChange={(e) => handleInputChange("dueDate", e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* GitHub Link */}
                        <div className="space-y-2">
                            <Label htmlFor="githubLink">GitHub Repository Link</Label>
                            <div className="relative">
                                <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="githubLink"
                                    type="url"
                                    value={formData.githubLink}
                                    onChange={(e) => handleInputChange("githubLink", e.target.value)}
                                    placeholder="https://github.com/username/repository"
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Live Link */}
                        <div className="space-y-2">
                            <Label htmlFor="liveLink">Live Demo Link</Label>
                            <div className="relative">
                                <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="liveLink"
                                    type="url"
                                    value={formData.liveLink}
                                    onChange={(e) => handleInputChange("liveLink", e.target.value)}
                                    placeholder="https://demo-link.com"
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-2 pt-4">
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
                                disabled={!isFormValid() || isLoading}
                            >
                                {isLoading ? "Saving..." : assignment ? "Update Assignment" : "Create Assignment"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AssignmentForm;
