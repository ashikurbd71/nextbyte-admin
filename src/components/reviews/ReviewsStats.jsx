import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReviewsStats = ({ reviews }) => {
    const totalReviews = reviews.length;
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
        : "0.0";
    const fiveStarReviews = reviews.filter(review => review.rating === 5).length;
    const activeReviews = reviews.filter(review => review.isActive).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalReviews}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{averageRating}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">5-Star Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{fiveStarReviews}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{activeReviews}</div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReviewsStats;
