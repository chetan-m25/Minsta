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
      <main className="feed-page">
        <Navbar />
        <div className="feed">
          <div className="posts">
            {[1, 2].map((item) => (
              <div key={item} className="post-skeleton">
                <div className="skeleton-user">
                  <div className="skeleton-avatar shimmer"></div>
                  <div className="skeleton-username shimmer"></div>
                </div>

                <div className="skeleton-image shimmer"></div>

                <div className="skeleton-actions">
                  <div className="skeleton-icon shimmer"></div>
                  <div className="skeleton-icon shimmer"></div>
                  <div className="skeleton-icon shimmer"></div>
                </div>

                <div className="skeleton-caption shimmer"></div>
              </div>
            ))}
          </div>
        </div>
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
