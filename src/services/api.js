import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE_URL || 'https://square-auctions.onrender.com';
const api = axios.create({ baseURL: BASE + '/api', headers:{ 'Content-Type':'application/json' } });

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('admin_token');
  if (token) cfg.headers.Authorization = 'Bearer ' + token;
  return cfg;
});

export const adminLogin = (payload) => api.post('/admin/login', payload);
export const fetchAuctions = () => api.get('/auctions');
export const createAuction = (payload) => api.post('/auctions', payload);
export const deleteAuction = (id) => api.delete(`/auctions/${id}`);
export const fetchBids = (id) => api.get(`/auctions/${id}/bids`);
export default api;
