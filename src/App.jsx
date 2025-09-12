import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Subastas from "./pages/Subastas";
import Admins from "./pages/Admins";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        {/* Página de login */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Rutas protegidas */}
        <Route
          path="/"
          element={
            token ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/subastas"
          element={
            token ? (
              <Subastas token={token} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admins"
          element={
            token ? (
              <Admins token={token} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
