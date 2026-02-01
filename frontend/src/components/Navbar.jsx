import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
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

        {/* If Logged In */}
        {user ? (
          <>
            <span className="nav-link">👤 {user.email}</span>

            <button
              onClick={handleLogout}
              className="nav-link btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* If Not Logged In */}
            <Link to="/login" className="nav-link btn">Login</Link>
            <Link to="/register" className="nav-link btn-outline">Register</Link>
          </>
        )}

      </div>
    </nav>
  );
}
