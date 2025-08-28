import { apiSlice } from "../api/apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Send notification to all users
        sendNotificationToAllUsers: builder.mutation({
            query: (data) => ({
                url: "/notifications/send-to-all-users",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["notifications"],
        }),

        // Get notification history
        getNotificationHistory: builder.query({
            query: (params) => ({
                url: "/notifications",
                method: "GET",
                params,
            }),
            providesTags: ["notifications"],
        }),

        // Update notification (mark as read, mark all as read)
        updateNotification: builder.mutation({
            query: (data) => ({
                url: "/notifications/update",
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["notifications"],
        }),

        // Get notification statistics
        getNotificationStats: builder.query({
            query: () => ({
                url: "/notifications/stats",
                method: "GET",
            }),
            providesTags: ["notifications"],
        }),

        // Send notification to specific users
        sendNotificationToUsers: builder.mutation({
            query: (data) => ({
                url: "/notifications/send-to-users",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
            invalidatesTags: ["notifications"],
        }),

        // Delete notification
        deleteNotification: builder.mutation({
            query: (id) => ({
                url: `/notifications/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["notifications"],
        }),
    }),
});

export const {
    useSendNotificationToAllUsersMutation,
    useGetNotificationHistoryQuery,
    useUpdateNotificationMutation,
    useGetNotificationStatsQuery,
    useSendNotificationToUsersMutation,
    useDeleteNotificationMutation,
} = notificationApiSlice;
