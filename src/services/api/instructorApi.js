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
      query: (filter='') => ({
        url: `/api/admin/getAllInstructors?${filter && filter + '=true'}`,
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
    updateVerifyInstructor: builder.mutation({
      query: (data) => ({
        url: `/api/admin/verifyInstructor/${data.id}`,
        method: "PATCH",
        body: data.isApproved ? { isApproved: true } : { isRejected: true },
      }),
      invalidatesTags: ["Instructor"],
    }),
  }),

});

export const { useGetAllInstructorsQuery, useGetInstructorDetailQuery, useUpdateVerifyInstructorMutation } =
  instructorApi;
