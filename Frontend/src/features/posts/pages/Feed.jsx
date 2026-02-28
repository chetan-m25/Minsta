import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import Navbar from "../../shared/components/Navbar";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import "../style/feed.scss";

const Feed = () => {
  const {
    loading,
    feed,
    handleGetFeed,
    handleToggleLike,
    handleDeletePost,
    handleToggleSave,
  } = usePost();
  const { user: loggedInUser } = useAuth();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!feed) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <main className="feed-page">
      <Navbar />
      <div className="feed">
        <div className="posts">
          {feed.map((post) => {
            return (
              <Post
                key={post._id}
                user={post.user}
                post={post}
                handleToggleLike={handleToggleLike}
                loggedInUser={loggedInUser}
                handleDeletePost={handleDeletePost}
                handleToggleSave={handleToggleSave}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
