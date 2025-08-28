import { apiSlice } from '../api/apiSlice';

export const enrollmentReportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEnrollmentReport: builder.query({
            query: ({ startDate, endDate }) => ({
                url: `/statistics/enrollment-report`,
                method: 'GET',
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            }),
            transformResponse: (response) => {
                return {
                    totalEnrollments: response.totalEnrollments || 0,
                    completedEnrollments: response.completedEnrollments || 0,
                    activeEnrollments: response.activeEnrollments || 0,
                    completionRate: response.completionRate || 0,
                    enrollments: response.enrollments || [],
                    dateRange: response.dateRange || {
                        startDate: new Date().toISOString(),
                        endDate: new Date().toISOString()
                    }
                };
            },
            providesTags: ['EnrollmentReport']
        }),

        // Get enrollment report with default date range (last 30 days)
        getEnrollmentReportDefault: builder.query({
            query: () => {
                const endDate = new Date();
                const startDate = new Date();
                startDate.setDate(startDate.getDate() - 30);

                return {
                    url: `/statistics/enrollment-report`,
                    method: 'GET',
                    params: {
                        startDate: startDate.toISOString().split('T')[0],
                        endDate: endDate.toISOString().split('T')[0]
                    }
                };
            },
            transformResponse: (response) => {
                return {
                    totalEnrollments: response.totalEnrollments || 0,
                    completedEnrollments: response.completedEnrollments || 0,
                    activeEnrollments: response.activeEnrollments || 0,
                    completionRate: response.completionRate || 0,
                    enrollments: response.enrollments || [],
                    dateRange: response.dateRange || {
                        startDate: new Date().toISOString(),
                        endDate: new Date().toISOString()
                    }
                };
            },
            providesTags: ['EnrollmentReport']
        })
    })
});

export const {
    useGetEnrollmentReportQuery,
    useGetEnrollmentReportDefaultQuery
} = enrollmentReportApiSlice;
