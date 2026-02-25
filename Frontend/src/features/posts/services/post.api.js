import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

export async function getFeed() {
  try {
    const response = await api.get("/posts/feed");

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return { unauthorized: true };
    }

    throw error;
  }
}

export async function likePost(postId) {
  return api.post(`/posts/like/${postId}`);
}

export async function unlikePost(postId) {
  return api.post(`/posts/unlike/${postId}`);
}
