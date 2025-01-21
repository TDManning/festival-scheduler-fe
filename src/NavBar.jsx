import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/user">My Schedule</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <form className="navbar-form">
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <button type="submit">Save</button>
      </form>
    </nav>
  );
}

export default NavBar;
