import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL;

// 🔽 Brand APIs
export const getBrands = () =>
  axios.get(`${BASE}/api/brands`, { withCredentials: true });

export const addBrand = (data) =>
  axios.post(`${BASE}/api/brands`, data, { withCredentials: true });

export const updateBrand = (id, data) =>
  axios.put(`${BASE}/api/brands/${id}`, data, { withCredentials: true });

export const deleteBrand = (id) =>
  axios.delete(`${BASE}/api/brands/${id}`, { withCredentials: true });

// 🔽 Chain APIs (if needed by Brand module)
export const getChains = () =>
  axios.get(`${BASE}/api/chains`, { withCredentials: true });

export const getChainsByGroup = (groupId) =>
  axios.get(`${BASE}/api/chains/group/${groupId}`, { withCredentials: true });

export const deleteChain = (id) =>
  axios.delete(`${BASE}/api/chains/${id}`, { withCredentials: true });

export const addChain = (data) =>
  axios.post(`${BASE}/api/chains`, data, { withCredentials: true });
