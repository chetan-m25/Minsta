import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

export async function getFeed() {
  const response = await api.get("/posts/feed");
  return response.data;
}
