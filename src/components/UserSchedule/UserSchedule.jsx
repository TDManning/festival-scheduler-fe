import "./UserSchedule.css";

const timeSlotMap = {
  1: "12:00 PM - 1:00 PM",
  2: "1:30 PM - 2:30 PM",
  3: "3:00 PM - 4:00 PM",
  4: "4:30 PM - 5:30 PM",
  5: "6:00 PM - 7:00 PM",
};

function UserSchedule({ user }) {
  const { first_name, last_name, username, schedule } = user.attributes;

  return (
    <div className="user-schedule">
      <h2 className="user-title">
        {first_name} {last_name} (@{username})
      </h2>
      <ul className="schedule-list">
        {schedule.map((show) => (
          <li key={show.id} className="schedule-item">
            <img
              src={show.image_url}
              alt={show.artist}
              className="schedule-image"
            />
            <div className="schedule-details">
              <p>
                <strong>{show.artist}</strong> at {show.location}
              </p>
              <p>Time Slot: {timeSlotMap[show.time_slot] || "Unknown"}</p>
              <p>Favorited: {show.favorited ? "Yes" : "No"}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSchedule;
