import { api } from "../api/api";

const register = (email, password, name, age) => {
  return api.post("/signup", {
    email,
    password,
    name,
    age,
  });
};

const login = (email, password) => {
  return api
    .post("/signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
