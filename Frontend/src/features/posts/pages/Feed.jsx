import "../style/feed.scss";
import Post from "../components/Post";
import Navbar from "../../shared/components/Navbar";
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Feed = () => {
  const { loading, feed, handleGetFeed, handleToggleLike } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Feed Loading...</h1>
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
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
