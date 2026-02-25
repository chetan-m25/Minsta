import { useState } from "react";
import { likePost, unlikePost } from "../services/post.api";

const Post = ({ user, post }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showBigHeart, setShowBigHeart] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        setLiked(false);
        setLikesCount((prev) => prev - 1);

        await unlikePost(post._id);
      } else {
        setLiked(true);
        setLikesCount((prev) => prev + 1);

        await likePost(post._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDoubleClick = async () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      await likePost(post._id);
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
            <i class="ri-send-ins-line icon"></i>
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
