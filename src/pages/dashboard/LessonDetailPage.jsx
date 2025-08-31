import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetLessonByIdQuery } from "@/features/lession-apis/lessionApis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Play, FileText, Download, Eye, Clock, BookOpen, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const LessonDetailPage = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("content");

    const {
        data: lesson,
        isLoading,
        error,
        refetch
    } = useGetLessonByIdQuery(lessonId);

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
        if (lesson?.videoUrl) return "video";
        if (lesson?.fileUrl) return "file";
        if (lesson?.text) return "text";
        return "none";
    };

    const contentType = getContentType();

    const handleFileDownload = () => {
        if (lesson?.fileUrl) {
            window.open(lesson.fileUrl, '_blank');
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-48" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </div>
                <Card className="border-red-200 bg-red-50">
                    <CardContent className="p-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-red-800">
                                Error Loading Lesson
                            </h3>
                            <p className="text-sm text-red-700 mt-2">
                                {error?.data?.message || error?.message || "An unexpected error occurred."}
                            </p>
                            <Button
                                variant="outline"
                                onClick={refetch}
                                className="mt-4"
                            >
                                Try Again
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">Lesson Not Found</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                The lesson you're looking for doesn't exist or has been removed.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">{lesson.title}</h1>
                        <p className="text-sm text-muted-foreground">
                            Module: {lesson.module?.title || "N/A"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant={lesson.isActive ? "default" : "destructive"}>
                        {lesson.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant={lesson.isPreview ? "default" : "secondary"}>
                        {lesson.isPreview ? "Preview Enabled" : "Preview Disabled"}
                    </Badge>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Lesson Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Lesson Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            </div>
                            <Separator />
                            <div>
                                <h3 className="text-sm font-medium mb-2">Description</h3>
                                <p className="text-sm text-muted-foreground">{lesson.description}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Content Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {contentType === "video" && (
                                <div className="space-y-4">
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
                                        onClick={() => window.open(lesson.videoUrl, '_blank')}
                                        className="flex items-center gap-2"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Open in New Tab
                                    </Button>
                                </div>
                            )}

                            {contentType === "file" && (
                                <div className="space-y-4">
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
                                        onClick={handleFileDownload}
                                        className="flex items-center gap-2"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download File
                                    </Button>
                                </div>
                            )}

                            {contentType === "text" && (
                                <div className="space-y-4">
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
                                <div className="p-8 border rounded-lg bg-muted/50 text-center">
                                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-sm text-muted-foreground">
                                        No content has been added to this lesson yet.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Module Information */}
                    {lesson.module && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Module Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
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
                                {lesson.module.description && (
                                    <div>
                                        <p className="text-sm font-medium">Module Description</p>
                                        <p className="text-sm text-muted-foreground">{lesson.module.description}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Timestamps */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Timestamps</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium">Created</p>
                                <p className="text-sm text-muted-foreground">{formatDate(lesson.createdAt)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Last Updated</p>
                                <p className="text-sm text-muted-foreground">{formatDate(lesson.updatedAt)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LessonDetailPage;
