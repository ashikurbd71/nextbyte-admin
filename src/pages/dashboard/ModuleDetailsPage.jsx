import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetModuleByIdQuery } from "@/features/modules-apis/moduleApis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Play, FileText, Clock, BookOpen, Users, Calendar, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ModuleDetailsPage = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedLesson, setSelectedLesson] = useState(null);

    const {
        data: module,
        isLoading,
        error,
        refetch
    } = useGetModuleByIdQuery(moduleId);

    useEffect(() => {
        if (module?.lessons && module.lessons.length > 0) {
            setSelectedLesson(module.lessons[0]);
        }
    }, [module]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
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
            <div className="flex items-center justify-center min-h-[400px]">
                <Card className="w-full max-w-md">
                    <CardContent className="text-center space-y-4 p-6">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <BookOpen className="h-6 w-6 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-red-600">Error Loading Module</h2>
                        <p className="text-muted-foreground">
                            {error?.data?.message || "Failed to load module details"}
                        </p>
                        <Button onClick={() => refetch()} variant="outline">
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!module) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Card className="w-full max-w-md">
                    <CardContent className="text-center space-y-4 p-6">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <BookOpen className="h-6 w-6 text-gray-600" />
                        </div>
                        <h2 className="text-xl font-semibold">Module Not Found</h2>
                        <p className="text-muted-foreground">
                            The module you're looking for doesn't exist.
                        </p>
                        <Button onClick={() => navigate("/dashboard/modules")} variant="outline">
                            Back to Modules
                        </Button>
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
                    <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/modules")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Modules
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{module.title}</h1>
                        <p className="text-muted-foreground">
                            Course: {module.course?.name}
                        </p>
                    </div>
                </div>
                <Badge variant={module.isActive ? "default" : "secondary"}>
                    {module.isActive ? "Active" : "Inactive"}
                </Badge>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="lessons">Lessons ({module.lessons?.length || 0})</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments ({module.assignments?.length || 0})</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Module Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <BookOpen className="h-5 w-5" />
                                    <span>Module Information</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Title</label>
                                        <p className="text-lg font-semibold">{module.title}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Order</label>
                                        <p className="text-lg font-semibold">{module.order}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Duration</label>
                                        <p className="text-lg font-semibold">{module.duration}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                                        <Badge variant={module.isActive ? "default" : "secondary"}>
                                            {module.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p className="mt-1">{module.description}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Users className="h-5 w-5" />
                                    <span>Course Information</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Course Name</label>
                                        <p className="text-lg font-semibold">{module.course?.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Course Duration</label>
                                        <p className="text-lg font-semibold">{module.course?.duration}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Price</label>
                                        <p className="text-lg font-semibold">${module.course?.price}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Enrollments</label>
                                        <p className="text-lg font-semibold">{module.course?.totalJoin}/{module.course?.totalSeat}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Statistics */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Clock className="h-5 w-5" />
                                <span>Module Statistics</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{module.lessons?.length || 0}</p>
                                    <p className="text-sm text-muted-foreground">Total Lessons</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{module.assignments?.length || 0}</p>
                                    <p className="text-sm text-muted-foreground">Total Assignments</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{module.duration}</p>
                                    <p className="text-sm text-muted-foreground">Duration</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timestamps */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5" />
                                <span>Timestamps</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Created</label>
                                    <p>{formatDate(module.createdAt)}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                                    <p>{formatDate(module.updatedAt)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Lessons Tab */}
                <TabsContent value="lessons" className="space-y-6">
                    {module.lessons && module.lessons.length > 0 ? (
                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Lessons List */}
                            <div className="lg:col-span-1">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <Play className="h-5 w-5" />
                                            <span>Lessons</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {module.lessons.map((lesson, index) => (
                                                <div
                                                    key={lesson.id}
                                                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedLesson?.id === lesson.id
                                                            ? "border-primary bg-primary/5"
                                                            : "border-border hover:border-primary/50"
                                                        }`}
                                                    onClick={() => setSelectedLesson(lesson)}
                                                >
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-semibold text-sm">{lesson.title}</h4>
                                                        <Badge variant={lesson.isActive ? "default" : "secondary"} className="text-xs">
                                                            {lesson.isActive ? "Active" : "Inactive"}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mb-2">{lesson.description}</p>
                                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                        <span>Order: {lesson.order}</span>
                                                        <span>{lesson.duration}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Lesson Content */}
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <Play className="h-5 w-5" />
                                            <span>{selectedLesson?.title || "Select a Lesson"}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {selectedLesson ? (
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-muted-foreground">{selectedLesson.description}</p>
                                                    <Badge variant={selectedLesson.isPreview ? "default" : "secondary"}>
                                                        {selectedLesson.isPreview ? "Preview" : "Full"}
                                                    </Badge>
                                                </div>

                                                {/* Video Content */}
                                                {selectedLesson.videoUrl && (
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Video Content</label>
                                                        <div className="aspect-video w-full">
                                                            <iframe
                                                                src={selectedLesson.videoUrl}
                                                                title={selectedLesson.title}
                                                                className="w-full h-full rounded-lg border"
                                                                allowFullScreen
                                                            />
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Text Content */}
                                                {selectedLesson.text && (
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">Text Content</label>
                                                        <div className="p-4 border rounded-lg bg-muted/50">
                                                            <p className="whitespace-pre-wrap">{selectedLesson.text}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* File Content */}
                                                {selectedLesson.fileUrl && (
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium">File Content</label>
                                                        <div className="p-4 border rounded-lg">
                                                            <a
                                                                href={selectedLesson.fileUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center space-x-2 text-blue-600 hover:underline"
                                                            >
                                                                <ExternalLink className="h-4 w-4" />
                                                                <span>View File</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {!selectedLesson.videoUrl && !selectedLesson.text && !selectedLesson.fileUrl && (
                                                    <div className="text-center text-muted-foreground py-8">
                                                        No content available for this lesson.
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-center text-muted-foreground py-8">
                                                Select a lesson to view its content.
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="text-center py-8">
                                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No Lessons Found</h3>
                                <p className="text-muted-foreground">
                                    This module doesn't have any lessons yet.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Assignments Tab */}
                <TabsContent value="assignments" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <FileText className="h-5 w-5" />
                                <span>Module Assignments</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {module.assignments && module.assignments.length > 0 ? (
                                <div className="space-y-4">
                                    {module.assignments.map((assignment, index) => (
                                        <div key={assignment.id} className="border rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold">{assignment.title}</h4>
                                                <Badge variant={assignment.isActive ? "default" : "secondary"}>
                                                    {assignment.isActive ? "Active" : "Inactive"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">{assignment.description}</p>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="font-medium">Total Marks:</span> {assignment.totalMarks}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Due Date:</span> {formatDate(assignment.dueDate)}
                                                </div>
                                            </div>
                                            {assignment.githubLink && (
                                                <div className="mt-3">
                                                    <label className="text-sm font-medium">GitHub Link:</label>
                                                    <a
                                                        href={assignment.githubLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center space-x-2 text-blue-600 hover:underline ml-2"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                        <span>View on GitHub</span>
                                                    </a>
                                                </div>
                                            )}
                                            {assignment.liveLink && (
                                                <div className="mt-3">
                                                    <label className="text-sm font-medium">Live Link:</label>
                                                    <a
                                                        href={assignment.liveLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center space-x-2 text-blue-600 hover:underline ml-2"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                        <span>View Live</span>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground py-8">
                                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">No Assignments Found</h3>
                                    <p>This module doesn't have any assignments yet.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ModuleDetailsPage;
