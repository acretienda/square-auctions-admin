import React, {useEffect, useState} from 'react'
import { fetchAuctions, createAuction, deleteAuction, fetchBids } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const [auctions, setAuctions] = useState([])
  const [title, setTitle] = useState('')
  const [startingBid, setStartingBid] = useState(1)
  const nav = useNavigate()

  useEffect(()=>{ load() }, [])

  async function load(){
    try{
      const res = await fetchAuctions()
      setAuctions(res.data || [])
    }catch(err){
      console.error(err); alert('Error fetching auctions'); nav('/')
    }
  }

  async function handleCreate(e){
    e.preventDefault()
    try{
      await createAuction({ title, startingBid })
      setTitle(''); setStartingBid(1); load()
    }catch(err){ alert('Create failed: ' + (err.response?.data?.error || err.message)) }
  }

  async function handleDelete(id){
    if(!confirm('Borrar subasta?')) return;
    try{ await deleteAuction(id); load() }catch(err){ alert('Delete failed') }
  }

  async function viewBids(id){
    try{
      const res = await fetchBids(id)
      alert('Pujas:\n' + JSON.stringify(res.data || [], null, 2))
    }catch(err){ alert('Error fetching bids') }
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Admin Dashboard</h2>
        <div className="row">
          <button className="btn" onClick={()=>{ localStorage.removeItem('admin_token'); nav('/'); }}>Logout</button>
        </div>
      </div>

      <section style={{marginTop:16}}>
        <h3>Crear subasta</h3>
        <form onSubmit={handleCreate}>
          <input className="input" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
          <input className="input" type="number" min="1" value={startingBid} onChange={e=>setStartingBid(e.target.value)} />
          <button className="btn" type="submit">Crear</button>
        </form>
      </section>

      <section style={{marginTop:16}}>
        <h3>Subastas</h3>
        <table className="table">
          <thead><tr><th>Título</th><th>Precio actual</th><th>Acciones</th></tr></thead>
          <tbody>
            {auctions.map(a=> (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.current_price ?? a.starting_bid ?? '-'}</td>
                <td>
                  <button className="btn" onClick={()=>viewBids(a.id)}>Pujas</button>
                  <button style={{marginLeft:8}} className="btn" onClick={()=>handleDelete(a.id)}>Borrar</button>
                </td>
              </tr>
            ))}
            {auctions.length===0 && <tr><td colSpan="3" className="small">No hay subastas</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  )
}
