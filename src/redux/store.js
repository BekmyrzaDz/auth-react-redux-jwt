import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth";
import messageReducer from "./features/auth/message";
import usersSlice from "./features/users/usersSlice";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  user: usersSlice,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
