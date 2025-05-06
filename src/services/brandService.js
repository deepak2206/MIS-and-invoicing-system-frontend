import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL;

// 🔽 Brand APIs
export const getBrands = () =>
  axios.get(`${BASE}/brands`, { withCredentials: true });

export const addBrand = (data) =>
  axios.post(`${BASE}/brands`, data, { withCredentials: true });

export const updateBrand = (id, data) =>
  axios.put(`${BASE}/brands/${id}`, data, { withCredentials: true });

export const deleteBrand = (id) =>
  axios.delete(`${BASE}/brands/${id}`, { withCredentials: true });

// 🔽 Chain APIs (if needed by Brand module)
export const getChains = () =>
  axios.get(`${BASE}/chains`, { withCredentials: true });

export const getChainsByGroup = (groupId) =>
  axios.get(`${BASE}/chains/group/${groupId}`, { withCredentials: true });

export const deleteChain = (id) =>
  axios.delete(`${BASE}/chains/${id}`, { withCredentials: true });

export const addChain = (data) =>
  axios.post(`${BASE}/chains`, data, { withCredentials: true });


export const getBrandsByGroup = (groupId) =>
    axios.get(`${BASE}/brands/group/${groupId}`, { withCredentials: true });
  