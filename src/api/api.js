import axios from "axios";
import authHeader from "../services/auth-header";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
