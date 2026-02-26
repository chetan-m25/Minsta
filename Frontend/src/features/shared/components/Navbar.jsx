import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import "../style/navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="left">
        <h2 className="logo">MINSTA</h2>
      </div>

      <div className="right">
        <button className="tooltip">
          <i className="ri-search-line nav-icon"></i>
          <span>Search</span>
        </button>
        <button onClick={() => navigate("/create-post")} className="tooltip">
          <i className="ri-image-add-line nav-icon"></i>
          <span>Create Post</span>
        </button>
        <button className="profile-btn tooltip">
          <img src={user?.profileImage} alt="profile" />
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
