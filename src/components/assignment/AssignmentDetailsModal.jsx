import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Calendar, Github, ExternalLink, BookOpen, Award, Clock } from "lucide-react";

const AssignmentDetailsModal = ({ assignment, onClose, onEdit }) => {
    if (!assignment) return null;

    const formatDueDate = (dueDate) => {
        if (!dueDate) return "No due date set";
        return new Date(dueDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const isOverdue = (dueDate) => {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date();
    };

    const getStatusBadge = (isActive) => {
        return (
            <Badge variant={isActive ? "default" : "secondary"}>
                {isActive ? "Active" : "Inactive"}
            </Badge>
        );
    };

    const getDueDateStatus = (dueDate) => {
        if (!dueDate) return null;

        if (isOverdue(dueDate)) {
            return <Badge variant="destructive">Overdue</Badge>;
        }

        const now = new Date();
        const due = new Date(dueDate);
        const diffTime = due - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
            return <Badge variant="destructive">Due Today</Badge>;
        } else if (diffDays <= 3) {
            return <Badge variant="secondary">Due Soon</Badge>;
        }

        return null;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Assignment Details
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(assignment)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="h-8 w-8 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Title and Status */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">{assignment.title}</h2>
                        <div className="flex items-center gap-2">
                            {getStatusBadge(assignment.isActive)}
                            {getDueDateStatus(assignment.dueDate)}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Description</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {assignment.description}
                        </p>
                    </div>

                    {/* Module Information */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Module</h3>
                        <div className="bg-muted p-3 rounded-lg">
                            <p className="font-medium">{assignment.module?.title || "N/A"}</p>
                            {assignment.module?.description && (
                                <p className="text-sm text-muted-foreground mt-1">
                                    {assignment.module.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Assignment Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Total Marks */}
                        <div className="space-y-2">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                Total Marks
                            </h3>
                            <Badge variant="outline" className="text-lg px-3 py-1">
                                {assignment.totalMarks} marks
                            </Badge>
                        </div>

                        {/* Due Date */}
                        <div className="space-y-2">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Due Date
                            </h3>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className={isOverdue(assignment.dueDate) ? "text-red-600 font-medium" : ""}>
                                    {formatDueDate(assignment.dueDate)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Links Section */}
                    {(assignment.githubLink || assignment.liveLink) && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-lg">Links</h3>
                            <div className="flex flex-wrap gap-2">
                                {assignment.githubLink && (
                                    <Button
                                        variant="outline"
                                        onClick={() => window.open(assignment.githubLink, '_blank')}
                                        className="flex items-center gap-2"
                                    >
                                        <Github className="h-4 w-4" />
                                        GitHub Repository
                                    </Button>
                                )}
                                {assignment.liveLink && (
                                    <Button
                                        variant="outline"
                                        onClick={() => window.open(assignment.liveLink, '_blank')}
                                        className="flex items-center gap-2"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Live Demo
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Created/Updated Info */}
                    <div className="pt-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div>
                                <span className="font-medium">Created:</span> {new Date(assignment.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                            <div>
                                <span className="font-medium">Last Updated:</span> {new Date(assignment.updatedAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AssignmentDetailsModal;
