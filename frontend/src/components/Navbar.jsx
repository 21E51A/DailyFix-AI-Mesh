import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>DailyFix</h2>

      <div className="navbar-right">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/tasks" className="nav-link">Tasks</Link>

        {!user ? (
          <>
            <Link to="/login" className="nav-link btn">Login</Link>
            <Link to="/register" className="nav-link btn-outline">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-link btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
