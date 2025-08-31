import { apiSlice } from "@/features/api/apiSlice";

export const lessonApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new lesson
        createLesson: builder.mutation({
            query: (lessonData) => ({
                url: "/lessons",
                method: "POST",
                body: lessonData,
            }),
            providesTags: ["lessons", "lesson-statistics"],
        }),

        // Get all lessons
        getLessons: builder.query({
            query: (params) => ({
                url: "/lessons",
                params,
            }),
            providesTags: ["lessons"],
        }),

        // Get lesson by ID
        getLessonById: builder.query({
            query: (id) => `/lessons/${id}`,
            providesTags: (result, error, id) => [{ type: "lesson", id }],
        }),

        // Update lesson
        updateLesson: builder.mutation({
            query: ({ id, ...lessonData }) => ({
                url: `/lessons/${id}`,
                method: "PATCH",
                body: lessonData,
            }),
            providesTags: (result, error, { id }) => [
                "lessons",
                { type: "lesson", id },
                "lesson-statistics",
            ],
        }),

        // Delete lesson
        deleteLesson: builder.mutation({
            query: (id) => ({
                url: `/lessons/${id}`,
                method: "DELETE",
            }),
            providesTags: ["lessons", "lesson-statistics"],
        }),

        // Get lesson statistics overview
        getLessonStatistics: builder.query({
            query: () => "/lessons/statistics/overview",
            providesTags: ["lesson-statistics"],
        }),

        // Toggle lesson active status
        toggleLessonActiveStatus: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `/lessons/${id}`,
                method: "PATCH",
                body: { isActive },
            }),
            providesTags: (result, error, { id }) => [
                "lessons",
                { type: "lesson", id },
                "lesson-statistics",
            ],
        }),

        // Get lessons by module ID
        getLessonsByModule: builder.query({
            query: (moduleId) => `/lessons?moduleId=${moduleId}`,
            providesTags: (result, error, moduleId) => [
                { type: "module-lessons", id: moduleId },
            ],
        }),

        // Toggle lesson preview status
        toggleLessonPreviewStatus: builder.mutation({
            query: ({ id, isPreview }) => ({
                url: `/lessons/${id}`,
                method: "PATCH",
                body: { isPreview },
            }),
            providesTags: (result, error, { id }) => [
                "lessons",
                { type: "lesson", id },
                "lesson-statistics",
            ],
        }),
    }),
});

// Export hooks
export const {
    useCreateLessonMutation,
    useGetLessonsQuery,
    useGetLessonByIdQuery,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
    useGetLessonStatisticsQuery,
    useToggleLessonActiveStatusMutation,
    useGetLessonsByModuleQuery,
    useToggleLessonPreviewStatusMutation,
} = lessonApiSlice;
