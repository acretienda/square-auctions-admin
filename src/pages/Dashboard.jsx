import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AdminsList from './AdminsList'
import AuctionsList from './AuctionsList'

export default function Dashboard(){
  return (
    <div className="container">
      <div className="header">
        <h2>Panel de Administración</h2>
        <div className="nav">
          <Link to="/dashboard/auctions" className="btn">Subastas</Link>
          <Link to="/dashboard/admins" className="btn">Admins</Link>
          <button className="btn" onClick={()=>{localStorage.removeItem('admin_token'); window.location='/'}}>Salir</button>
        </div>
      </div>

      <Routes>
        <Route path="admins" element={<AdminsList/>} />
        <Route path="auctions" element={<AuctionsList/>} />
        <Route path="*" element={<AuctionsList/>} />
      </Routes>
    </div>
  )
}
