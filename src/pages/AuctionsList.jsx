import React, {useEffect, useState} from 'react'
import { getAuctions } from '../services/api'

export default function AuctionsList(){
  const [items,setItems]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{ load() },[])

  async function load(){
    setLoading(true)
    try{
      const r = await getAuctions()
      setItems(r.data || [])
    }catch(err){
      alert('Error cargando subastas: '+(err.response?.data?.error||err.message))
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <h3>Subastas</h3>
      {loading? <p>Cargando...</p> : (
        <table className="table">
          <thead><tr><th>ID</th><th>Título</th><th>Inicio</th><th>Fin</th></tr></thead>
          <tbody>
            {items.map(it=> (
              <tr key={it.id}><td>{it.id}</td><td>{it.title}</td><td>{it.start_date||'-'}</td><td>{it.end_date||'-'}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
