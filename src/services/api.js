import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE_URL || 'https://square-auctions.onrender.com';
const api = axios.create({ baseURL: BASE + '/api', headers:{ 'Content-Type':'application/json' } });
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('admin_token');
  if (token) cfg.headers.Authorization = 'Bearer ' + token;
  return cfg;
});
export const adminLogin = (p) => api.post('/admin/login', p);
export const listAdmins = () => api.get('/admin');
export const createAdmin = (p) => api.post('/admin', p);
export const deleteAdmin = (id) => api.delete(`/admin/${id}`);
// auctions endpoints (placeholders - backend must implement)
export const listAuctions = () => api.get('/auctions');
export const createAuction = (p) => api.post('/auctions', p);
export const updateAuction = (id,p) => api.put(`/auctions/${id}`, p);
export const deleteAuction = (id) => api.delete(`/auctions/${id}`);
export default api;
