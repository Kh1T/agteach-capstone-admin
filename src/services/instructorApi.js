import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get } from "react-hook-form";

export const instructorApi = createApi({
  reducerPath: "instructorApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.agteach.site",
    baseUrl: "http://localhost:3001",
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

export const { useGetAllInstructorsQuery , useGetInstructorDetailQuery } = instructorApi