import { useEffect, useState } from "react";

export default function Dashboard() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      // Si no hay token, redirigimos al login
      window.location.href = "/login";
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/login";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Bienvenido al Panel de Administración</h2>
      <p>Has iniciado sesión correctamente ✅</p>
      <button
        onClick={handleLogout}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
