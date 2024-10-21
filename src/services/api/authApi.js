import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "/api/users/login",
        method: "POST",
        body: loginData,
        headers: { "X-Frontend-URL": window.location },
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
      }),
    }),

    isLogin: builder.query({
      query: () => ({
        url: "/api/users/isLoginedIn",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useIsLoginQuery } = authApi;
