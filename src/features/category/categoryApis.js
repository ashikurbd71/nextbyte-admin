import { apiSlice } from "../api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get all categories
        getCategories: builder.query({
            query: () => ({
                url: "/categoris",
                method: "GET",
            }),
            providesTags: ["categories"],
        }),

        // Create a new category
        createCategory: builder.mutation({
            query: (categoryData) => ({
                url: "/categoris",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: { name: categoryData.name }, // Only send name field
            }),
            invalidatesTags: ["categories"],
        }),

        // Get category by ID
        getCategoryById: builder.query({
            query: (id) => ({
                url: `/categoris/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "category", id }],
        }),

        // Update category
        updateCategory: builder.mutation({
            query: ({ id, ...categoryData }) => ({
                url: `/categoris/${id}`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: { name: categoryData.name }, // Only send name field
            }),
            invalidatesTags: (result, error, { id }) => [
                "categories",
                { type: "category", id },
            ],
        }),

        // Delete category
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categoris/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["categories"],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApiSlice;
