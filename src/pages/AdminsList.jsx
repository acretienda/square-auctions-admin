import React, {useEffect, useState} from 'react'
import { getAdmins } from '../services/api'

export default function AdminsList(){
  const [admins,setAdmins]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{ load() },[])

  async function load(){
    setLoading(true)
    try{
      const r = await getAdmins()
      setAdmins(r.data || [])
    }catch(err){
      alert('Error cargando admins: '+(err.response?.data?.error||err.message))
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <h3>Administradores</h3>
      {loading? <p>Cargando...</p> : (
        <table className="table">
          <thead><tr><th>ID</th><th>Usuario</th><th>Email</th><th>Creado</th></tr></thead>
          <tbody>
            {admins.map(a=> (
              <tr key={a.id}><td>{a.id}</td><td>{a.username}</td><td>{a.email}</td><td>{new Date(a.created_at).toLocaleString()}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
