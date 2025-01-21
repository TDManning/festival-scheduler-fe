import "./HomePage.css";
import { useState, useEffect } from "react";
import { fetchAllShows, fetchUnsplashImages } from "./api";
import ShowCard from "./ShowCard";

function HomePage() {
  const [shows, setShows] = useState([]);
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const loadShows = async () => {
      try {
        const fetchedShows = await fetchAllShows();
        const fetchedPosters = await fetchUnsplashImages("concert");

        setShows(fetchedShows);
        setPosters(fetchedPosters);
      } catch (error) {
        console.error("Error loading data:", error);
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
            const poster = posters[index];
            return (
              <ShowCard
                key={show.id}
                show={show} 
                poster={poster} 
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
