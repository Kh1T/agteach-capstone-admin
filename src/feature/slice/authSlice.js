import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkLoginStatus: (state, action) => {
      state.isAuthenticated = action.payload;
      state.isLoading = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
    }
  },
});

export const { checkLoginStatus, startLoading } = authSlice.actions;
export default authSlice.reducer;
