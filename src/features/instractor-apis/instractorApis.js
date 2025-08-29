import { apiSlice } from "../api/apiSlice";

export const instructorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all instructors
        getAllInstructors: builder.query({
            query: () => ({
                url: "/admin",
                method: "GET",
            }),
            providesTags: ["instructors"],
        }),

        // Get instructor by ID
        getInstructorById: builder.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "instructors", id }],
        }),

        // Register new instructor
        registerInstructor: builder.mutation({
            query: (data) => ({
                url: "/admin/register",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["instructors"],
        }),

        // Update instructor
        updateInstructor: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/${id}`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "instructors", id },
                "instructors",
            ],
        }),

        // Delete instructor
        deleteInstructor: builder.mutation({
            query: (id) => ({
                url: `/admin/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["instructors"],
        }),







        // Activate instructor
        activateInstructor: builder.mutation({
            query: (id) => ({
                url: `/admin/activate/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["instructors"],
        }),

        // Deactivate instructor
        deactivateInstructor: builder.mutation({
            query: (id) => ({
                url: `/admin/deactivate/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["instructors"],
        }),

        // Get instructor statistics
        getInstructorStats: builder.query({
            query: () => ({
                url: "/admin/stats",
                method: "GET",
            }),
            providesTags: ["instructorStats"],
        }),

        // Get active instructors
        getActiveInstructors: builder.query({
            query: () => ({
                url: "/admin/active",
                method: "GET",
            }),
            providesTags: ["instructors"],
        }),

        // Get inactive instructors
        getInactiveInstructors: builder.query({
            query: () => ({
                url: "/admin/inactive",
                method: "GET",
            }),
            providesTags: ["instructors"],
        }),

    }),
});

export const {
    useGetAllInstructorsQuery,
    useGetInstructorByIdQuery,
    useGetInstructorStatsQuery,
    useGetActiveInstructorsQuery,
    useGetInactiveInstructorsQuery,
    useRegisterInstructorMutation,
    useUpdateInstructorMutation,
    useDeleteInstructorMutation,
    useActivateInstructorMutation,
    useDeactivateInstructorMutation,
} = instructorApiSlice;

