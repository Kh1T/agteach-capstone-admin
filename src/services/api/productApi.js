import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/apiConstant";
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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
