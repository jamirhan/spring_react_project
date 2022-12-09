import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      username,
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

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

function authHeader(): HeadersInit {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user && user.accessToken) {
    console.log("user", user);
    return {
      Authorization: "Bearer " + user.accessToken,
    };
  } else {
    console.log("no user");
    return {};
  }
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  authHeader,
};

export default AuthService;
