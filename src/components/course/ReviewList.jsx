import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ filteredReviews, searchTerm, ratingFilter }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Course Reviews ({filteredReviews.length})</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {filteredReviews.length === 0 ? (
                    <div className="text-center py-8">
                        <MessageSquare className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                            No reviews found
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            {searchTerm || ratingFilter !== "all"
                                ? "Try adjusting your search or filter criteria"
                                : "This course doesn't have any reviews yet."
                            }
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredReviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ReviewList;
