import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi.js";
import { adminApi } from "./api/adminApi.js";
import authSlice from "./slice/authSlice.js";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, adminApi.middleware),
});
