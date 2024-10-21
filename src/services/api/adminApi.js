import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//  https://api.agteach.site
//  http://localhost:3001

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.agteach.site",
    // baseUrl: "http://localhost:3001",
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
    getAllCustomer : builder.query({
      query: () => ({
        url: "/api/admin/getAllCustomers",
        method: "GET",
      })
    })
  }),
});

export const {
  useGetInfoQuery,
  useUpdatePasswordMutation,
  useGetSalesOverviewQuery,
  useGetAllCustomerQuery,
} = adminApi;
