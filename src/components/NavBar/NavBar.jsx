import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { fetchUserSchedule } from "../../api/api";

function NavBar() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      try {
        const placeholderUserId = 1; 
        const data = await fetchUserSchedule(placeholderUserId, username.trim());
     
        if (data && data.data) {
          const userId = placeholderUserId; 
          navigate(`/user/${userId}?username=${encodeURIComponent(username.trim())}`);
        } else {
          setError("User not found.");
        }
      } catch (err) {
        console.error("Error fetching user schedule:", err);
        setError("Error fetching user information.");
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <form className="navbar-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">View Schedule</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </nav>
  );
}

export default NavBar;