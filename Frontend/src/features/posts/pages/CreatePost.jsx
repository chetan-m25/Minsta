import "../style/createpost.scss";
import { useState, useRef } from "react";
import { usePost } from "../hooks/usePost";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef(null);

  const navigate = useNavigate();
  const { loading, handleCreatePost } = usePost();

  async function handleSubmit(e) {
    e.preventDefault();

    const file = postImageInputFieldRef.current.files[0];
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image must be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    const result = await handleCreatePost(file, caption);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    navigate("/");
  }

  if (loading) {
    return (
      <main>
        <h1>Uploading...</h1>
      </main>
    );
  }

  return (
    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>

        <form onSubmit={handleSubmit}>
          <div className="select-image">
            <label className="post-image-label" htmlFor="postImage">
              Choose image
            </label>
            <p className="upload-info">Image must be less than 5MB</p>
          </div>
          <input
            ref={postImageInputFieldRef}
            hidden
            type="file"
            name="postImage"
            id="postImage"
            accept="image/*"
          />
          <input
            type="text"
            name="caption"
            id="caption"
            placeholder="Enter Caption"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />
          <button className="button primary-button" disabled={loading}>
            {loading ? "Uploading..." : "Create Post"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
