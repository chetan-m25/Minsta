import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../auth/hooks/useAuth";
import { usePost } from "../hooks/usePost";
import "../style/createpost.scss";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const postImageInputFieldRef = useRef(null);

  const navigate = useNavigate();
  const { handleCreatePost } = usePost();
  const { user } = useAuth();

  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return false;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image must be less than 5MB");
      return false;
    }
    return true;
  };

  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    setIsPosting(true);
    const result = await handleCreatePost(selectedFile, caption);
    setIsPosting(false);

    if (result.success) {
      toast.success(result.message);
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  const handleBack = () => {
    setImagePreview(null);
    setSelectedFile(null);
    setCaption("");
  };

  if (imagePreview) {
    return (
      <main className="create-post-page">
        <div className="post-editor">
          <header className="editor-header">
            <button
              className="back-btn"
              onClick={handleBack}
              title="Back to feed"
            >
              <i className="ri-arrow-left-line"></i>
            </button>
            <h1 className="editor-title">Create new post</h1>
            <button
              className="share-btn button primary-button"
              onClick={handleSubmit}
              disabled={isPosting}
            >
              {isPosting ? "Posting..." : "Share"}
            </button>
          </header>

          <div className="editor-content">
            <div className="preview-container">
              <img src={imagePreview} alt="preview" className="image-preview" />
            </div>

            <div className="caption-container">
              <div className="user-info">
                {user?.profileImage && (
                  <img
                    src={user.profileImage}
                    alt={user.username}
                    className="profile-pic"
                  />
                )}
                <p className="username">{user?.username || "Username"}</p>
              </div>

              <form onSubmit={handleSubmit} className="caption-form">
                <textarea
                  className="caption-textarea"
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  maxLength={500}
                />

                <div className="caption-footer">
                  <button type="button" className="emoji-btn" title="Add emoji">
                    <i className="ri-emotion-laugh-line"></i>
                  </button>
                  <span className="char-count">{caption.length}/500</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="upload-container">
        <div className="upload-container-header">
          <button
            className="back-to-home-btn"
            onClick={() => navigate("/")}
            title="Back to home"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <h1 className="upload-container-title">Create New Post</h1>
          <div></div>
        </div>

        <div
          className={`upload-area ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => postImageInputFieldRef.current?.click()}
        >
          <div className="upload-content">
            <div className="upload-icon">
              <i className="ri-image-2-line"></i>
            </div>
            <p className="upload-text">
              Drag and drop or click here to upload image
            </p>
          </div>
        </div>

        <input
          ref={postImageInputFieldRef}
          hidden
          type="file"
          name="postImage"
          id="postImage"
          accept="image/*"
          onChange={handleInputChange}
        />
      </div>
    </main>
  );
};

export default CreatePost;
