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
    setLoading(true);

    const data = await createPost(imageFile, caption);
    setFeed([data.post, ...feed]);

    setLoading(false);
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
