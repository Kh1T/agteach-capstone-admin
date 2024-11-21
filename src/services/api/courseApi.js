import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/apiConstant";
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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
