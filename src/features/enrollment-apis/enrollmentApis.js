import { apiSlice } from "@/features/api/apiSlice";

export const enrollmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all enrollments
        getAllEnrollments: builder.query({
            query: (params) => ({
                url: "/enrollments",
                params,
            }),
            providesTags: ["enrollments"],
        }),

        // Get enrollment by ID
        getEnrollmentById: builder.query({
            query: (id) => `/enrollments/${id}`,
            providesTags: (result, error, id) => [{ type: "enrollment", id }],
        }),

        // Create manual payment enrollment
        createManualPayment: builder.mutation({
            query: (enrollmentData) => ({
                url: "/enrollments",
                method: "POST",
                body: enrollmentData,
            }),
            invalidatesTags: ["enrollments", "enrollment-statistics"],
        }),

        // Update enrollment
        updateEnrollment: builder.mutation({
            query: ({ id, ...enrollmentData }) => ({
                url: `/enrollments/${id}`,
                method: "PATCH",
                body: enrollmentData,
            }),
            invalidatesTags: (result, error, { id }) => [
                "enrollments",
                { type: "enrollment", id },
                "enrollment-statistics",
            ],
        }),

        // Delete enrollment
        deleteEnrollment: builder.mutation({
            query: (id) => ({
                url: `/enrollments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["enrollments", "enrollment-statistics"],
        }),

        // Get enrollment statistics
        getEnrollmentStatistics: builder.query({
            query: () => "/enrollments/statistics",
            providesTags: ["enrollment-statistics"],
        }),

        // Get enrollments by student ID
        getEnrollmentsByStudent: builder.query({
            query: (studentId) => `/enrollments/student/${studentId}`,
            providesTags: (result, error, studentId) => [
                { type: "student-enrollments", id: studentId },
            ],
        }),

        // Get enrollments by course ID
        getEnrollmentsByCourse: builder.query({
            query: (courseId) => `/enrollments/course/${courseId}`,
            providesTags: (result, error, courseId) => [
                { type: "course-enrollments", id: courseId },
            ],
        }),

        // Update enrollment status
        updateEnrollmentStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/enrollments/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => [
                "enrollments",
                { type: "enrollment", id },
                "enrollment-statistics",
            ],
        }),

        // Update payment status
        updatePaymentStatus: builder.mutation({
            query: ({ id, paymentStatus, paymentData }) => ({
                url: `/enrollments/${id}/payment`,
                method: "PATCH",
                body: { paymentStatus, ...paymentData },
            }),
            invalidatesTags: (result, error, { id }) => [
                "enrollments",
                { type: "enrollment", id },
                "enrollment-statistics",
            ],
        }),

        // Get enrollment progress
        getEnrollmentProgress: builder.query({
            query: (enrollmentId) => `/enrollments/${enrollmentId}/progress`,
            providesTags: (result, error, enrollmentId) => [
                { type: "enrollment-progress", id: enrollmentId },
            ],
        }),

        // Update enrollment progress
        updateEnrollmentProgress: builder.mutation({
            query: ({ id, progress }) => ({
                url: `/enrollments/${id}/progress`,
                method: "PATCH",
                body: { progress },
            }),
            invalidatesTags: (result, error, { id }) => [
                "enrollments",
                { type: "enrollment", id },
                { type: "enrollment-progress", id },
                "enrollment-statistics",
            ],
        }),

        // Get course leaderboard
        getCourseLeaderboard: builder.query({
            query: (courseId) => `/enrollments/course/leaderboard/${courseId}`,
            providesTags: (result, error, courseId) => [
                { type: "course-leaderboard", id: courseId },
            ],
        }),
    }),
});

export const {
    useGetAllEnrollmentsQuery,
    useGetEnrollmentByIdQuery,
    useCreateManualPaymentMutation,
    useUpdateEnrollmentMutation,
    useDeleteEnrollmentMutation,
    useGetEnrollmentStatisticsQuery,
    useGetEnrollmentsByStudentQuery,
    useGetEnrollmentsByCourseQuery,
    useUpdateEnrollmentStatusMutation,
    useUpdatePaymentStatusMutation,
    useGetEnrollmentProgressQuery,
    useUpdateEnrollmentProgressMutation,
    useGetCourseLeaderboardQuery,
} = enrollmentApiSlice;
