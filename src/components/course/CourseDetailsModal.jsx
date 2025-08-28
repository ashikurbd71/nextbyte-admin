import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, BookOpen, Users, Star, Clock, DollarSign, User, Calendar } from "lucide-react";
import CourseStatusBadge from "./CourseStatusBadge";

const CourseDetailsModal = ({ course, onClose, onEdit }) => {
    if (!course) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl font-semibold">Course Details</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Course Header */}
                    <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">
                                {course.title?.charAt(0)?.toUpperCase() || "C"}
                            </span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                {course.title}
                            </h2>
                            <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                                <span className="flex items-center space-x-1">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{course.category}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>{course.enrollmentCount || 0} enrollments</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span>{course.rating?.toFixed(1) || "0.0"}</span>
                                </span>
                            </div>
                            <div className="mt-2">
                                <CourseStatusBadge status={course.status} />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Price</p>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                    {course.price ? `$${course.price}` : "Free"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Duration</p>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                    {course.duration ? `${course.duration} hours` : "Not specified"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Level</p>
                                <p className="font-semibold text-slate-900 dark:text-white capitalize">
                                    {course.level || "Not specified"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <Calendar className="h-5 w-5 text-orange-600" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Created</p>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                    {formatDate(course.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            Description
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {course.description || "No description available."}
                        </p>
                    </div>

                    {/* Instructor */}
                    {course.instructor && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Instructor
                            </h3>
                            <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">
                                        {course.instructor.name}
                                    </p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {course.instructor.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Requirements */}
                    {course.requirements && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Requirements
                            </h3>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                                    {course.requirements}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Learning Outcomes */}
                    {course.learningOutcomes && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Learning Outcomes
                            </h3>
                            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                                    {course.learningOutcomes}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Course Information
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Status:</span>
                                    <CourseStatusBadge status={course.status} />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Last Updated:</span>
                                    <span className="text-slate-900 dark:text-white">
                                        {formatDate(course.updatedAt || course.createdAt)}
                                    </span>
                                </div>
                                {course.tags && course.tags.length > 0 && (
                                    <div>
                                        <span className="text-slate-600 dark:text-slate-400">Tags:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {course.tags.map((tag, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={() => onEdit(course.id)} className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Edit Course
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CourseDetailsModal;
