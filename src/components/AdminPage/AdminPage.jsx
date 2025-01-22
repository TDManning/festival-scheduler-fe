import { useEffect, useState } from "react";
import UserSchedule from "../UserSchedule/UserSchedule";
import { fetchAllUserSchedules, removeUserShow, addUserShow, fetchAllShows } from "../../api/api";
import "./AdminPage.css";

function AdminPage() {
  const [schedules, setSchedules] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedSchedules, fetchedShows] = await Promise.all([
          fetchAllUserSchedules(),
          fetchAllShows(),
        ]);
        setSchedules(fetchedSchedules.data || []);
        setShows(fetchedShows || []);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load user schedules or shows.");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRemoveShow = async (userId, showId) => {
    try {
      await removeUserShow(userId, showId);
      setSchedules((prevSchedules) =>
        prevSchedules.map((user) =>
          user.id === userId
            ? {
                ...user,
                attributes: {
                  ...user.attributes,
                  schedule: user.attributes.schedule.filter(
                    (show) => show.id !== showId
                  ),
                },
              }
            : user
        )
      );
    } catch (err) {
      console.error("Error removing show:", err);
    }
  };

  const handleAddShow = async (userId, showId) => {
    try {
      await addUserShow(userId, showId);
      const showToAdd = shows.find((show) => show.id === showId);
      setSchedules((prevSchedules) =>
        prevSchedules.map((user) =>
          user.id === userId
            ? {
                ...user,
                attributes: {
                  ...user.attributes,
                  schedule: [...user.attributes.schedule, showToAdd],
                },
              }
            : user
        )
      );
    } catch (err) {
      console.error("Error adding show:", err);
    }
  };

  if (loading) return <p>Loading schedules...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin: Manage User Schedules</h1>
      <div className="schedules-section">
        {schedules.length > 0 ? (
          schedules.map((user) => (
            <UserSchedule
              key={user.id}
              user={user}
              allShows={shows} 
              onRemoveShow={(showId) => handleRemoveShow(user.id, showId)}
              onAddShow={(showId) => handleAddShow(user.id, showId)}
            />
          ))
        ) : (
          <p>No schedules available</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
