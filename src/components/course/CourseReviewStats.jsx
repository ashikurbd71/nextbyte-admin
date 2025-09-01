import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Star, MessageSquare, TrendingUp } from "lucide-react";

const CourseReviewStats = ({ courseName, reviewStats }) => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-3">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Course</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{courseName}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Star className="h-8 w-8 text-yellow-600" />
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Average Rating</p>
                            <p className="font-semibold text-slate-900 dark:text-white">
                                {reviewStats.averageRating}/5
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <MessageSquare className="h-8 w-8 text-green-600" />
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Total Reviews</p>
                            <p className="font-semibold text-slate-900 dark:text-white">{reviewStats.totalReviews}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <TrendingUp className="h-8 w-8 text-purple-600" />
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Top Ratings</p>
                            <p className="font-semibold text-slate-900 dark:text-white">
                                {reviewStats.ratingDistribution[5]} 5★, {reviewStats.ratingDistribution[4]} 4★
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseReviewStats;
