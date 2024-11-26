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
      /**
       * Query to get all instructors
       * @param {string} [filter=""] - filter the result either by 'isApproved' or 'isRejected' if empty will get all instructors
       * @returns {import("reduxjs-toolkit").BaseQueryApi}
       */
      query: (filter = '') => {
        console.log(filter)
        let isApproved = '';
        let isRejected = '';
        if (filter === 0 || filter === '') {
          filter = "";
        } else if (filter === 10) {
          isApproved = false;
          isRejected = false
        } else if (filter === 20) {
          isApproved = true;
          isRejected = false
        } else if (filter === 30) {
          isRejected = true;
          isApproved = false
        }      
        return {
          url: `/api/admin/getAllInstructors?isApproved=${isApproved}&isRejected=${isRejected}`,
          method: "GET",
        }        
      },
      providesTags: ["Instructor"],
    }),

    getInstructorsCount: builder.query({
      query: () => ({
        url: "/api/admin/getAllInstructors",
        method: "GET",
      }),
      providesTags: ["Instructor"],
    }),

    getInstructorDetail: builder.query({
      /**
       * Query to get instructor detail
       * @param {string} id - Instructor id
       * @returns {import("reduxjs-toolkit").BaseQueryApi}
       */
      query: (id) => ({
        url: `/api/instructor/getInstructorDetail/${id}`,
        method: "GET",
      }),
      providesTags: ["Instructor"],
    }),
    updateVerifyInstructor: builder.mutation({
      /**
       * Verify an instructor
       * @param {object} data - Data to send to the server
       * @param {string} data.id - Instructor id
       * @param {boolean} data.isApproved - Whether to approve or reject the instructor
       * @returns {import("reduxjs-toolkit").BaseQueryApi}
       */
      query: (data) => ({
        url: `/api/admin/verifyInstructor/${data.id}`,
        method: "PATCH",
        body: data.isApproved ? { isApproved: true } : { isRejected: true },
      }),
      invalidatesTags: ["Instructor"],
    }),
  }),

});

export const { useGetAllInstructorsQuery, useGetInstructorsCountQuery, useGetInstructorDetailQuery, useUpdateVerifyInstructorMutation } =
  instructorApi;
