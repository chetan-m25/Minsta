import { useEffect, useState } from "react";
import "../style/navbar.scss";
import { getMe } from "../../auth/services/auth.api";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.user);
      } catch (error) {
        console.log("Failed to load user", error);
      }
    };
    fetchUser();
  }, []);

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
