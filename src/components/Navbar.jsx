import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#f5f5f5", marginBottom: "20px" }}>
      <Link to="/login" style={{ marginRight: "15px" }}>
        Login
      </Link>
      <Link to="/dashboard" style={{ marginRight: "15px" }}>
        Panel de Control
      </Link>
      {token && (
        <button onClick={handleLogout} style={{ cursor: "pointer" }}>
          Cerrar sesión
        </button>
      )}
    </nav>
  );
}

export default Navbar;
