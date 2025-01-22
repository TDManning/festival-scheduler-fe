import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ShowCard from "../ShowCard/ShowCard";
import { fetchUserSchedule } from "../../api/api";
import "./UserPage.css";

function UserPage() {
  const { userId } = useParams(); 
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const query = new URLSearchParams(location.search);
  const username = query.get("username");

  useEffect(() => {
    const loadSchedule = async () => {
      try {
    
        const data = await fetchUserSchedule(userId, username);
        setSchedule(data.data || []); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        setError("Could not load the schedule for the user.");
        setLoading(false);
      }
    };

    loadSchedule();
  }, [userId, username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-page">
      <h1 className="user-title">
        {username ? `${username}'s Schedule` : "User Schedule"}
      </h1>
      {schedule.length > 0 ? (
        <div className="schedule-grid">
          {schedule.map((show) => (
            <ShowCard key={show.id} show={show.attributes} />
          ))}
        </div>
      ) : (
        <p>No shows found for this user.</p>
      )}
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default UserPage;