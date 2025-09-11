import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://square-auctions.onrender.com";

export default function Dashboard(){
  const [token] = useState(localStorage.getItem("token"));
  const [title, setTitle] = useState('');
  const [startPrice, setStartPrice] = useState('');
  const [admins, setAdmins] = useState([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');

  useEffect(()=>{
    if(!token) { window.location.href = '/login'; return; }
    // cargar admins
    (async()=>{
      try{
        const res = await axios.get(`${API_URL}/api/admins`);
        setAdmins(res.data || []);
      }catch(e){
        console.error(e);
      }
    })();
  }, [token]);

  const createAuction = async (e)=>{
    e.preventDefault();
    try{
      await axios.post(`${API_URL}/api/auctions`, {
        title, description: '', starting_price: parseFloat(startPrice || 0)
      });
      alert('Subasta creada');
      setTitle(''); setStartPrice('');
    }catch(e){
      console.error(e);
      alert('Error creando subasta');
    }
  };

  const createAdmin = async (e)=>{
    e.preventDefault();
    try{
      await axios.post(`${API_URL}/api/admins`, { email: newAdminEmail, password: newAdminPassword });
      alert('Admin creado');
      setNewAdminEmail(''); setNewAdminPassword('');
      const res = await axios.get(`${API_URL}/api/admins`);
      setAdmins(res.data || []);
    }catch(e){
      console.error(e);
      alert('Error creando admin');
    }
  };

  return (
    <div>
      <div className="card" style={{marginBottom:20}}>
        <h2>Crear subasta</h2>
        <form onSubmit={createAuction}>
          <input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} required style={{width:'60%'}} />
          <input placeholder="Precio inicial" value={startPrice} onChange={e=>setStartPrice(e.target.value)} required style={{width:'35%', marginLeft:8}} />
          <div style={{marginTop:10}}>
            <button type="submit">Crear subasta</button>
          </div>
        </form>
      </div>

      <div className="card" style={{marginBottom:20}}>
        <h2>Crear administrador</h2>
        <form onSubmit={createAdmin}>
          <input placeholder="Email" value={newAdminEmail} onChange={e=>setNewAdminEmail(e.target.value)} required style={{width:'48%'}} />
          <input placeholder="Contraseña" type="password" value={newAdminPassword} onChange={e=>setNewAdminPassword(e.target.value)} required style={{width:'48%', marginLeft:8}} />
          <div style={{marginTop:10}}>
            <button type="submit">Crear admin</button>
          </div>
        </form>
      </div>

      <div className="card">
        <h2>Lista de administradores</h2>
        <ul>
          {admins.map(a => <li key={a.id}>{a.username || a.email} — {a.email}</li>)}
        </ul>
      </div>
    </div>
  );
}
