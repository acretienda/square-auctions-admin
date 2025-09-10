import React, {useEffect, useState} from 'react'
import { listAuctions, createAuction, updateAuction, deleteAuction } from '../services/api'

export default function Auctions(){
  const [items,setItems]=useState([])
  const [title,setTitle]=useState('')
  const [startPrice,setStartPrice]=useState('')

  useEffect(()=>{ load() },[])
  async function load(){
    try{ const r = await listAuctions(); setItems(r.data || []); }catch(err){ /* ignore */ }
  }

  async function handleCreate(e){
    e.preventDefault();
    try{
      await createAuction({ title, start_price: startPrice });
      setTitle(''); setStartPrice(''); load();
    }catch(err){ alert('Error al crear subasta') }
  }

  async function handleDelete(id){
    if(!confirm('Borrar subasta?')) return;
    try{ await deleteAuction(id); load(); }catch(err){ alert('Error al borrar') }
  }

  return (
    <div>
      <h3>Subastas</h3>
      <form onSubmit={handleCreate}>
        <label>Título</label>
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
        <label>Precio inicio</label>
        <input className="input" value={startPrice} onChange={e=>setStartPrice(e.target.value)} />
        <div style={{marginTop:8}}><button className="btn" type="submit">Crear subasta</button></div>
      </form>

      <table className="table">
        <thead><tr><th>ID</th><th>Título</th><th>Precio inicio</th><th>Acción</th></tr></thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id}><td>{it.id}</td><td>{it.title}</td><td>{it.start_price}</td>
            <td><button className="btn" onClick={()=>handleDelete(it.id)}>Borrar</button></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
