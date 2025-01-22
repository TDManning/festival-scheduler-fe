import { useState, useEffect } from "react";
import { fetchAllShows } from "../../api/api";
import ShowCard from "../ShowCard/ShowCard";
import "./HomePage.css";

function HomePage({ unsplashImages, toggleFavorite, favorites }) {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const loadShows = async () => {
      try {
        const fetchedShows = await fetchAllShows();
        setShows(fetchedShows);
      } catch (error) {
        console.error("Error loading shows:", error);
      }
    };
    loadShows();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Shows</h1>
      <div className="show-grid">
        {shows.length > 0 ? (
          shows.map((show, index) => {
            const poster = unsplashImages[index];
            const isFavorited = favorites.some((fav) => fav.id === show.id);
            return (
              <ShowCard
                key={show.id}
                show={show}
                poster={poster}
                toggleFavorite={toggleFavorite}
                isFavorited={isFavorited}
              />
            );
          })
        ) : (
          <p>No shows available</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
