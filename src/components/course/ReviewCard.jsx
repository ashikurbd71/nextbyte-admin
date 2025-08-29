import React from "react";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const ReviewCard = ({ review }) => {
    const student = review.student || review;

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    const getRatingBgColor = (rating) => {
        if (rating >= 4) return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
        if (rating >= 3) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                            {student.name?.charAt(0)?.toUpperCase() || "S"}
                        </span>
                    </div>
                    <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                            {student.name || "Unknown Student"}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {student.email}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Badge className={getRatingBgColor(review.rating)}>
                        {review.rating} Stars
                    </Badge>
                    <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                    </div>
                </div>
            </div>

            {/* Review Content */}
            <div className="mb-4">
                <p className="text-slate-700 dark:text-slate-300">
                    {review.comment || "No comment provided"}
                </p>
            </div>

            {/* Review Footer */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                    <span>{formatDate(review.createdAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
