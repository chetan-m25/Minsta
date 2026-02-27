import { useState } from "react";
import { toast } from "react-toastify";

const getTimeAgo = (createdAt) => {
  if (!createdAt) return "";
  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return "";
  const diffMs = Date.now() - created.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  if (diffSeconds < 60) return `${diffSeconds || 1}s`;
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths || 1}mo`;
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears || 1}y`;
};

const Post = ({
  user,
  post,
  handleToggleLike,
  loggedInUser,
  handleDeletePost,
  handleToggleSave,
}) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showBigHeart, setShowBigHeart] = useState(false);
  const [saved, setSaved] = useState(post.isSaved);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleSave = async () => {
    const currentSaved = saved;
    setSaved(!currentSaved);
    await handleToggleSave(post._id, currentSaved);
  };

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => {
    if (isDeleting) return;
    setShowDeleteModal(false);
  };

  const confirmDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const result = await handleDeletePost(post._id);
      if (result.success) {
        toast.success(result.message);
        setShowDeleteModal(false);
      } else {
        toast.error(result.message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const isOwnPost =
    loggedInUser?._id != null &&
    post.user?._id != null &&
    String(loggedInUser._id) === String(post.user._id);

  const timeAgo = getTimeAgo(post.createdAt);

  return (
    <div className="post">
      <div className="user">
        <img src={user.profileImage} alt="" />
        <p>{user.username}</p>
        <div className="post-time">
          {timeAgo && (
            <>
              <span className="post-time-dot" aria-hidden="true">
                •
              </span>
              <span className="time-ago">{timeAgo}</span>
            </>
          )}
        </div>
        {isOwnPost && (
          <button className="delete-btn" onClick={openDeleteModal}>
            <i className="ri-delete-bin-line"></i>
          </button>
        )}
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
          <button onClick={handleSave}>
            <i
              className={
                saved ? "ri-bookmark-fill icon saved" : "ri-bookmark-line icon"
              }
            ></i>
          </button>
        </div>
      </div>

      <div className="bottom">
        <p className="caption">{post.caption}</p>
      </div>

      {showDeleteModal && (
        <div
          className="delete-modal-overlay"
          onClick={closeDeleteModal}
          role="presentation"
        >
          <div
            className="delete-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Delete post confirmation"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Delete post ?</h3>
            <p>This action can't be undone.</p>
            <div className="delete-modal-actions">
              <button
                type="button"
                className="delete-modal-btn delete-modal-btn-cancel"
                onClick={closeDeleteModal}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="delete-modal-btn delete-modal-btn-delete"
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
