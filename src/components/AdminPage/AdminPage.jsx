import { useState, useEffect } from "react";
import { fetchAllUserSchedules } from "../../api/api";
import UserSchedule from "../UserSchedule/UserSchedule";
import "./AdminPage.css";

function AdminPage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const data = await fetchAllUserSchedules();
        setSchedules(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Failed to load schedules.");
        setLoading(false);
      }
    };
    loadSchedules();
  }, []);

  if (loading) return <p>Loading schedules...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-container">
      <h1 className="admin-title">User Show Schedules</h1>
      {schedules.length > 0 ? (
        schedules.map((user) => (
          <UserSchedule key={user.id} user={user} />
        ))
      ) : (
        <p>No schedules available</p>
      )}
    </div>
  );
}

export default AdminPage;
