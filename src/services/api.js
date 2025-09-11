import axios from 'axios';
const BASE = import.meta.env.VITE_API_URL || 'https://square-auctions.onrender.com/api';
const api = axios.create({ baseURL: BASE, headers:{ 'Content-Type':'application/json' } });

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('admin_token');
  if (token) cfg.headers.Authorization = 'Bearer ' + token;
  return cfg;
});

export async function loginAdmin(payload){ return api.post('/admin/login', payload) }
export async function getAdmins(){ return api.get('/admins') }
export async function getAuctions(){ return api.get('/auctions') }

export default api;
