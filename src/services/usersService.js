import { api } from "../api/api";
import authHeader from "./auth-header";

const getUsersBoard = () => {
  return api.get("/users", { headers: authHeader() });
};

const getMeBoard = () => {
  return api.get("/users/me", { headers: authHeader() });
};

const userService = {
  getUsersBoard,
  getMeBoard,
};

export default userService;
