import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const RatingDistribution = ({ reviewStats }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map(rating => {
                        const count = reviewStats.ratingDistribution[rating];
                        const percentage = reviewStats.totalReviews > 0
                            ? (count / reviewStats.totalReviews * 100).toFixed(1)
                            : 0;

                        return (
                            <div key={rating} className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1 w-16">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">{rating}</span>
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                </div>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="h-2 bg-yellow-400 rounded-full"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm text-slate-600 dark:text-slate-400 w-16 text-right">
                                    {count} ({percentage}%)
                                </span>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default RatingDistribution;
