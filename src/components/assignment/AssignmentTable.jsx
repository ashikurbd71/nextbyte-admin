import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Eye, Github, ExternalLink, Calendar, BookOpen, Power, PowerOff } from "lucide-react";

const AssignmentTable = ({
    assignments,
    onEdit,
    onDelete,
    onView,
    onToggleActive,
    isLoading = false
}) => {
    const getStatusBadge = (isActive) => {
        return (
            <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                {isActive ? "Active" : "Inactive"}
            </Badge>
        );
    };

    const formatDueDate = (dueDate) => {
        if (!dueDate) return "No due date";
        return new Date(dueDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const isOverdue = (dueDate) => {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date();
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!assignments || assignments.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                        <BookOpen className="h-12 w-12 mb-3 opacity-50" />
                        <p className="text-lg font-medium">No assignments found</p>
                        <p className="text-sm">Create your first assignment to get started</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Assignments ({assignments.length})
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30">
                                <TableHead className="font-semibold text-sm">Assignment</TableHead>
                                <TableHead className="font-semibold text-sm">Module</TableHead>
                                <TableHead className="font-semibold text-sm text-center">Marks</TableHead>
                                <TableHead className="font-semibold text-sm">Due Date</TableHead>
                                <TableHead className="font-semibold text-sm text-center">Status</TableHead>
                                <TableHead className="font-semibold text-sm text-center">Links</TableHead>
                                <TableHead className="font-semibold text-sm text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assignments.map((assignment, index) => (
                                <TableRow
                                    key={assignment.id}
                                    className={`hover:bg-muted/50 transition-colors ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                                        }`}
                                >
                                    <TableCell className="py-4">
                                        <div className="space-y-1">
                                            <div className="font-semibold text-base text-foreground">
                                                {assignment.title}
                                            </div>
                                            <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
                                                {assignment.description}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="text-sm font-medium">
                                            {assignment.module?.title || "N/A"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-center">
                                        <Badge variant="outline" className="text-sm font-medium">
                                            {assignment.totalMarks} marks
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className={`text-sm font-medium ${isOverdue(assignment.dueDate)
                                                    ? "text-red-600"
                                                    : "text-foreground"
                                                }`}>
                                                {formatDueDate(assignment.dueDate)}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-center">
                                        {getStatusBadge(assignment.isActive)}
                                    </TableCell>
                                    <TableCell className="py-4 text-center">
                                        <div className="flex justify-center gap-1">
                                            {assignment.githubLink && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => window.open(assignment.githubLink, '_blank')}
                                                    className="h-8 w-8 p-0 hover:bg-muted"
                                                    title="View GitHub Repository"
                                                >
                                                    <Github className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {assignment.liveLink && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => window.open(assignment.liveLink, '_blank')}
                                                    className="h-8 w-8 p-0 hover:bg-muted"
                                                    title="View Live Demo"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {!assignment.githubLink && !assignment.liveLink && (
                                                <span className="text-xs text-muted-foreground">No links</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onView(assignment)}
                                                className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700"
                                                title="View Details"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onEdit(assignment)}
                                                className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700"
                                                title="Edit Assignment"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onToggleActive(assignment)}
                                                className={`h-8 w-8 p-0 ${assignment.isActive
                                                        ? "hover:bg-orange-100 hover:text-orange-700"
                                                        : "hover:bg-green-100 hover:text-green-700"
                                                    }`}
                                                title={assignment.isActive ? "Deactivate" : "Activate"}
                                            >
                                                {assignment.isActive ? (
                                                    <PowerOff className="h-4 w-4" />
                                                ) : (
                                                    <Power className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onDelete(assignment)}
                                                className="h-8 w-8 p-0 text-red-600 hover:bg-red-100 hover:text-red-700"
                                                title="Delete Assignment"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default AssignmentTable;
