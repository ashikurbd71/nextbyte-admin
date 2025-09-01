import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Play, Pause, FileText, Video, Download, Loader2 } from "lucide-react";

export const createLessonTableColumns = ({
    onViewDetails,
    onEdit,
    onDelete,
    onToggleStatus,
    onTogglePreview,
    loadingStates
}) => [
        {
            header: "Title",
            field: "title",
            cell: (lesson) => (
                <div className="max-w-[250px]">
                    <p className="font-medium truncate text-gray-900 dark:text-gray-100">{lesson.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">{lesson.description}</p>
                </div>
            )
        },
        {
            header: "Module",
            field: "module",
            cell: (lesson) => (
                <div className="min-w-[150px]">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{lesson.module?.title || "N/A"}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Order: {lesson.order}</p>
                </div>
            )
        },
        {
            header: "Duration",
            field: "duration",
            cell: (lesson) => (
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    {lesson.duration || "Not specified"}
                </div>
            )
        },
        {
            header: "Content Type",
            field: "contentType",
            cell: (lesson) => {
                let contentType = "None";
                let icon = null;
                let color = "secondary";
                let bgColor = "bg-gray-100 dark:bg-gray-800";

                if (lesson.videoUrl) {
                    contentType = "Video";
                    icon = <Video className="h-3 w-3" />;
                    color = "default";
                    bgColor = "bg-blue-100 dark:bg-blue-900/30";
                } else if (lesson.fileUrl) {
                    contentType = "File";
                    icon = <FileText className="h-3 w-3" />;
                    color = "default";
                    bgColor = "bg-green-100 dark:bg-green-900/30";
                } else if (lesson.text) {
                    contentType = "Text";
                    icon = <FileText className="h-3 w-3" />;
                    color = "default";
                    bgColor = "bg-purple-100 dark:bg-purple-900/30";
                }

                return (
                    <Badge
                        variant={color}
                        className={`flex items-center gap-1.5 w-fit ${bgColor} text-xs font-medium`}
                    >
                        {icon}
                        {contentType}
                    </Badge>
                );
            }
        },
        {
            header: "Preview",
            field: "isPreview",
            cell: (lesson) => (
                <Badge
                    variant={lesson.isPreview ? "default" : "secondary"}
                    className={`text-xs font-medium ${lesson.isPreview ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
                >
                    {lesson.isPreview ? "Enabled" : "Disabled"}
                </Badge>
            )
        },
        {
            header: "Status",
            field: "isActive",
            cell: (lesson) => (
                <Badge
                    variant={lesson.isActive ? "default" : "destructive"}
                    className={`text-xs font-medium ${lesson.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}
                >
                    {lesson.isActive ? "Active" : "Inactive"}
                </Badge>
            )
        },
        {
            header: "Actions",
            field: "actions",
            cell: (lesson) => (
                <div className="flex items-center gap-1.5">
                    {/* View Details */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(lesson)}
                        className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="View Details"
                        aria-label="View lesson details"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>

                    {/* Edit */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(lesson)}
                        className="h-8 w-8 p-0 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        title="Edit Lesson"
                        aria-label="Edit lesson"
                    >
                        <Edit className="h-4 w-4" />
                    </Button>

                    {/* Toggle Status */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleStatus(lesson.id, !lesson.isActive)}
                        disabled={loadingStates.toggle[lesson.id]}
                        className={`h-8 w-8 p-0 transition-colors ${lesson.isActive
                                ? 'hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400'
                                : 'hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400'
                            }`}
                        title={lesson.isActive ? "Deactivate Lesson" : "Activate Lesson"}
                        aria-label={lesson.isActive ? "Deactivate lesson" : "Activate lesson"}
                    >
                        {loadingStates.toggle[lesson.id] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : lesson.isActive ? (
                            <Pause className="h-4 w-4" />
                        ) : (
                            <Play className="h-4 w-4" />
                        )}
                    </Button>

                    {/* Toggle Preview */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onTogglePreview(lesson.id, !lesson.isPreview)}
                        disabled={loadingStates.togglePreview[lesson.id]}
                        className={`h-8 w-8 p-0 transition-colors ${lesson.isPreview
                                ? 'hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400'
                                : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400'
                            }`}
                        title={lesson.isPreview ? "Disable Preview" : "Enable Preview"}
                        aria-label={lesson.isPreview ? "Disable preview" : "Enable preview"}
                    >
                        {loadingStates.togglePreview[lesson.id] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </Button>

                    {/* Download File (if available) */}
                    {lesson.fileUrl && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(lesson.fileUrl, '_blank')}
                            className="h-8 w-8 p-0 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            title="Download File"
                            aria-label="Download lesson file"
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                    )}

                    {/* Delete */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(lesson.id)}
                        disabled={loadingStates.delete[lesson.id]}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        title="Delete Lesson"
                        aria-label="Delete lesson"
                    >
                        {loadingStates.delete[lesson.id] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Trash2 className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            )
        }
    ];
