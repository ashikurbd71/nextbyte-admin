import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Loader from "@/components/loader/Loader";
import {
    ReviewsHeader,
    ReviewsStats,
    ReviewsFilters,
    ReviewsTable,
    CreateReviewDialog,
    EditReviewDialog
} from "@/components/reviews";
import {
    useGetAllReviewsQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useGetSingleReviewQuery,
    useGetReviewsByCourseIdQuery,
    useGetReviewsByUserIdQuery,
    useGetReviewStatisticsQuery,
    useToggleReviewStatusMutation
} from "@/features/review-apis/reviewApis";
import { useGetAllUsersQuery } from "@/features/user/userApis";
import { useGetCoursesQuery, useGetEnrolledStudentsQuery } from "@/features/course-apis/coursesApis";

const ReviewsManagementPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [courseFilter, setCourseFilter] = useState("all");
    const [userFilter, setUserFilter] = useState("all");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [formData, setFormData] = useState({
        rating: 5,
        comment: "",
        courseId: "",
        userId: ""
    });

    // RTK Query hooks
    const { data: reviews = [], isLoading, refetch } = useGetAllReviewsQuery();
    const { data: reviewStats } = useGetReviewStatisticsQuery();
    const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
    const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
    const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
    const [toggleReviewStatus] = useToggleReviewStatusMutation();

    // Fetch users and courses for selectors
    const { data: users = [], isLoading: usersLoading } = useGetAllUsersQuery();
    const { data: coursesData, isLoading: coursesLoading } = useGetCoursesQuery();
    const courses = coursesData?.data || [];

    // Fetch enrolled students for the selected course
    const { data: enrolledStudents = [], isLoading: enrolledStudentsLoading } = useGetEnrolledStudentsQuery(
        formData.courseId ? parseInt(formData.courseId) : null,
        { skip: !formData.courseId }
    );

    const handleCreateReview = async () => {
        try {
            if (!formData.rating || !formData.comment || !formData.courseId || !formData.userId) {
                toast.error("Please fill in all fields");
                return;
            }

            // Convert string IDs to numbers for API
            const reviewData = {
                ...formData,
                courseId: parseInt(formData.courseId),
                userId: parseInt(formData.userId)
            };

            await createReview(reviewData).unwrap();
            toast.success("Review created successfully");
            setIsCreateDialogOpen(false);
            setFormData({ rating: 5, comment: "", courseId: "", userId: "" });
        } catch (error) {
            // Handle specific error messages from the API
            if (error?.data?.message) {
                toast.error(error.data.message);
            } else if (error?.status === 404) {
                toast.error("User must be enrolled in the course to review it");
            } else {
                toast.error("Failed to create review. Please try again.");
            }
            console.error("Error creating review:", error);
        }
    };

    const handleEditReview = async () => {
        try {
            if (!selectedReview || !formData.rating || !formData.comment) {
                toast.error("Please fill in all fields");
                return;
            }

            await updateReview({
                id: selectedReview.id,
                rating: formData.rating,
                comment: formData.comment
            }).unwrap();
            toast.success("Review updated successfully");
            setIsEditDialogOpen(false);
            setSelectedReview(null);
            setFormData({ rating: 5, comment: "", courseId: "", userId: "" });
        } catch (error) {
            toast.error("Failed to update review");
            console.error("Error updating review:", error);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!confirm("Are you sure you want to delete this review?")) {
            return;
        }

        try {
            await deleteReview(reviewId).unwrap();
            toast.success("Review deleted successfully");
        } catch (error) {
            toast.error("Failed to delete review");
            console.error("Error deleting review:", error);
        }
    };

    const openEditDialog = (review) => {
        setSelectedReview(review);
        setFormData({
            rating: review.rating,
            comment: review.comment,
            courseId: review.course?.id || "",
            userId: review.user?.id || ""
        });
        setIsEditDialogOpen(true);
    };

    const openCreateDialog = () => {
        setFormData({ rating: 5, comment: "", courseId: "", userId: "" });
        setIsCreateDialogOpen(true);
    };

    // Filter reviews based on search and filters
    const filteredReviews = reviews.filter(review => {
        const matchesSearch = review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.course?.name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRating = ratingFilter === "all" || review.rating === parseInt(ratingFilter);
        const matchesCourse = courseFilter === "all" || review.course?.id === parseInt(courseFilter);
        const matchesUser = userFilter === "all" || review.user?.id === parseInt(userFilter);

        return matchesSearch && matchesRating && matchesCourse && matchesUser;
    });

    const exportToCSV = () => {
        const csvContent = [
            ['ID', 'User', 'Course', 'Rating', 'Comment', 'Created At'],
            ...filteredReviews.map(review => [
                review.id,
                review.user?.name || 'Unknown',
                review.course?.name || 'Unknown',
                review.rating,
                review.comment,
                new Date(review.createdAt).toLocaleDateString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reviews_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Reviews exported successfully");
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader variant="ring" size="lg" text="Loading reviews..." />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Header */}
            <ReviewsHeader
                onRefresh={refetch}
                onExport={exportToCSV}
                onCreateClick={openCreateDialog}
                isCreateDialogOpen={isCreateDialogOpen}
                setIsCreateDialogOpen={setIsCreateDialogOpen}
            >
                <CreateReviewDialog
                    formData={formData}
                    setFormData={setFormData}
                    courses={courses}
                    coursesLoading={coursesLoading}
                    enrolledStudents={enrolledStudents}
                    enrolledStudentsLoading={enrolledStudentsLoading}
                    onCreateReview={handleCreateReview}
                    onClose={() => setIsCreateDialogOpen(false)}
                    isCreating={isCreating}
                />
            </ReviewsHeader>

            {/* Stats Cards */}
            <ReviewsStats reviews={reviews} />

            {/* Filters */}
            <ReviewsFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                ratingFilter={ratingFilter}
                setRatingFilter={setRatingFilter}
                courseFilter={courseFilter}
                setCourseFilter={setCourseFilter}
                userFilter={userFilter}
                setUserFilter={setUserFilter}
                reviews={reviews}
            />

            {/* Reviews Table */}
            <ReviewsTable
                filteredReviews={filteredReviews}
                onEditReview={openEditDialog}
                onDeleteReview={handleDeleteReview}
            />

            {/* Edit Dialog */}
            <EditReviewDialog
                formData={formData}
                setFormData={setFormData}
                onEditReview={handleEditReview}
                onClose={() => setIsEditDialogOpen(false)}
                isUpdating={isUpdating}
                isOpen={isEditDialogOpen}
                setIsOpen={setIsEditDialogOpen}
            />
        </div>
    );
};

export default ReviewsManagementPage;
