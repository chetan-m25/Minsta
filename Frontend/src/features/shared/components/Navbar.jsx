import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../auth/hooks/useAuth";
import "../style/navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogoutClick = async () => {
    const result = await handleLogout();
    if (result.success) {
      toast.success("Logged out successfully");
      navigate("/login");
      setIsDropdownOpen(false);
    } else {
      toast.error(result.message);
    }
  };

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
        <div className="profile-dropdown-container" ref={dropdownRef}>
          <button
            className="profile-btn tooltip"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img src={user?.profileImage} alt="profile" />
            <span>Profile</span>
          </button>
          {isDropdownOpen && (
            <div className="profile-dropdown">
              <button
                className="dropdown-item logout-btn"
                onClick={handleLogoutClick}
              >
                <i className="ri-logout-box-r-line"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
