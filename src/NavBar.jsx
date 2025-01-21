import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/user">My Schedule</Link>
      <Link to="/admin">Admin</Link>
      <form>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <button type="submit">Save</button>
      </form>
    </nav>
  );
}

export default NavBar;
