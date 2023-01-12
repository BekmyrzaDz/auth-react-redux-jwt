import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../auth/message";

import authService from "../../../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, name, age }, thunkAPI) => {
    try {
      const response = await authService.register(email, password, name, age);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login(email, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// export const refreshToken = (accessToken) => (dispatch) => {
//   dispatch({
//     payload: accessToken,
//   })
// }

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
