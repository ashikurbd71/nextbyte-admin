import { apiSlice } from "@/features/api/apiSlice";

export const assignmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create a new assignment
        createAssignment: builder.mutation({
            query: (assignmentData) => ({
                url: "/assignment",
                method: "POST",
                body: assignmentData,
            }),
            invalidatesTags: ["assignments", "assignment-statistics"],
        }),

        // Get all assignments
        getAssignments: builder.query({
            query: (params) => ({
                url: "/assignment",
                params,
            }),
            providesTags: ["assignments"],
        }),

        // Get assignment by ID
        getAssignmentById: builder.query({
            query: (id) => `/assignment/${id}`,
            providesTags: (result, error, id) => [{ type: "assignment", id }],
        }),

        // Update assignment
        updateAssignment: builder.mutation({
            query: ({ id, ...assignmentData }) => ({
                url: `/assignment/${id}`,
                method: "PATCH",
                body: assignmentData,
            }),
            invalidatesTags: (result, error, { id }) => [
                "assignments",
                { type: "assignment", id },
                "assignment-statistics",
            ],
        }),

        // Delete assignment
        deleteAssignment: builder.mutation({
            query: (id) => ({
                url: `/assignment/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["assignments", "assignment-statistics"],
        }),

        // Toggle assignment active status
        toggleAssignmentActiveStatus: builder.mutation({
            query: (id) => ({
                url: `/assignment/toggle-active/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: (result, error, id) => [
                "assignments",
                { type: "assignment", id },
                "assignment-statistics",
            ],
        }),

        // Get assignments by module ID
        getAssignmentsByModule: builder.query({
            query: (moduleId) => `/assignment?moduleId=${moduleId}`,
            providesTags: (result, error, moduleId) => [
                { type: "module-assignments", id: moduleId },
            ],
        }),

        // Get assignment statistics
        getAssignmentStatistics: builder.query({
            query: () => "/assignment/statistics/overall",
            providesTags: ["assignment-statistics"],
        }),
    }),
});

// Export hooks
export const {
    useCreateAssignmentMutation,
    useGetAssignmentsQuery,
    useGetAssignmentByIdQuery,
    useUpdateAssignmentMutation,
    useDeleteAssignmentMutation,
    useToggleAssignmentActiveStatusMutation,
    useGetAssignmentsByModuleQuery,
    useGetAssignmentStatisticsQuery,
} = assignmentApiSlice;
