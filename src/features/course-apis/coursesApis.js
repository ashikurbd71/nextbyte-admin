import { apiSlice } from "@/features/api/apiSlice";


export const courseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new course
        createCourse: builder.mutation({
            query: (courseData) => ({
                url: "/course",
                method: "POST",
                body: courseData,
            }),
            providesTags: ["courses", "course-statistics"],
        }),

        // Get all courses
        getCourses: builder.query({
            query: (params) => ({
                url: "/course",
                params,
            }),
            providesTags: ["courses"],
        }),

        // Get course by ID
        getCourseById: builder.query({
            query: (id) => `/course/${id}`,
            providesTags: (result, error, id) => [{ type: "course", id }],
        }),

        // Update course
        updateCourse: builder.mutation({
            query: ({ id, ...courseData }) => ({
                url: `/course/${id}`,
                method: "PATCH",
                body: courseData,
            }),
            providesTags: (result, error, { id }) => [
                "courses",
                { type: "course", id },
                "course-statistics",
            ],
        }),

        // Delete course
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/course/${id}`,
                method: "DELETE",
            }),
            providesTags: ["courses", "course-statistics"],
        }),

        // Get course statistics
        getCourseStatistics: builder.query({
            query: () => "/course/statistics",
            providesTags: ["course-statistics"],
        }),

        // Enroll student in course
        enrollStudent: builder.mutation({
            query: ({ courseId, studentId }) => ({
                url: `/course/${courseId}/enroll/${studentId}`,
                method: "POST",
            }),
            providesTags: ["courses", "course-statistics"],
        }),





        // Get enrolled students for a course
        getEnrolledStudents: builder.query({
            query: (courseId) => `/course/${courseId}/enrollments`,
            providesTags: (result, error, courseId) => [
                { type: "course-enrollments", id: courseId },
            ],
        }),

        // Publish/Unpublish course
        toggleCourseStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/course/${id}`,
                method: "PATCH",
                body: { isPublished: status === "published" },
            }),
            providesTags: (result, error, { id }) => [
                "courses",
                { type: "course", id },
                "course-statistics",
            ],
        }),

        // Toggle course active status
        toggleCourseActiveStatus: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `/course/${id}`,
                method: "PATCH",
                body: { isActive },
            }),
            providesTags: (result, error, { id }) => [
                "courses",
                { type: "course", id },
                "course-statistics",
            ],
        }),

        // Toggle course public status
        toggleCoursePublicStatus: builder.mutation({
            query: ({ id, isPublic }) => ({
                url: `/course/${id}`,
                method: "PATCH",
                body: { isPublic },
            }),
            providesTags: (result, error, { id }) => [
                "courses",
                { type: "course", id },
                "course-statistics",
            ],
        }),

        // Send email to course enrollments
        sendEmailToEnrollments: builder.mutation({
            query: ({ courseId, emailData }) => ({
                url: `/notifications/send-to-course-students/${courseId}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: emailData,
            }),
            providesTags: (result, error, { courseId }) => [
                { type: "course-enrollments", id: courseId },
            ],
        }),

        // Get course enrollments with detailed information
        getCourseEnrollmentsDetailed: builder.query({
            query: (courseId) => `/course/${courseId}/enrollments/detailed`,
            providesTags: (result, error, courseId) => [
                { type: "course-enrollments", id: courseId },
            ],
        }),

        // Send individual email to student
        sendEmailToStudent: builder.mutation({
            query: ({ studentId, courseId, emailData }) => ({
                url: `/notifications/send-to-course-student/${courseId}/${studentId}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: emailData,
            }),
            providesTags: (result, error, { studentId }) => [
                { type: "userEnrollments", id: studentId },
            ],
        }),
    }),
});

// Export hooks
export const {
    useCreateCourseMutation,
    useGetCoursesQuery,
    useGetCourseByIdQuery,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useGetCourseStatisticsQuery,
    useEnrollStudentMutation,
    useGetEnrolledStudentsQuery,
    useToggleCourseStatusMutation,
    useToggleCourseActiveStatusMutation,
    useToggleCoursePublicStatusMutation,
    useSendEmailToEnrollmentsMutation,
    useGetCourseEnrollmentsDetailedQuery,
    useSendEmailToStudentMutation,
} = courseApiSlice;

