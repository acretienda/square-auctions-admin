import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [subastas, setSubastas] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nuevoAdmin, setNuevoAdmin] = useState("");
  const [passwordAdmin, setPasswordAdmin] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Redirigir si no hay login
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      cargarSubastas();
      cargarAdmins();
    }
  }, []);

  const cargarSubastas = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/auctions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSubastas(data);
    } catch (err) {
      console.error("Error cargando subastas:", err);
    }
  };

  const cargarAdmins = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/admins", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error("Error cargando admins:", err);
    }
  };

  const crearSubasta = async (e) => {
    e.preventDefault();
    try {
      await fetch(import.meta.env.VITE_API_URL + "/api/auctions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: titulo, description: descripcion }),
      });
      setTitulo("");
      setDescripcion("");
      cargarSubastas();
    } catch (err) {
      console.error("Error creando subasta:", err);
    }
  };

  const eliminarSubasta = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar esta subasta?")) return;
    try {
      await fetch(import.meta.env.VITE_API_URL + `/api/auctions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      cargarSubastas();
    } catch (err) {
      console.error("Error eliminando subasta:", err);
    }
  };

  const crearAdmin = async (e) => {
    e.preventDefault();
    try {
      await fetch(import.meta.env.VITE_API_URL + "/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: nuevoAdmin, password: passwordAdmin }),
      });
      setNuevoAdmin("");
      setPasswordAdmin("");
      cargarAdmins();
    } catch (err) {
      console.error("Error creando admin:", err);
    }
  };

  const eliminarAdmin = async (id) => {
    if (!confirm("⚠️ ¿Seguro que quieres eliminar este admin?")) return;
    try {
      await fetch(import.meta.env.VITE_API_URL + `/api/admins/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      cargarAdmins();
    } catch (err) {
      console.error("Error eliminando admin:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>

      {/* SUBASTAS */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">Gestión de Subastas</h2>
        <form onSubmit={crearSubasta} className="mb-4">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border px-3 py-2 rounded mr-2"
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border px-3 py-2 rounded mr-2"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Crear Subasta
          </button>
        </form>

        <ul>
          {subastas.map((s) => (
            <li
              key={s.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                <b>{s.title}</b>: {s.description}
              </span>
              <button
                onClick={() => eliminarSubasta(s.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ADMINS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Gestión de Administradores</h2>
        <form onSubmit={crearAdmin} className="mb-4">
          <input
            type="text"
            placeholder="Usuario"
            value={nuevoAdmin}
            onChange={(e) => setNuevoAdmin(e.target.value)}
            className="border px-3 py-2 rounded mr-2"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={passwordAdmin}
            onChange={(e) => setPasswordAdmin(e.target.value)}
            className="border px-3 py-2 rounded mr-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Crear Admin
          </button>
        </form>

        <ul>
          {admins.map((a) => (
            <li
              key={a.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{a.username}</span>
              <button
                onClick={() => eliminarAdmin(a.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
