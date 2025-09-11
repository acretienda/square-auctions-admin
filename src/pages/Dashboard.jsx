import { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [auctionName, setAuctionName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const API_URL = "https://square-auctions.onrender.com/api";

  // Crear Subasta
  const handleCreateAuction = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auctions`, { name: auctionName });
      alert("✅ Subasta creada correctamente");
      setAuctionName("");
    } catch (error) {
      console.error(error);
      alert("❌ Error al crear la subasta");
    }
  };

  // Crear Admin
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/admins`, {
        email: adminEmail,
        password: adminPassword,
      });
      alert("✅ Administrador creado correctamente");
      setAdminEmail("");
      setAdminPassword("");
    } catch (error) {
      console.error(error);
      alert("❌ Error al crear el administrador");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel de Control</h1>

      {/* Crear Subasta */}
      <section style={{ marginBottom: "30px" }}>
        <h2>Crear Subasta</h2>
        <form onSubmit={handleCreateAuction}>
          <input
            type="text"
            placeholder="Nombre de la subasta"
            value={auctionName}
            onChange={(e) => setAuctionName(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: "10px" }}>
            Crear
          </button>
        </form>
      </section>

      {/* Crear Administrador */}
      <section>
        <h2>Crear Administrador</h2>
        <form onSubmit={handleCreateAdmin}>
          <input
            type="email"
            placeholder="Email del administrador"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: "10px" }}>
            Crear
          </button>
        </form>
      </section>
    </div>
  );
}

export default Dashboard;
