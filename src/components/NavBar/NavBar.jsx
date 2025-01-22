import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserSchedule } from "../../api/api"; 
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  const [userId, setUserId] = useState(""); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId.trim()) {
      setError(""); 
      setLoading(true); 

      try {

        const data = await fetchUserSchedule(userId.trim(), ""); 
        
        if (data && data.data) {
          navigate(`/user/${userId.trim()}`); 
        } else {
          setError("User schedule not found.");
        }
      } catch (err) {
        console.error("Error fetching user schedule:", err);
        setError("Error fetching user information.");
      } finally {
        setLoading(false); 
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
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit" disabled={loading}>View Schedule</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </nav>
  );
}

export default NavBar;
