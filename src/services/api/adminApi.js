import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//  https://api.agteach.site
//  http://localhost:3001

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getInfo: builder.query({
      query: () => ({
        url: "/api/admin/getAdminInfo",
        method: "GET",
      }),
    }),

    getSalesOverview: builder.query({
      query: () => ({
        url: "/api/admin/getSalesOverview",
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

export const {
  useGetInfoQuery,
  useUpdatePasswordMutation,
  useGetSalesOverviewQuery,
} = adminApi;
