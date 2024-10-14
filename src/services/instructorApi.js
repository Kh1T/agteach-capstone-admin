import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
        url: "/api/instructor/searchData?name=",
        method: "GET",
      }),
      providesTags: ["Instructor"],
    }),
  }),
});

export const { useGetAllInstructorsQuery } = instructorApi