import React, {useState} from 'react'
import { adminLogin } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('password123')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const res = await adminLogin({ username, password })
      localStorage.setItem('admin_token', res.data.token)
      nav('/dashboard')
    }catch(err){
      alert('Login failed: ' + (err.response?.data?.error || err.message))
    }
  }

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={submit}>
        <label>Usuario</label>
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} />
        <label>Contraseña</label>
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{marginTop:10}}><button className="btn" type="submit">Entrar</button></div>
      </form>
    </div>
  )
}
