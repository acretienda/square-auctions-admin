import React, {useState} from 'react'
import { adminLogin } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [identifier,setIdentifier] = useState('admin')
  const [password,setPassword] = useState('admin123')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault();
    try{
      const r = await adminLogin({ identifier, password });
      localStorage.setItem('admin_token', r.data.token);
      nav('/dashboard/auctions');
    }catch(err){
      alert('Login fallido: ' + (err.response?.data?.error || err.message));
    }
  }

  return (
    <div className="container">
      <h2>Acceso Administrador</h2>
      <form onSubmit={submit}>
        <label>Usuario o Email</label>
        <input className="input" value={identifier} onChange={e=>setIdentifier(e.target.value)} />
        <label>Contraseña</label>
        <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{marginTop:10}}><button className="btn" type="submit">Entrar</button></div>
      </form>
      <p className="small">Usuario por defecto: <b>admin</b> / Contraseña: <b>admin123</b></p>
    </div>
  )
}
