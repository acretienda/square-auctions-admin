import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAdmin } from '../services/api'

export default function Login({ onLogin }){
  const [identifier,setIdentifier] = useState('admin@example.com')
  const [password,setPassword] = useState('admin123')
  const [loading,setLoading] = useState(false)
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault();
    setLoading(true)
    try{
      const r = await loginAdmin({ identifier, password });
      localStorage.setItem('admin_token', r.data.token);
      onLogin && onLogin();
      nav('/dashboard/auctions');
    }catch(err){
      alert('Login fallido: ' + (err.response?.data?.error || err.message));
    }finally{ setLoading(false) }
  }

  return (
    <div className="container" style={{maxWidth:420, marginTop:80}}>
      <h2>Acceso Administrador</h2>
      <form onSubmit={submit}>
        <label>Usuario o Email</label>
        <input className="input" value={identifier} onChange={e=>setIdentifier(e.target.value)} />
        <label>Contraseña</label>
        <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{marginTop:10}}><button className="btn" type="submit" disabled={loading}>{loading? 'Entrando...':'Entrar'}</button></div>
      </form>
      <p className="small">Usuario por defecto: <b>admin@example.com</b> / Contraseña: <b>admin123</b></p>
    </div>
  )
}
