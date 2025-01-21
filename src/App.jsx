// import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./NavBar";
import HomePage from "./HomePage";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";

function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (show) => {
    const isFavorite = favorites.some((fav) => fav.id === show.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== show.id));
    } else {
      setFavorites([...favorites, show]);
    }
  };

  return (
    <Router>
      <NavBar />
      <main>
        <Routes>
          <Route
            path="/"
            element={<HomePage favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/favorites"
            element={<UserPage favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
