import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAction";

const initialState = {
  isLoading: null,
  isSuccess: null,
  message: null,
  error: null,
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = "success";
      state.users = action.payload;
      state.isSuccess = true;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;
