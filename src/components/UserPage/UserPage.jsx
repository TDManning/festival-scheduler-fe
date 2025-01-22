import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowCard from "../ShowCard/ShowCard";
import { fetchUserSchedule } from "../../api/api";
import "./UserPage.css";

function UserPage({ unsplashImages }) {
  const { userId } = useParams(); 
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const data = await fetchUserSchedule(userId); 
        setSchedule(data.data || []); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        setError("Could not load the schedule for the user.");
        setLoading(false);
      }
    };

    loadSchedule();
  }, [userId]);  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-page">
      <h1 className="user-title">{`User ${userId}'s Schedule`}</h1>
      {schedule.length > 0 ? (
        <div className="schedule-grid">
          {schedule.map((show, index) => {
            const poster = unsplashImages[index % unsplashImages.length]; 
            return (
              <ShowCard 
                key={show.id} 
                show={show.attributes} 
                poster={poster}
                userId={userId}   
              />
            );
          })}
        </div>
      ) : (
        <p>No shows found for this user.</p>
      )}
    </div>
  );
}

export default UserPage;
