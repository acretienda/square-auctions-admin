import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
