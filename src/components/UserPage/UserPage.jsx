import ShowCard from "../ShowCard/ShowCard";
import "./UserPage.css";

function UserPage({ favorites, toggleFavorite }) {
  return (
    <div className="user-page">
      <h1 className="user-title">My Favorite Shows</h1>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              toggleFavorite={toggleFavorite}
              isFavorited={true}
            />
          ))}
        </div>
      ) : (
        <p>You have not favorited any shows yet.</p>
      )}
    </div>
  );
}

export default UserPage;
