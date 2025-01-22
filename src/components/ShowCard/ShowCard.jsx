import "./ShowCard.css";

const timeSlotMap = {
  1: "12:00 PM - 1:00 PM",
  2: "1:30 PM - 2:30 PM",
  3: "3:00 PM - 4:00 PM",
  4: "4:30 PM - 5:30 PM",
  5: "6:00 PM - 7:00 PM",
};

function ShowCard({ show, poster }) {
  const imageUrl = poster?.url || "https://via.placeholder.com/200";
  const imageAlt = poster?.alt || "Show Poster";

  return (
    <div className="show-card">
      <img src={imageUrl} alt={imageAlt} className="show-image" />
      <h2 className="show-artist">{show.artist}</h2>
      <p>{show.location}</p>
      <p>Time Slot: {timeSlotMap[show.time_slot] || "Unknown Time Slot"}</p>
    </div>
  );
}

export default ShowCard;
