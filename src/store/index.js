import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi.js";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})