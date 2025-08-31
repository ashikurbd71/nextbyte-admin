import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Play, FileText, Download, Eye, Clock, BookOpen, ExternalLink } from "lucide-react";

const LessonDetailsModal = ({ lesson, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("overview");

    if (!isOpen || !lesson) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getContentType = () => {
        if (lesson.videoUrl) return "video";
        if (lesson.fileUrl) return "file";
        if (lesson.text) return "text";
        return "none";
    };

    const contentType = getContentType();

    const handleFileDownload = () => {
        if (lesson.fileUrl) {
            window.open(lesson.fileUrl, '_blank');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-semibold">{lesson.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Module: {lesson.module?.title || "N/A"}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Lesson Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Duration</p>
                                <p className="text-sm text-muted-foreground">{lesson.duration || "Not specified"}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Order</p>
                                <p className="text-sm text-muted-foreground">{lesson.order}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">Preview</p>
                                <Badge variant={lesson.isPreview ? "default" : "secondary"}>
                                    {lesson.isPreview ? "Enabled" : "Disabled"}
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full bg-green-500" />
                            <div>
                                <p className="text-sm font-medium">Status</p>
                                <Badge variant={lesson.isActive ? "default" : "destructive"}>
                                    {lesson.isActive ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Description */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Description</h3>
                        <p className="text-sm text-muted-foreground">{lesson.description}</p>
                    </div>

                    <Separator />

                    {/* Content Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Content</h3>

                        {contentType === "video" && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Play className="h-4 w-4" />
                                    <span className="font-medium">Video Content</span>
                                </div>
                                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                    <iframe
                                        src={lesson.videoUrl}
                                        title={lesson.title}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(lesson.videoUrl, '_blank')}
                                    className="flex items-center gap-2"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Open in New Tab
                                </Button>
                            </div>
                        )}

                        {contentType === "file" && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span className="font-medium">File Content</span>
                                </div>
                                <div className="p-4 border rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground mb-2">File URL:</p>
                                    <p className="text-sm font-mono break-all">{lesson.fileUrl}</p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleFileDownload}
                                    className="flex items-center gap-2"
                                >
                                    <Download className="h-4 w-4" />
                                    Download File
                                </Button>
                            </div>
                        )}

                        {contentType === "text" && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span className="font-medium">Text Content</span>
                                </div>
                                <div className="p-4 border rounded-lg bg-muted/50">
                                    <p className="text-sm whitespace-pre-wrap">{lesson.text}</p>
                                </div>
                            </div>
                        )}

                        {contentType === "none" && (
                            <div className="p-4 border rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground text-center">
                                    No content has been added to this lesson yet.
                                </p>
                            </div>
                        )}
                    </div>

                    <Separator />

                    {/* Module Information */}
                    {lesson.module && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Module Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium">Module Title</p>
                                    <p className="text-sm text-muted-foreground">{lesson.module.title}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Module Duration</p>
                                    <p className="text-sm text-muted-foreground">{lesson.module.duration}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Module Order</p>
                                    <p className="text-sm text-muted-foreground">{lesson.module.order}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Module Status</p>
                                    <Badge variant={lesson.module.isActive ? "default" : "secondary"}>
                                        {lesson.module.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                            {lesson.module.description && (
                                <div>
                                    <p className="text-sm font-medium">Module Description</p>
                                    <p className="text-sm text-muted-foreground">{lesson.module.description}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <Separator />

                    {/* Timestamps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-medium">Created</p>
                            <p className="text-muted-foreground">{formatDate(lesson.createdAt)}</p>
                        </div>
                        <div>
                            <p className="font-medium">Last Updated</p>
                            <p className="text-muted-foreground">{formatDate(lesson.updatedAt)}</p>
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-end pt-4">
                        <Button onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LessonDetailsModal;
