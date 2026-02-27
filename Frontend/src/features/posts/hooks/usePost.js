import { useContext } from "react";
import { PostContext } from "../context/post.context";
import {
  createPost,
  getFeed,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  deletePost,
} from "../services/post.api";

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

  const handleToggleLike = async (postId, isLiked) => {
    try {
      if (isLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }

      setFeed((prevFeed) => {
        return prevFeed.map((post) => {
          if (post._id !== postId) return post;

          return {
            ...post,
            isLiked: !isLiked,
            likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
          };
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleSave = async (postId, isSaved) => {
    try {
      if (isSaved) {
        await unsavePost(postId);
      } else {
        await savePost(postId);
      }

      setFeed((prevFeed) => {
        return prevFeed.map((post) => {
          if (post._id !== postId) return post;

          return {
            ...post,
            isSaved: !isSaved,
          };
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setFeed((prevFeed) => prevFeed.filter((post) => post._id !== postId));
      return { success: true, message: "Post deleted successfully" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete post",
      };
    }
  };

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
    handleToggleLike,
    handleDeletePost,
    handleToggleSave,
  };
};
