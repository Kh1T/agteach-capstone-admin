import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/api/authApi.js";
import { adminApi } from "../services/api/adminApi.js";
import { instructorApi } from "../services/instructorApi.js";
import authSlice from "../feature/slice/authSlice.js";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [instructorApi.reducerPath]: instructorApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      adminApi.middleware,
      instructorApi.middleware
    ),
});
