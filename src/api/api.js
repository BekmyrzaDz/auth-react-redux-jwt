import axios from "axios";
import authHeader from "../services/authHeader";
// console.log(authHeader);

const user = JSON.parse(localStorage.getItem("user"));
// console.log(user.accessToken);

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${user.accessToken}`,
    // {authHeader()},
  },
});
