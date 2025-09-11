import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout = ()=>{ localStorage.removeItem('token'); navigate('/login'); };
  return (
    <nav>
      <Link to="/login">Login</Link>
      <Link to="/dashboard" style={{marginLeft:12}}>Panel</Link>
      {token && <button onClick={handleLogout} style={{marginLeft:12}}>Cerrar sesión</button>}
    </nav>
  );
}
