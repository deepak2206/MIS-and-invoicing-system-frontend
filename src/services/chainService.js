import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL;

export const getChains = () => axios.get(`${BASE}/api/chains`, { withCredentials: true });
// export const getChainsByGroup = (groupName) => axios.get(`${BASE}/api/chains/filter`, {
//   params: { groupName },
//   withCredentials: true
// });

export const getChainsByGroup = (groupId) =>
  axios.get(`/api/chains/group/${groupId}`, { withCredentials: true });

export const deleteChain = (id) => axios.delete(`${BASE}/api/chains/${id}`, { withCredentials: true });
export const addChain = (data) => 
    axios.post(`${BASE}/api/chains`, data, { withCredentials: true });