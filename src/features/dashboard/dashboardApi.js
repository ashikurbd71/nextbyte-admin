import { apiSlice } from "../api/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: "/statistics/dashboard",
                method: "GET",
            }),
            providesTags: ["dashboard"],
            transformResponse: (response) => {
                // Transform the response to match the expected structure
                return {
                    earnings: response.earnings,
                    enrollments: response.enrollments,
                    payments: response.payments,
                    users: response.users,
                    courses: response.courses,
                    recentActivity: response.recentActivity,
                };
            },
        }),
    }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
