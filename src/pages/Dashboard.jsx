function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📊 Panel de Administración</h1>
      <nav>
        <ul>
          <li>🏠 Inicio</li>
          <li>🛒 Subastas</li>
          <li>👤 Usuarios</li>
          <li>⚙️ Configuración</li>
        </ul>
      </nav>
      <button onClick={handleLogout} style={{ marginTop: 20, padding: "10px 20px" }}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;
