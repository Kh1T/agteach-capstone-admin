import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.agteach.site",
    baseUrl: "http://localhost:3001",
    credentials: "include",
  }),
  tagTypes: ["Course"],
  endpoints: (builder) => ({
    getCourseTopSales: builder.query({
      query: () => ({
        url: "/api/admin/getCourseTopSales",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
  }),
});

export const { useGetCourseTopSalesQuery } = courseApi;