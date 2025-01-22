import { useEffect, useState } from "react";
import UserSchedule from "../UserSchedule/UserSchedule";
import { fetchAllUserSchedules, fetchAllShows, fetchUnsplashImages } from "../../api/api";
import "./AdminPage.css";

function AdminPage() {
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
          <UserSchedule
            key={user.id}
            user={user}
            allShows={shows} 
            updateSchedules={setSchedules}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
