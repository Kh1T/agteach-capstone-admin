import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.agteach.site",
    baseUrl: "http://localhost:3001",
    credentials: "include",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/api/admin/getAllCategories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `/api/admin/getCategory/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/api/admin/createCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/admin/updateCategory/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/admin/deleteCategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    searchCategory: builder.query({
      query: ({ name, order }) => {
        let url = "/api/admin/searchCategory?name=";
        if (name) {
          url = url + `?name=${name}`;
        }
        if (order) {
          url = url + `?order=${order}`;
        }
        return {
          url: url,
          method: "GET",
        };
      },
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useSearchCategoryQuery
} = categoryApi;
