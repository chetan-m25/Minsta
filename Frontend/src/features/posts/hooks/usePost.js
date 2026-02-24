import { useContext } from "react";
import { PostContext } from "../context/CreatePostContext";
import { getFeed } from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, feed, setFeed } = context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);

      const data = await getFeed();

      if (data?.unauthorized) {
        setFeed(null);
        return;
      }

      setFeed(data.posts);
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    feed,
    post,
    handleGetFeed,
  };
};
