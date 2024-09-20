import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//  https://api.agteach.site
//  http://localhost:3001

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getInfo: builder.query({
      query: () => ({
        url: "/api/admin/getAdminInfo",
        method: "GET",
      }),
    }),

    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/api/users/updatePassword",
        method: "PATCH",
        body: passwordData,
      }),
    }),

  }),
});

export const { useGetInfoQuery, useUpdatePasswordMutation } = adminApi;
