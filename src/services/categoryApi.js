import { create } from "@mui/material/styles/createTransitions";
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
    getCategoryDetail: builder.query({
      query: (id) => ({
        url: `/api/admin/getCategoryDetail/${id}`,
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
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryDetailQuery,
  useCreateCategoryMutation,
} = categoryApi;
