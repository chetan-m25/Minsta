import "../style/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../shared/components/Navbar";

const Feed = () => {
  const { loading, feed, handleGetFeed } = usePost();

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
            return <Post user={post.user} post={post} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
