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
  try {
    const response = await api.get("/get-me");
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return { user: null, unauthorized: true };
    }
    throw error;
  }
}

// logout api
export async function logout() {
  const response = await api.post("/logout");
  return response.data;
}
