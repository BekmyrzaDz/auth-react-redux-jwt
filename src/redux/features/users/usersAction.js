import { createAsyncThunk } from "@reduxjs/toolkit";
import eventBus from "../../../common/EventBus";
import userService from "../../../services/usersService";
import { setMessage } from "../auth/message";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (userId, thunkAPI) => {
    try {
      const response = await userService.getUsersBoard();
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      console.error(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));

      if (error.response && error.response.status === 401) {
        eventBus.dispatch("logout");
      }

      return thunkAPI.rejectWithValue();
    }
  }
);
