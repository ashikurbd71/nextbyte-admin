import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Star, Clock } from "lucide-react";

const CourseInfoCard = ({ course, enrollmentsCount }) => {
    const averageRating = course?.reviews && course.reviews.length > 0
        ? (course.reviews.reduce((sum, review) => sum + review.rating, 0) / course.reviews.length).toFixed(1)
        : "N/A";

    return (
        <Card>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-3">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Course</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{course?.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Users className="h-8 w-8 text-green-600" />
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Total Enrollments</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{enrollmentsCount}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Star className="h-8 w-8 text-yellow-600" />
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Average Rating</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{averageRating}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Clock className="h-8 w-8 text-purple-600" />
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Duration</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{course?.duration || "N/A"}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseInfoCard;
