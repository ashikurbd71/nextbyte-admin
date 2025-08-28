import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, Archive } from "lucide-react";

const CourseStatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case "published":
                return {
                    label: "Published",
                    variant: "default",
                    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                    icon: CheckCircle,
                };
            case "draft":
                return {
                    label: "Draft",
                    variant: "secondary",
                    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                    icon: Clock,
                };
            case "archived":
                return {
                    label: "Archived",
                    variant: "destructive",
                    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                    icon: Archive,
                };
            case "inactive":
                return {
                    label: "Inactive",
                    variant: "destructive",
                    className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
                    icon: XCircle,
                };
            default:
                return {
                    label: "Unknown",
                    variant: "outline",
                    className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
                    icon: Clock,
                };
        }
    };

    const config = getStatusConfig(status);
    const IconComponent = config.icon;

    return (
        <Badge
            variant={config.variant}
            className={`flex items-center gap-1 px-2 py-1 text-xs font-medium ${config.className}`}
        >
            <IconComponent className="h-3 w-3" />
            {config.label}
        </Badge>
    );
};

export default CourseStatusBadge;
