import { useState } from "react";

const Post = ({ user, post, handleToggleLike }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showBigHeart, setShowBigHeart] = useState(false);

  const handleLike = async () => {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

    await handleToggleLike(post._id, liked);
  };

  const handleDoubleClick = async () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      await handleToggleLike(post._id, false);
    }

    setShowBigHeart(true);
    setTimeout(() => {
      setShowBigHeart(false);
    }, 400);
  };

  return (
    <div className="post">
      <div className="user">
        <img src={user.profileImage} alt="" />
        <p>{user.username}</p>
      </div>
      <div className="image-container" onDoubleClick={handleDoubleClick}>
        <img src={post.imageUrl} alt="" />

        {showBigHeart && <i className="ri-heart-fill big-heart"></i>}
      </div>
      <div className="icons">
        <div className="left">
          <button onClick={handleLike}>
            <i
              className={
                liked ? "ri-heart-fill icon liked" : "ri-heart-line icon"
              }
            ></i>
            <p>{likesCount > 0 ? `${likesCount}` : "like"}</p>
          </button>
          <button>
            <i className="ri-chat-3-line icon"></i>
          </button>
          <button>
            <i className="ri-send-ins-line icon"></i>
          </button>
        </div>
        <div className="right">
          <button>
            <i className="ri-bookmark-line icon"></i>
          </button>
        </div>
      </div>

      <div className="bottom">
        <p className="caption">{post.caption}</p>
      </div>
    </div>
  );
};

export default Post;
