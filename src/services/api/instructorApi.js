import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/apiConstant";
export const instructorApi = createApi({
  reducerPath: "instructorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Instructor"],
  endpoints: (builder) => ({
    getAllInstructors: builder.query({
      query: () => ({
        url: "/api/admin/getAllInstructors",
        // url: "/api/course/getRecommendCourse/:",
        method: "GET",
      }),
      providesTags: ["Instructor"],
    }),
    getInstructorDetail: builder.query({
      query: (id) => ({
        url: `/api/instructor/getInstructorDetail/${id}`,
        method: "GET",
      }),
      providesTags: ["Instructor"],
    }),
  }),
});

export const { useGetAllInstructorsQuery, useGetInstructorDetailQuery } =
  instructorApi;
