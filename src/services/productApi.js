import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.agteach.site",
    baseUrl: "http://localhost:3001",
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProductTopSales: builder.query({
      query: () => ({
        url: "/api/admin/getProductTopSales",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductTopSalesQuery } = productApi;
