import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Upload, BookOpen, Video, FileText, Eye } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useGetModulesQuery } from "@/features/modules-apis/moduleApis";

const LessonForm = ({ lesson, onSubmit, onClose, isLoading = false }) => {
    const fileInputRef = useRef(null);
    const { uploadFile, isUploading: isFileUploading } = useFileUpload({
        folder: 'lesson-files',
        allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
        maxSize: 10 * 1024 * 1024 // 10MB for lesson files
    });

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        order: 1,
        duration: "",
        text: "",
        fileUrl: "",
        videoUrl: "",
        isPreview: false,
        moduleId: "",
    });

    const { data: modulesData, isLoading: modulesLoading } = useGetModulesQuery();
    const modules = modulesData || [];

    useEffect(() => {
        if (lesson) {
            setFormData({
                title: lesson.title || "",
                description: lesson.description || "",
                order: lesson.order || 1,
                duration: lesson.duration || "",
                text: lesson.text || "",
                fileUrl: lesson.fileUrl || "",
                videoUrl: lesson.videoUrl || "",
                isPreview: lesson.isPreview || false,
                moduleId: lesson.moduleId || lesson.module?.id || "",
            });
        }
    }, [lesson]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const cdnUrl = await uploadFile(file);
            handleInputChange("fileUrl", cdnUrl);
        } catch (error) {
            // Error already handled in uploadFile
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const clearFileUrl = () => {
        handleInputChange("fileUrl", "");
    };

    const clearVideoUrl = () => {
        handleInputChange("videoUrl", "");
    };

    const clearText = () => {
        handleInputChange("text", "");
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl font-semibold">
                        {lesson ? "Edit Lesson" : "Create New Lesson"}
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Lesson Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                placeholder="Enter lesson title"
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
                                placeholder="Enter lesson description"
                                rows={3}
                                required
                            />
                        </div>

                        {/* Order and Duration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="order">Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => handleInputChange("order", parseInt(e.target.value) || 1)}
                                    placeholder="1"
                                    min="1"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    value={formData.duration}
                                    onChange={(e) => handleInputChange("duration", e.target.value)}
                                    placeholder="e.g., 30 minutes"
                                />
                            </div>
                        </div>

                        {/* Module Selection */}
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
                        </div>

                        {/* Content Type Selection */}
                        <div className="space-y-4">
                            <Label className="text-sm font-medium">Content Type</Label>

                            {/* Text Content */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <Label htmlFor="text" className="text-sm">Text Content</Label>
                                </div>
                                <Textarea
                                    id="text"
                                    value={formData.text}
                                    onChange={(e) => handleInputChange("text", e.target.value)}
                                    placeholder="Enter lesson text content"
                                    rows={4}
                                />
                                {formData.text && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearText}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Clear Text
                                    </Button>
                                )}
                            </div>

                            {/* Video URL */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Video className="h-4 w-4" />
                                    <Label htmlFor="videoUrl" className="text-sm">Video URL</Label>
                                </div>
                                <Input
                                    id="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                                    placeholder="Enter video URL (YouTube embed URL)"
                                />
                                {formData.videoUrl && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearVideoUrl}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Clear Video URL
                                    </Button>
                                )}
                            </div>

                            {/* File Upload */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Upload className="h-4 w-4" />
                                    <Label htmlFor="fileUrl" className="text-sm">File Upload</Label>
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        id="fileUrl"
                                        value={formData.fileUrl}
                                        onChange={(e) => handleInputChange("fileUrl", e.target.value)}
                                        placeholder="CDN URL or upload file"
                                        disabled={isFileUploading}
                                    />
                                    <div className="flex items-center gap-2">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf,.doc,.docx,.txt"
                                            onChange={handleFileUpload}
                                            className="hidden"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isFileUploading}
                                            className="flex items-center gap-2"
                                        >
                                            <Upload className="h-4 w-4" />
                                            {isFileUploading ? "Uploading..." : "Upload File"}
                                        </Button>
                                        {formData.fileUrl && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={clearFileUrl}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Clear File
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Preview Toggle */}
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="isPreview"
                                checked={formData.isPreview}
                                onCheckedChange={(checked) => handleInputChange("isPreview", checked)}
                            />
                            <Label htmlFor="isPreview" className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                Enable Preview
                            </Label>
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
                                disabled={isLoading || !formData.title || !formData.description || !formData.moduleId}
                            >
                                {isLoading ? "Saving..." : lesson ? "Update Lesson" : "Create Lesson"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LessonForm;
