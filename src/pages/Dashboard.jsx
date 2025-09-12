import { Link } from "react-router-dom";

function Dashboard({ onLogout }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Panel de administración</h1>
      <nav className="space-x-4 mb-6">
        <Link to="/subastas" className="text-blue-600 hover:underline">
          Gestionar Subastas
        </Link>
        <Link to="/admins" className="text-blue-600 hover:underline">
          Gestionar Administradores
        </Link>
      </nav>
      <button
        onClick={onLogout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;
