import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2, Play, Pause, ExternalLink, Loader2 } from "lucide-react";

export const createModuleTableColumns = ({
    onViewDetails,
    onEdit,
    onDelete,
    onToggleStatus,
    loadingStates,
}) => [
        {
            key: "title",
            header: "Module Title",
            sortable: true,
            cell: (module) => {
                if (!module) return null;
                return (
                    <div className="space-y-1">
                        <div className="font-medium text-foreground">{module.title}</div>
                        {module.description && (
                            <div className="text-xs text-muted-foreground line-clamp-1">
                                {module.description}
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            key: "course",
            header: "Course",
            sortable: true,
            cell: (module) => {
                if (!module) return null;
                return (
                    <div className="font-medium">
                        {module.course?.name || (
                            <span className="text-muted-foreground">N/A</span>
                        )}
                    </div>
                );
            },
        },
        {
            key: "order",
            header: "Order",
            sortable: true,
            cell: (module) => {
                if (!module) return null;
                return (
                    <Badge variant="outline" className="font-mono">
                        #{module.order}
                    </Badge>
                );
            },
        },
        {
            key: "duration",
            header: "Duration",
            sortable: true,
            cell: (module) => {
                if (!module) return null;
                return (
                    <div className="font-medium">
                        {module.duration || (
                            <span className="text-muted-foreground">Not set</span>
                        )}
                    </div>
                );
            },
        },
        {
            key: "lessons",
            header: "Lessons",
            sortable: true,
            cell: (module) => {
                if (!module) return null;
                const lessonCount = module.lessons?.length || 0;
                return (
                    <div className="text-center">
                        <Badge variant={lessonCount > 0 ? "default" : "secondary"}>
                            {lessonCount} {lessonCount === 1 ? 'lesson' : 'lessons'}
                        </Badge>
                    </div>
                );
            },
        },
        {
            key: "assignments",
            header: "Assignments",
            sortable: true,
            cell: (module) => {
                if (!module) return null;
                const assignmentCount = module.assignments?.length || 0;
                return (
                    <div className="text-center">
                        <Badge variant={assignmentCount > 0 ? "default" : "secondary"}>
                            {assignmentCount} {assignmentCount === 1 ? 'assignment' : 'assignments'}
                        </Badge>
                    </div>
                );
            },
        },
        {
            key: "isActive",
            header: "Status",
            sortable: true,
            cell: (module) => {
                if (!module) return null;
                const isLoading = loadingStates?.toggle?.[module.id];

                return (
                    <div className="flex items-center gap-2">
                        <Badge variant={module.isActive ? "default" : "secondary"}>
                            {module.isActive ? "Active" : "Inactive"}
                        </Badge>
                        {isLoading && (
                            <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                        )}
                    </div>
                );
            },
        },
        {
            key: "createdAt",
            header: "Created",
            sortable: true,
            cell: (module) => {
                if (!module) return null;
                const date = new Date(module.createdAt);
                return (
                    <div className="text-sm text-muted-foreground">
                        {date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </div>
                );
            },
        },
        {
            key: "actions",
            header: "Actions",
            sortable: false,
            cell: (module) => {
                if (!module) return null;
                const isLoading = loadingStates?.delete?.[module.id] || loadingStates?.toggle?.[module.id];

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-8 w-8 p-0 hover:bg-muted"
                                disabled={isLoading}
                            >
                                <span className="sr-only">Open menu</span>
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <MoreHorizontal className="h-4 w-4" />
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                                onClick={() => onViewDetails(module.id)}
                                className="cursor-pointer"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onEdit(module.id)}
                                className="cursor-pointer"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Module
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => onToggleStatus({ id: module.id, isActive: !module.isActive })}
                                disabled={isLoading}
                                className="cursor-pointer"
                            >
                                {module.isActive ? (
                                    <>
                                        <Pause className="mr-2 h-4 w-4" />
                                        Deactivate
                                    </>
                                ) : (
                                    <>
                                        <Play className="mr-2 h-4 w-4" />
                                        Activate
                                    </>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => onDelete(module.id)}
                                disabled={isLoading}
                                className="text-red-600 cursor-pointer focus:text-red-600"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Module
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
