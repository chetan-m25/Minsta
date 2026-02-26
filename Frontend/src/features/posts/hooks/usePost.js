import { useContext, useEffect } from "react";
import { PostContext } from "../context/CreatePostContext";
import { getFeed, createPost } from "../services/post.api";

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

  const handleCreatePost = async (imageFile, caption) => {
    try {
      setLoading(true);
      const data = await createPost(imageFile, caption);
      setFeed((prevFeed) =>
        prevFeed ? [data.post, ...prevFeed] : [data.post],
      );

      return { success: true, message: "Post uploaded successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Uploading failed",
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetFeed();
  }, []);

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
  };
};
