import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all users
        getAllUsers: builder.query({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            providesTags: ["users"],
        }),

        // Get user by ID
        getUserById: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "users", id }],
        }),

        // Register new user
        registerUser: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["users"],
        }),

        // Update user
        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "users", id },
                "users",
            ],
        }),

        // Delete user
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["users"],
        }),

        // Get active users
        getActiveUsers: builder.query({
            query: () => ({
                url: "/users/active/list",
                method: "GET",
            }),
            providesTags: ["users"],
        }),

        // Get banned users
        getBannedUsers: builder.query({
            query: () => ({
                url: "/users/banned/list",
                method: "GET",
            }),
            providesTags: ["users"],
        }),

        // Get user statistics
        getUserStats: builder.query({
            query: () => ({
                url: "/users/stats/overview",
                method: "GET",
            }),
            providesTags: ["users"],
        }),

        // Ban user
        banUser: builder.mutation({
            query: ({ id, reason }) => ({
                url: `/users/ban/${id}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: { reason },
            }),
            invalidatesTags: ["users"],
        }),

        // Unban user
        unbanUser: builder.mutation({
            query: (id) => ({
                url: `/users/unban/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["users"],
        }),

        // Activate user
        activateUser: builder.mutation({
            query: (id) => ({
                url: `/users/activate/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["users"],
        }),

        // Deactivate user
        deactivateUser: builder.mutation({
            query: (id) => ({
                url: `/users/deactivate/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["users"],
        }),

        // Verify user
        verifyUser: builder.mutation({
            query: (id) => ({
                url: `/users/verify/${id}`,
                method: "POST",
            }),
            invalidatesTags: ["users"],
        }),

        // Get user enrollment performance
        getUserEnrollmentPerformance: builder.query({
            query: (userId) => ({
                url: `/enrollments/performance/student/${userId}`,
                method: "GET",
            }),
            providesTags: (result, error, userId) => [{ type: "userEnrollments", id: userId }],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useRegisterUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetActiveUsersQuery,
    useGetBannedUsersQuery,
    useGetUserStatsQuery,
    useBanUserMutation,
    useUnbanUserMutation,
    useActivateUserMutation,
    useDeactivateUserMutation,
    useVerifyUserMutation,
    useGetUserEnrollmentPerformanceQuery,
} = userApiSlice;
