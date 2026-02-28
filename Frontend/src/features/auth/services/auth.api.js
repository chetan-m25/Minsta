import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/auth",
  withCredentials: true,
});

// login api identifier can be email or username
export async function login(identifier, password) {
  const response = await api.post("/login", {
    username: identifier,
    email: identifier,
    password,
  });

  return response.data;
}

// register api
export async function register(username, email, password) {
  const response = await api.post("/register", {
    username,
    email,
    password,
  });

  return response.data;
}

// get-me api
export async function getMe() {
  const response = await api.get("/get-me");

  return response.data;
}
