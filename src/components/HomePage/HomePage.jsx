import { useState, useEffect } from "react";
import { fetchAllShows } from "../../api/api";
import ShowCard from "../ShowCard/ShowCard";
import "./HomePage.css";

const timeSlotMap = {
  1: "12:00 PM - 1:00 PM",
  2: "1:30 PM - 2:30 PM",
  3: "3:00 PM - 4:00 PM",
  4: "4:30 PM - 5:30 PM",
  5: "6:00 PM - 7:00 PM",
};

function HomePage({ unsplashImages }) {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadShows = async () => {
      try {
        const fetchedShows = await fetchAllShows();
        setShows(fetchedShows);
        setFilteredShows(fetchedShows);
        setLoading(false);
      } catch (error) {
        console.error("Error loading shows:", error);
        setError("Failed to load shows.");
        setLoading(false);
      }
    };
    loadShows();
  }, []);

  const handleTimeSlotChange = (e) => {
    const selectedSlot = e.target.value;
    setSelectedTimeSlot(selectedSlot);

    if (selectedSlot) {
      const filtered = shows.filter((show) => show.time_slot === parseInt(selectedSlot));
      setFilteredShows(filtered);
    } else {
      setFilteredShows(shows);
    }
  };

  if (loading) return <p>Loading shows...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-container">
      <h1 className="home-title">Shows</h1>
      <div className="time-slot-filter">
        <label htmlFor="timeSlot">Filter by Time Slot:</label>
        <select id="timeSlot" value={selectedTimeSlot} onChange={handleTimeSlotChange}>
          <option value="">Select Time Slot</option>
          {Object.keys(timeSlotMap).map((slot) => (
            <option key={slot} value={slot}>
              {timeSlotMap[slot]}
            </option>
          ))}
        </select>
      </div>

      <div className="show-grid">
        {filteredShows.length > 0 ? (
          filteredShows.map((show, index) => {
            const poster = unsplashImages[index % unsplashImages.length];
            return (
              <ShowCard key={show.id} show={show} poster={poster} />
            );
          })
        ) : (
          <p>No shows available for the selected time slot</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
