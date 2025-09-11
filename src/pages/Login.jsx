import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "https://square-auctions.onrender.com";

export default function Login(){
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError("");
    try{
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    }catch(err){
      setError(err.response?.data?.error || err.response?.data?.message || "Error en login");
    }
  };

  return (
    <div style={{maxWidth:420, margin:'40px auto'}}>
      <div className="card">
        <h2 style={{marginTop:0}}>Ingresar - Panel Admin</h2>
        <form onSubmit={handleSubmit}>
          <label>Correo</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:'100%'}} />
          <label>Contraseña</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{width:'100%'}} />
          <div style={{marginTop:12}}>
            <button type="submit">Entrar</button>
          </div>
        </form>
        {error && <p style={{color:'red', marginTop:10}}>{error}</p>}
      </div>
    </div>
  );
}
