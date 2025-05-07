import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE_URL;

export const getEstimates = () =>
  axios.get(`${BASE}/api/estimates`, { withCredentials: true });

export const addEstimate = (data) =>
  axios.post(`${BASE}/api/estimates`, data, { withCredentials: true });

export const updateEstimate = (id, data) =>
  axios.put(`${BASE}/api/estimates/${id}`, data, { withCredentials: true });

export const deleteEstimate = (id) =>
  axios.delete(`${BASE}/api/estimates/${id}`, { withCredentials: true });

export const getEstimateById = (id) =>
  axios.get(`${BASE}/api/estimates/${id}`, { withCredentials: true });
