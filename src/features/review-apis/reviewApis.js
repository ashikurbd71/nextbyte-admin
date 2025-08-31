import { apiSlice } from "@/features/api/apiSlice";

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all reviews
        getAllReviews: builder.query({
            query: () => ({
                url: "/reviews",
                method: "GET",
            }),
            providesTags: ["reviews"],
        }),

        // Get single review by ID
        getSingleReview: builder.query({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "review", id }],
        }),

        // Create new review
        createReview: builder.mutation({
            query: (reviewData) => ({
                url: "/reviews",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: reviewData,
            }),
            invalidatesTags: ["reviews"],
        }),

        // Update review
        updateReview: builder.mutation({
            query: ({ id, ...reviewData }) => ({
                url: `/reviews/${id}`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: reviewData,
            }),
            invalidatesTags: (result, error, { id }) => [
                "reviews",
                { type: "review", id },
            ],
        }),

        // Delete review
        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["reviews"],
        }),

        // Get reviews by course ID
        getReviewsByCourseId: builder.query({
            query: (courseId) => ({
                url: `/reviews/course/${courseId}`,
                method: "GET",
            }),
            providesTags: (result, error, courseId) => [
                { type: "course-reviews", id: courseId },
            ],
        }),

        // Get reviews by user ID
        getReviewsByUserId: builder.query({
            query: (userId) => ({
                url: `/reviews/user/${userId}`,
                method: "GET",
            }),
            providesTags: (result, error, userId) => [
                { type: "user-reviews", id: userId },
            ],
        }),

        // Get review statistics
        getReviewStatistics: builder.query({
            query: () => ({
                url: "/reviews/statistics",
                method: "GET",
            }),
            providesTags: ["review-statistics"],
        }),

        // Toggle review active status
        toggleReviewStatus: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `/reviews/${id}`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: { isActive },
            }),
            invalidatesTags: (result, error, { id }) => [
                "reviews",
                { type: "review", id },
                "review-statistics",
            ],
        }),
    }),
});

// Export hooks
export const {
    useGetAllReviewsQuery,
    useGetSingleReviewQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useGetReviewsByCourseIdQuery,
    useGetReviewsByUserIdQuery,
    useGetReviewStatisticsQuery,
    useToggleReviewStatusMutation,
} = reviewApiSlice;
