import "./UserSchedule.css";

const timeSlotMap = {
  1: "12:00 PM - 1:00 PM",
  2: "1:30 PM - 2:30 PM",
  3: "3:00 PM - 4:00 PM",
  4: "4:30 PM - 5:30 PM",
  5: "6:00 PM - 7:00 PM",
};

function UserSchedule({ user, images }) {
  const { first_name, last_name, username, schedule } = user.attributes;

  return (
    <div className="user-schedule">
      {/* User Information */}
      <h2 className="user-title">
        {first_name} {last_name} (@{username})
      </h2>

      {/* Schedule List */}
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

      {/* Unsplash Images Section */}
      <div className="unsplash-section">
        <h3 className="unsplash-title">Unsplash Highlights</h3>
        <div className="unsplash-grid">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.url}
              alt={image.alt}
              className="unsplash-image"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserSchedule;
