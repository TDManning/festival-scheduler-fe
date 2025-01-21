import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import MainPage from "./HomePage";
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
          {/* HomePage route */}
          <Route
            path="/"
            element={<HomePage favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          {/* FavoritesPage route */}
          <Route
            path="/favorites"
            element={<UserPage favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          {/* AdminPage route */}
          <Route
            path="/admin"
            element={<AdminPage />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
