import { apiSlice } from "@/features/api/apiSlice";

export const assignmentSubmissionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all assignment submissions
        getAssignmentSubmissions: builder.query({
            query: (params) => ({
                url: "/assignment-submissions",
                params,
            }),
            providesTags: ["assignment-submissions"],
        }),

        // Get assignment submission by ID
        getAssignmentSubmissionById: builder.query({
            query: (id) => `/assignment-submissions/${id}`,
            providesTags: (result, error, id) => [{ type: "assignment-submission", id }],
        }),

        // Create a new assignment submission
        createAssignmentSubmission: builder.mutation({
            query: (submissionData) => ({
                url: "/assignment-submissions",
                method: "POST",
                body: submissionData,
            }),
            invalidatesTags: ["assignment-submissions", "student-performance"],
        }),

        // Update assignment submission
        updateAssignmentSubmission: builder.mutation({
            query: ({ id, ...submissionData }) => ({
                url: `/assignment-submissions/${id}`,
                method: "POST",
                body: submissionData,
            }),
            invalidatesTags: (result, error, { id }) => [
                "assignment-submissions",
                { type: "assignment-submission", id },
                "student-performance",
            ],
        }),

        // Delete assignment submission
        deleteAssignmentSubmission: builder.mutation({
            query: (id) => ({
                url: `/assignment-submissions/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["assignment-submissions", "student-performance"],
        }),

        // Review assignment submission (update marks, feedback, and status)
        reviewAssignmentSubmission: builder.mutation({
            query: ({ id, reviewData }) => ({
                url: `/assignment-submissions/review/${id}`,
                method: "POST",
                body: reviewData, // { marks, feedback, status }
            }),
            invalidatesTags: (result, error, { id }) => [
                "assignment-submissions",
                { type: "assignment-submission", id },
                "student-performance",
            ],
        }),

        // Get student performance (submissions with statistics)
        getStudentPerformance: builder.query({
            query: (studentId) => `/assignment-submissions/student/${studentId}/performance`,
            providesTags: (result, error, studentId) => [
                { type: "student-performance", id: studentId },
            ],
        }),

        // Get submissions by student ID
        getSubmissionsByStudent: builder.query({
            query: (studentId) => `/assignment-submissions/student/${studentId}`,
            providesTags: (result, error, studentId) => [
                { type: "student-submissions", id: studentId },
            ],
        }),

        // Get submissions by assignment ID
        getSubmissionsByAssignment: builder.query({
            query: (assignmentId) => `/assignment-submissions/assignment/${assignmentId}`,
            providesTags: (result, error, assignmentId) => [
                { type: "assignment-submissions", id: assignmentId },
            ],
        }),

        // Get submissions by status
        getSubmissionsByStatus: builder.query({
            query: (status) => `/assignment-submissions/status/${status}`,
            providesTags: (result, error, status) => [
                { type: "status-submissions", id: status },
            ],
        }),

        // Get pending submissions (for review)
        getPendingSubmissions: builder.query({
            query: () => "/assignment-submissions/pending",
            providesTags: ["pending-submissions"],
        }),

        // Get reviewed submissions
        getReviewedSubmissions: builder.query({
            query: () => "/assignment-submissions/reviewed",
            providesTags: ["reviewed-submissions"],
        }),

        // Get submission statistics
        getSubmissionStatistics: builder.query({
            query: () => "/assignment-submissions/statistics",
            providesTags: ["submission-statistics"],
        }),
    }),
});

// Export hooks
export const {
    useGetAssignmentSubmissionsQuery,
    useGetAssignmentSubmissionByIdQuery,
    useCreateAssignmentSubmissionMutation,
    useUpdateAssignmentSubmissionMutation,
    useDeleteAssignmentSubmissionMutation,
    useReviewAssignmentSubmissionMutation,
    useGetStudentPerformanceQuery,
    useGetSubmissionsByStudentQuery,
    useGetSubmissionsByAssignmentQuery,
    useGetSubmissionsByStatusQuery,
    useGetPendingSubmissionsQuery,
    useGetReviewedSubmissionsQuery,
    useGetSubmissionStatisticsQuery,
} = assignmentSubmissionApiSlice;
