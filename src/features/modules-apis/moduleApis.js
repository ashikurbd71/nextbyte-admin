import { apiSlice } from "@/features/api/apiSlice";

export const moduleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new module
        createModule: builder.mutation({
            query: (moduleData) => ({
                url: "/modules",
                method: "POST",
                body: moduleData,
            }),
            providesTags: ["modules", "module-statistics"],
        }),

        // Get all modules
        getModules: builder.query({
            query: (params) => ({
                url: "/modules",
                params,
            }),
            providesTags: ["modules"],
        }),

        // Get module by ID
        getModuleById: builder.query({
            query: (id) => `/modules/${id}`,
            providesTags: (result, error, id) => [{ type: "module", id }],
        }),

        // Update module
        updateModule: builder.mutation({
            query: ({ id, ...moduleData }) => ({
                url: `/modules/${id}`,
                method: "PATCH",
                body: moduleData,
            }),
            providesTags: (result, error, { id }) => [
                "modules",
                { type: "module", id },
                "module-statistics",
            ],
        }),

        // Delete module
        deleteModule: builder.mutation({
            query: (id) => ({
                url: `/modules/${id}`,
                method: "DELETE",
            }),
            providesTags: ["modules", "module-statistics"],
        }),

        // Get module statistics
        getModuleStatistics: builder.query({
            query: () => "/modules/statistics",
            providesTags: ["module-statistics"],
        }),

        // Toggle module active status
        toggleModuleActiveStatus: builder.mutation({
            query: ({ id, isActive }) => ({
                url: `/modules/${id}`,
                method: "PATCH",
                body: { isActive },
            }),
            providesTags: (result, error, { id }) => [
                "modules",
                { type: "module", id },
                "module-statistics",
            ],
        }),

        // Get modules by course ID
        getModulesByCourse: builder.query({
            query: (courseId) => `/modules?courseId=${courseId}`,
            providesTags: (result, error, courseId) => [
                { type: "course-modules", id: courseId },
            ],
        }),
    }),
});

// Export hooks
export const {
    useCreateModuleMutation,
    useGetModulesQuery,
    useGetModuleByIdQuery,
    useUpdateModuleMutation,
    useDeleteModuleMutation,
    useGetModuleStatisticsQuery,
    useToggleModuleActiveStatusMutation,
    useGetModulesByCourseQuery,
} = moduleApiSlice;
