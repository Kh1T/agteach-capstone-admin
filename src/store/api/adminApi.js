import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.agteach.site",
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
