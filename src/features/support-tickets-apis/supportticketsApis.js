import { apiSlice } from "@/features/api/apiSlice";

export const supportTicketsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all support tickets
        getSupportTickets: builder.query({
            query: (params) => ({
                url: "/tickets",
                params,
            }),
            providesTags: ["support-tickets"],
        }),

        // Get support ticket by ID
        getSupportTicketById: builder.query({
            query: (id) => `/tickets/${id}`,
            providesTags: (result, error, id) => [{ type: "support-ticket", id }],
        }),

        // Create new support ticket
        createSupportTicket: builder.mutation({
            query: (ticketData) => ({
                url: "/tickets",
                method: "POST",
                body: ticketData,
            }),
            invalidatesTags: ["support-tickets"],
        }),

        // Update support ticket
        updateSupportTicket: builder.mutation({
            query: ({ id, ...ticketData }) => ({
                url: `/tickets/${id}`,
                method: "PATCH",
                body: ticketData,
            }),
            invalidatesTags: (result, error, { id }) => [
                "support-tickets",
                { type: "support-ticket", id },
            ],
        }),

        // Delete support ticket
        deleteSupportTicket: builder.mutation({
            query: (id) => ({
                url: `/tickets/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["support-tickets"],
        }),

        // Assign ticket to mentor
        assignTicket: builder.mutation({
            query: ({ id, mentorId, meetLink }) => ({
                url: `/tickets/${id}/assign`,
                method: "PATCH",
                body: { mentorId, meetLink },
            }),
            invalidatesTags: (result, error, { id }) => [
                "support-tickets",
                { type: "support-ticket", id },
            ],
        }),

        // Close ticket
        closeTicket: builder.mutation({
            query: (id) => ({
                url: `/tickets/${id}/close`,
                method: "PATCH",
            }),
            invalidatesTags: (result, error, id) => [
                "support-tickets",
                { type: "support-ticket", id },
            ],
        }),

        // Get support ticket statistics
        getSupportTicketStats: builder.query({
            query: () => "/tickets/statistics/overview",
            providesTags: ["support-ticket-statistics"],
        }),

        // Get mentors for assignment (using admin API)
        getMentors: builder.query({
            query: () => "/admin",
            providesTags: ["mentors"],
        }),
    }),
});

// Export hooks
export const {
    useGetSupportTicketsQuery,
    useGetSupportTicketByIdQuery,
    useCreateSupportTicketMutation,
    useUpdateSupportTicketMutation,
    useDeleteSupportTicketMutation,
    useAssignTicketMutation,
    useCloseTicketMutation,
    useGetSupportTicketStatsQuery,
    useGetMentorsQuery,
} = supportTicketsApiSlice;
