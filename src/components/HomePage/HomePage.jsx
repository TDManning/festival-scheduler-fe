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

function HomePage({ unsplashImages, toggleFavorite, favorites }) {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(""); 

  useEffect(() => {
    const loadShows = async () => {
      try {
        const fetchedShows = await fetchAllShows();
        setShows(fetchedShows);
        setFilteredShows(fetchedShows); 
      } catch (error) {
        console.error("Error loading shows:", error);
      }
    };
    loadShows();
  }, []);

  const handleTimeSlotChange = (e) => {
    const selectedSlot = e.target.value;
    setSelectedTimeSlot(selectedSlot);

    if (selectedSlot) {
      const filtered = shows.filter((show) => show.time_slot == selectedSlot);
      setFilteredShows(filtered);
    } else {
      setFilteredShows(shows);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Shows</h1>

      <select value={selectedTimeSlot} onChange={handleTimeSlotChange}>
        <option value="">Select Time Slot</option>
        {Object.keys(timeSlotMap).map((slot) => (
          <option key={slot} value={slot}>
            {timeSlotMap[slot]}
          </option>
        ))}
      </select>

      <div className="show-grid">
        {filteredShows.length > 0 ? (
          filteredShows.map((show, index) => {
            const poster = unsplashImages[index % unsplashImages.length]; 
            return (
              <ShowCard
                key={show.id}
                show={show}
                poster={poster}
                toggleFavorite={toggleFavorite}
                isFavorited={favorites.some((fav) => fav.id === show.id)}
              />
            );
          })
        ) : (
          <p>No shows available for this time slot</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
