import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, BookOpen, Users, Star, Clock, DollarSign, User, Calendar, Play, FileText, ExternalLink, CheckCircle, Eye } from "lucide-react";
import CourseStatusBadge from "./CourseStatusBadge";

const CourseDetailsModal = ({ course, onClose, onEdit }) => {
    const navigate = useNavigate();

    if (!course || typeof course !== 'object') return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Calculate average rating from reviews
    const avgRating = course.reviews && course.reviews.length > 0
        ? course.reviews.reduce((sum, review) => sum + review.rating, 0) / course.reviews.length
        : 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
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
                                {course.name?.charAt(0)?.toUpperCase() || "C"}
                            </span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                {course.name}
                            </h2>
                            <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                                <span className="flex items-center space-x-1">
                                    <BookOpen className="h-4 w-4" />
                                    <span>{course.category?.name || "Uncategorized"}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <Users className="h-4 w-4" />
                                    <span>{course.totalJoin || 0} enrollments</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span>{avgRating.toFixed(1)}</span>
                                </span>
                            </div>
                            <div className="mt-2">
                                <CourseStatusBadge status={course.isPublished ? "published" : "draft"} />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Instructor Information */}
                    {course.instructors && course.instructors.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                                Instructors ({course.instructors.length})
                            </h3>
                            <div className="space-y-3">
                                {course.instructors.map((instructor, index) => (
                                    <div key={instructor.id} className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                            {instructor.photoUrl ? (
                                                <img
                                                    src={instructor.photoUrl}
                                                    alt={instructor.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-white font-bold text-xl">
                                                    {instructor.name?.charAt(0)?.toUpperCase() || "I"}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                                    {instructor.name}
                                                </h4>
                                                {instructor.designation && (
                                                    <Badge variant="outline" className="text-xs">
                                                        {instructor.designation}
                                                    </Badge>
                                                )}
                                            </div>
                                            {instructor.email && (
                                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                                    {instructor.email}
                                                </p>
                                            )}
                                            {instructor.bio && (
                                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                    {instructor.bio}
                                                </p>
                                            )}
                                            {instructor.expertise && instructor.expertise.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {instructor.expertise.slice(0, 3).map((skill, skillIndex) => (
                                                        <Badge key={skillIndex} variant="" className="text-xs">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                    {instructor.expertise.length > 3 && (
                                                        <Badge variant="" className="text-xs">
                                                            +{instructor.expertise.length - 3} more
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Price</p>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                    {course.price ? `$${course.price}` : "Free"}
                                </p>
                                {course.discountPrice && course.discountPrice !== course.price && (
                                    <p className="text-xs text-green-600 dark:text-green-400">
                                        ${course.discountPrice} (Discounted)
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <Clock className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Duration</p>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                    {course.duration || "Not specified"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <BookOpen className="h-5 w-5 text-purple-600" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Modules</p>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                    {course.totalModules || course.modules?.length || 0}
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

                    {/* What You Will Learn */}
                    {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                What You Will Learn
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {course.whatYouWillLearn.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-2 p-2 bg-slate-50 dark:bg-slate-800 rounded">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span className="text-sm text-slate-600 dark:text-slate-400">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Technologies */}
                    {course.technologies && course.technologies.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {course.technologies.map((tech, index) => (
                                    <Badge key={index} variant="" className="flex items-center gap-1">
                                        {tech.image && (
                                            <img src={tech.image} alt={tech.name} className="w-4 h-4 rounded" />
                                        )}
                                        {tech.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Requirements */}
                    {course.requirements && course.requirements.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Requirements
                            </h3>
                            <div className="space-y-2">
                                {course.requirements.map((req, index) => (
                                    <div key={index} className="flex items-center space-x-2 p-2 bg-slate-50 dark:bg-slate-800 rounded">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Modules */}
                    {course.modules && course.modules.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                Course Modules ({course.modules.length})
                            </h3>
                            <div className="space-y-3">
                                {course.modules.map((module, moduleIndex) => (
                                    <div key={module.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                                    {moduleIndex + 1}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-slate-900 dark:text-white">
                                                    {module.title}
                                                </h4>
                                                {module.description && (
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                                        {module.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {module.lessons?.length || 0} lessons
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Students Count */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                Enrolled Students
                            </h3>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    onClose();
                                    navigate(`/course/${course.id}/enrollments`);
                                }}
                                className="flex items-center space-x-2"
                            >
                                <Eye className="h-4 w-4" />
                                <span>View Enrollments</span>
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <Users className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                    {course.students?.length || course.totalJoin || 0} students
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Count */}
                    {course.reviews && course.reviews.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                    Reviews
                                </h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        onClose();
                                        navigate(`/course/${course.id}/reviews`);
                                    }}
                                    className="flex items-center space-x-2"
                                >
                                    <Eye className="h-4 w-4" />
                                    <span>View Reviews</span>
                                </Button>
                            </div>
                            <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <Star className="h-5 w-5 text-yellow-500" />
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Reviews</p>
                                    <p className="font-semibold text-slate-900 dark:text-white">
                                        {course.reviews.length} reviews
                                    </p>
                                </div>
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
                                    <CourseStatusBadge status={course.isPublished ? "published" : "draft"} />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Active:</span>
                                    <span className="text-slate-900 dark:text-white">
                                        {course.isActive ? "Yes" : "No"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Featured:</span>
                                    <span className="text-slate-900 dark:text-white">
                                        {course.isFeatured ? "Yes" : "No"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Last Updated:</span>
                                    <span className="text-slate-900 dark:text-white">
                                        {formatDate(course.updatedAt || course.createdAt)}
                                    </span>
                                </div>
                                {course.facebookGroupLink && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Facebook Group:</span>
                                        <a
                                            href={course.facebookGroupLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            Join Group
                                        </a>
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
