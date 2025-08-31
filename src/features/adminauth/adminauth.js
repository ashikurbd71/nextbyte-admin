import { apiSlice } from "../api/apiSlice";

export const adminAuthApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => {
                return {
                    url: `/admin/login`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                    body: data,
                    credentials: "include",
                };
            },
            invalidatesTags: ["admin-auth", "admin-profile"],
        }),

        getAdminProfile: builder.query({
            query: (id) => ({
                url: `/admin/${id}`,
                method: "GET",
            }),
            providesTags: ["admin-profile"],
        }),

        updateAdminProfile: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/admin/${id}`,
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                    body: data,
                };
            },
            invalidatesTags: ["admin-profile"],
        }),

        changeAdminPassword: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/admin/change-password/${id}`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                    body: data,
                };
            },
        }),
    }),
});

export const {
    useAdminLoginMutation,
    useGetAdminProfileQuery,
    useUpdateAdminProfileMutation,
    useChangeAdminPasswordMutation,
} = adminAuthApiSlice;
