import "./UserSchedule.css";
import { removeUserShow, addUserShow } from "../../api/api";

const timeSlotMap = {
  1: "12:00 PM - 1:00 PM",
  2: "1:30 PM - 2:30 PM",
  3: "3:00 PM - 4:00 PM",
  4: "4:30 PM - 5:30 PM",
  5: "6:00 PM - 7:00 PM",
};

function UserSchedule({ user, allShows, updateSchedules }) {
  const handleRemoveShow = async (showId) => {
    try {
      console.log(`Removing show with ID: ${showId}`);
      await removeUserShow(user.id, showId);

      updateSchedules((prevSchedules) => {
        if (!prevSchedules) return [];
        return prevSchedules.map((u) => {
          if (u.id === user.id) {
            const updatedSchedule = u.attributes.schedule.filter(
              (show) => show.id !== showId
            );
            return { ...u, attributes: { ...u.attributes, schedule: updatedSchedule } };
          }
          return u;
        });
      });
    } catch (err) {
      console.error("Error removing show:", err);
    }
  };

  const handleAddShow = async (showId) => {
    console.log("Adding show with ID:", showId);
    try {
      await addUserShow(user.id, showId);

      const showToAdd = allShows.find((show) => String(show.id) === String(showId));
      if (!showToAdd) {
        console.error("Show not found:", showId);
        return;
      }

      updateSchedules((prevSchedules) => {
        if (!prevSchedules) return [];
        return prevSchedules.map((u) => {
          if (u.id === user.id) {
            const updatedSchedule = [...(u.attributes.schedule || []), showToAdd];
            return { ...u, attributes: { ...u.attributes, schedule: updatedSchedule } };
          }
          return u;
        });
      });

      console.log("Show added successfully:", showToAdd);
    } catch (err) {
      console.error("Error adding show:", err);
    }
  };

  return (
    <div className="user-schedule">
      <h2>
        {user.attributes.first_name} {user.attributes.last_name} (@{user.attributes.username})
      </h2>

      <ul>
        {(user.attributes.schedule || []).map((show) => (
          <li key={show.id}>
            <img
              src={show.image_url || "https://via.placeholder.com/200"}
              alt={show.artist || "No Artist"}
            />
            <div>
              <p>{show.artist} at {show.location}</p>
              <p>Time: {timeSlotMap[show.time_slot] || "Unknown"}</p>
              <button onClick={() => handleRemoveShow(show.id)}>Remove Show</button>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <h3>Add a Show</h3>
        <select
          onChange={(e) => {
            const selectedShowId = e.target.value;
            if (selectedShowId) {
              handleAddShow(selectedShowId);
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>Select a show</option>
          {allShows.map((show) => (
            <option key={show.id} value={show.id}>
              {show.artist} at {show.location}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default UserSchedule;
