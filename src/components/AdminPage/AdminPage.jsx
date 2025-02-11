import { useEffect, useState } from "react";
import UserSchedule from "../UserSchedule/UserSchedule";
import { fetchAllUserSchedules, fetchAllShows } from "../../api/api";
import "./AdminPage.css";

function AdminPage({ unsplashImages }) {
  const [schedules, setSchedules] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedSchedules = await fetchAllUserSchedules();
        const fetchedShows = await fetchAllShows();

        setSchedules(fetchedSchedules.data || []);
        setShows(fetchedShows || []);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load schedules or shows.");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading schedules...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-container">
      <h1>Admin: Manage User Schedules</h1>
      <div className="schedules-section">
        {schedules.map((user) => (
          <div key={user.id} className="user-container">
            <div className="user-details">
              <h3>{user.attributes.username}</h3>
              <p>User ID: {user.id}</p> 
            </div>
            <UserSchedule
              user={user}
              allShows={shows}
              unsplashImages={unsplashImages}
              updateSchedules={setSchedules}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
