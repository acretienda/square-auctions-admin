import React, {useEffect, useState} from 'react'
import { listAdmins, createAdmin, deleteAdmin } from '../services/api'

export default function Admins(){
  const [admins,setAdmins] = useState([])
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  useEffect(()=>{ load() },[])

  async function load(){
    try{
      const r = await listAdmins(); setAdmins(r.data);
    }catch(err){ alert('No autorizado o error: '+(err.response?.data?.error||err.message)) }
  }

  async function handleCreate(e){
    e.preventDefault();
    try{
      await createAdmin({ email, username, password });
      setEmail(''); setUsername(''); setPassword(''); load();
    }catch(err){ alert('Error al crear: '+(err.response?.data?.error||err.message)) }
  }

  async function handleDelete(id){
    if(!confirm('¿Borrar admin?')) return;
    try{ await deleteAdmin(id); load(); }catch(err){ alert('Error al borrar') }
  }

  return (
    <div>
      <h3>Administradores</h3>
      <form onSubmit={handleCreate}>
        <label>Usuario</label>
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} />
        <label>Email</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Contraseña</label>
        <input className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{marginTop:8}}><button className="btn" type="submit">Crear admin</button></div>
      </form>

      <table className="table">
        <thead><tr><th>ID</th><th>Usuario</th><th>Email</th><th>Creado</th><th>Acción</th></tr></thead>
        <tbody>
          {admins.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.username || '-'}</td>
              <td>{a.email || '-'}</td>
              <td>{new Date(a.created_at).toLocaleString()}</td>
              <td><button className="btn" onClick={()=>handleDelete(a.id)}>Borrar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
