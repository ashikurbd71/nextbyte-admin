import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MoreHorizontal, Edit, Trash2, Eye, Users, Star, CheckCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CourseStatusBadge from "./CourseStatusBadge";

export const createCourseTableColumns = ({
    onViewDetails,
    onEdit,
    onDelete,
    onToggleStatus,
    onToggleActiveStatus,
    onTogglePublicStatus,
    onViewEnrollments,
    loadingStates = {},
}) => [
        {
            key: "name",
            header: "Course Title",
            cell: (course) => {
                if (!course) return null;
                return (
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                                {course.name?.charAt(0)?.toUpperCase() || "C"}
                            </span>
                        </div>
                        <div>
                            <div className="font-medium text-slate-900 dark:text-white">
                                {course.name}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                {course.category?.name || "Uncategorized"}
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            key: "instructor",
            header: "Instructor",
            cell: (course) => {
                if (!course) return null;
                return (
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                {course.instructor?.name?.charAt(0)?.toUpperCase() || "I"}
                            </span>
                        </div>
                        <span className="text-sm text-slate-900 dark:text-white">
                            {course.instructor?.name || "Unknown"}
                        </span>
                    </div>
                );
            },
        },
        {
            key: "price",
            header: "Price",
            cell: (course) => {
                if (!course) return null;
                return (
                    <div className="text-sm">
                        {course.price ? (
                            <div className="flex flex-col">
                                {course.discountPrice && course.discountPrice !== course.price && (
                                    <span className="text-xs text-slate-400 line-through">
                                        ${course.price}
                                    </span>
                                )}
                                <span className="font-medium text-green-600 dark:text-green-400">
                                    ${course.discountPrice || course.price}
                                </span>
                            </div>
                        ) : (
                            <Badge variant="secondary" className="text-xs">
                                Free
                            </Badge>
                        )}
                    </div>
                );
            },
        },
        {
            key: "totalJoin",
            header: "Enrollments",
            cell: (course) => {
                if (!course) return null;
                return (
                    <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-900 dark:text-white">
                            {course.totalJoin || 0}
                        </span>
                        <span className="text-xs text-slate-400">
                            / {course.totalSeat || 0}
                        </span>
                    </div>
                );
            },
        },
        {
            key: "rating",
            header: "Rating",
            cell: (course) => {
                if (!course) return null;
                // Calculate average rating from reviews
                const avgRating = course.reviews && course.reviews.length > 0
                    ? course.reviews.reduce((sum, review) => sum + review.rating, 0) / course.reviews.length
                    : 0;

                return (
                    <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-slate-900 dark:text-white">
                            {avgRating.toFixed(1)}
                        </span>
                        <span className="text-xs text-slate-400">
                            ({course.reviews?.length || 0})
                        </span>
                    </div>
                );
            },
        },
        {
            key: "isPublished",
            header: "Status",
            cell: (course) => {
                if (!course) return null;
                const status = course.isPublished ? "published" : "draft";
                return (
                    <div className="flex items-center space-x-2">
                        <CourseStatusBadge status={status} />

                    </div>
                );
            },
        },
        {
            key: "isActive",
            header: "Active",
            cell: (course) => {
                if (!course) return null;
                const isLoading = loadingStates[`active-${course.id}`];
                return (
                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={course.isActive}
                            onCheckedChange={() => onToggleActiveStatus(course.id, !course.isActive)}
                            disabled={isLoading}
                            className="data-[state=checked]:bg-green-600"
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                            {course.isActive ? "Active" : "Inactive"}
                        </span>
                        <span className="text-xs text-slate-400">
                            ({course.isActive ? 'true' : 'false'})
                        </span>
                    </div>
                );
            },
        },


        {
            key: "createdAt",
            header: "Created",
            cell: (course) => {
                if (!course) return null;
                return (
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(course.createdAt).toLocaleDateString()}
                    </div>
                );
            },
        },
        {
            key: "actions",
            header: "Actions",
            cell: (course) => {
                if (!course) return null;
                const isLoading = loadingStates[course.id];

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => onViewDetails(course.id)}
                                className="cursor-pointer"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onViewEnrollments(course.id)}
                                className="cursor-pointer"
                            >
                                <Users className="mr-2 h-4 w-4" />
                                View Enrollments ({course.totalJoin || 0})
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => onEdit(course.id)}
                                className="cursor-pointer"
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Course
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onToggleStatus(course.id, !course.isPublished)}
                                className="cursor-pointer"
                                disabled={isLoading}
                            >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {course.isPublished ? "Unpublish" : "Publish"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => onDelete(course.id)}
                                className="cursor-pointer text-red-600 dark:text-red-400"
                                disabled={isLoading}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Course
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
