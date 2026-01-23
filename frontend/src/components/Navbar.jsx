import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>DailyFix</h2>

      <div className="navbar-right">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/tasks" className="nav-link">Tasks</Link>
        <Link to="/login" className="nav-link btn">Login</Link>
        <Link to="/register" className="nav-link btn-outline">Register</Link>
      </div>
    </nav>
  );
}
