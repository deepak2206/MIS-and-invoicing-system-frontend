// services/zoneService.js
import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE_URL;

export const getZones = () => axios.get(`${BASE}/api/zones`, { withCredentials: true });
export const addZone = (data) => axios.post(`${BASE}/api/zones`, data, { withCredentials: true });
export const updateZone = (id, data) => axios.put(`${BASE}/api/zones/${id}`, data, { withCredentials: true });
export const deleteZone = (id) => axios.delete(`${BASE}/api/zones/${id}`, { withCredentials: true });
