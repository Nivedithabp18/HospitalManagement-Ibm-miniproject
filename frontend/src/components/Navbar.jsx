import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">🏥 HMS</Link>
        {user && (
          <ul className="navbar-links">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/patients">Patients</Link></li>
            <li><Link to="/appointments">Appointments</Link></li>
            <li><span style={{ color: "#bee3f8", fontSize: "0.9rem" }}>Hi, {user.name}</span></li>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
        )}
      </div>
    </nav>
  );
}
