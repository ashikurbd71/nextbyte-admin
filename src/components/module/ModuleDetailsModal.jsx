import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { X, Play, FileText, Clock, BookOpen, Users, Calendar, ExternalLink } from "lucide-react";

const ModuleDetailsModal = ({ module, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("overview");

    if (!module) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BookOpen className="h-5 w-5" />
                            <span>{module.title}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => window.open(`/modules/${module.id}`, '_blank')}
                            >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Full Details
                            </Button>
                            <Button variant="ghost" size="sm" onClick={onClose}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="lessons">Lessons ({module.lessons?.length || 0})</TabsTrigger>
                        <TabsTrigger value="assignments">Assignments ({module.assignments?.length || 0})</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
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
                    <TabsContent value="lessons" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Play className="h-5 w-5" />
                                    <span>Module Lessons</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {module.lessons && module.lessons.length > 0 ? (
                                    <div className="space-y-4">
                                        {module.lessons.map((lesson, index) => (
                                            <div key={lesson.id} className="border rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-semibold">{lesson.title}</h4>
                                                    <Badge variant={lesson.isActive ? "default" : "secondary"}>
                                                        {lesson.isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                                                <div className="grid grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <span className="font-medium">Order:</span> {lesson.order}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Duration:</span> {lesson.duration}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Preview:</span> {lesson.isPreview ? "Yes" : "No"}
                                                    </div>
                                                </div>
                                                {lesson.videoUrl && (
                                                    <div className="mt-3">
                                                        <label className="text-sm font-medium">Video URL:</label>
                                                        <p className="text-sm text-blue-600 break-all">{lesson.videoUrl}</p>
                                                    </div>
                                                )}
                                                {lesson.text && (
                                                    <div className="mt-3">
                                                        <label className="text-sm font-medium">Content:</label>
                                                        <p className="text-sm mt-1">{lesson.text}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-muted-foreground">No lessons found for this module.</p>
                                )}
                            </CardContent>
                        </Card>
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
                                                        <p className="text-sm text-blue-600 break-all">{assignment.githubLink}</p>
                                                    </div>
                                                )}
                                                {assignment.liveLink && (
                                                    <div className="mt-3">
                                                        <label className="text-sm font-medium">Live Link:</label>
                                                        <p className="text-sm text-blue-600 break-all">{assignment.liveLink}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-muted-foreground">No assignments found for this module.</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default ModuleDetailsModal;
