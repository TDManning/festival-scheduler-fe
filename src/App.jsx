import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import UserPage from "./components/UserPage/UserPage";
import AdminPage from "./components/AdminPage/AdminPage";
import { fetchUnsplashImages } from "./api/api";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [unsplashImages, setUnsplashImages] = useState([]);
  const [currentUser, setCurrentUser] = useState(""); 

  useEffect(() => {
    const loadUnsplashImages = async () => {
      try {
        const images = await fetchUnsplashImages("concert", 30); 
        setUnsplashImages(images);
      } catch (error) {
        console.error("Error fetching Unsplash images:", error);
      }
    };

    loadUnsplashImages();
  }, []);

  const toggleFavorite = (show) => {
    const isFavorited = favorites.some((fav) => fav.id === show.id);
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.id !== show.id));
    } else {
      setFavorites([...favorites, show]);
    }
  };

  return (
    <Router>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                unsplashImages={unsplashImages}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
              />
            }
          />
          <Route
            path="/user/:userId"
            element={
              <UserPage
                unsplashImages={unsplashImages} 
                currentUser={currentUser}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminPage
                unsplashImages={unsplashImages} 
              />
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
