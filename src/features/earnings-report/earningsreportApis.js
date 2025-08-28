import { apiSlice } from "../api/apiSlice";

export const earningsReportApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEarningsReport: builder.query({
            query: ({ startDate, endDate }) => ({
                url: "/statistics/earnings-report",
                method: "GET",
                params: {
                    startDate,
                    endDate,
                },
            }),
            providesTags: ["earnings-report"],
        }),





    }),
});

export const {
    useGetEarningsReportQuery,

} = earningsReportApi;
