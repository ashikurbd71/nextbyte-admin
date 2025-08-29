import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useGetCourseByIdQuery } from "@/features/course-apis/coursesApis";
import { exportToExcel } from "@/utils/excel-export";
import { toast } from "react-hot-toast";
import Loader from "@/components/loader/Loader";
import {
    CourseReviewHeader,
    CourseReviewStats,
    RatingDistribution,
    ReviewFilters,
    ReviewList,
    calculateReviewStats,
    filterReviews
} from "@/components/course";

const CourseReviewViewPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [ratingFilter, setRatingFilter] = useState("all");

    const { data: course, isLoading: courseLoading, error: courseError } = useGetCourseByIdQuery(courseId);
    const reviews = course?.data?.reviews || [];

    const reviewStats = calculateReviewStats(reviews);
    const filteredReviews = filterReviews(reviews, searchTerm, ratingFilter);

    const handleExportToExcel = () => {
        if (!filteredReviews || filteredReviews.length === 0) {
            toast.error("No review data to export");
            return;
        }

        const exportData = filteredReviews.map(review => {
            const student = review.student || review;
            return {
                'Student Name': student.name || 'Unknown',
                'Email': student.email || 'No email',
                'Rating': review.rating || 0,
                'Comment': review.comment || 'No comment',
                'Reply': review.reply || 'No reply',
                'Review Date': review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'
            };
        });

        const filename = `${course?.name || 'Course'}_reviews_${new Date().toISOString().split('T')[0]}.xlsx`;
        const success = exportToExcel(exportData, filename, 'Course Reviews');

        if (success) {
            toast.success(`Successfully exported ${filteredReviews.length} reviews to Excel`);
        } else {
            toast.error("Failed to export reviews");
        }
    };

    if (courseLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader variant="ring" size="lg" text="Loading course reviews..." />
            </div>
        );
    }

    if (courseError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
                    <p className="text-gray-600">Failed to load course review data</p>
                    <Button onClick={() => navigate(-1)} className="mt-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Header */}
            <CourseReviewHeader
                courseName={course?.name}
                reviewCount={reviews.length}
            />

            {/* Course Stats */}
            <CourseReviewStats
                courseName={course?.name}
                reviewStats={reviewStats}
            />

            {/* Rating Distribution */}
            <RatingDistribution reviewStats={reviewStats} />

            {/* Filters and Actions */}
            <ReviewFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                ratingFilter={ratingFilter}
                setRatingFilter={setRatingFilter}
                onExport={handleExportToExcel}
                hasReviews={filteredReviews.length > 0}
            />

            {/* Reviews List */}
            <ReviewList
                filteredReviews={filteredReviews}
                searchTerm={searchTerm}
                ratingFilter={ratingFilter}
            />
        </div>
    );
};

export default CourseReviewViewPage; 