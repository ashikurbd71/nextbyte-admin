import { apiSlice } from "../api/apiSlice";


export const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: "/statistics/dashboard",
                method: "GET",
            }),
            providesTags: ["dashboard"],
        }),
    }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
