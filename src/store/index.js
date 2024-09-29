import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/api/authApi.js";
import { adminApi } from "../services/api/adminApi.js";
import authSlice from "../feature/slice/authSlice.js";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, adminApi.middleware),
});
