import axios from 'axios';
const BASE_URL = "/api/chains";


export const getChains = () => axios.get(BASE_URL);
export const getChainsByGroup = (group) => axios.get(`${BASE_URL}/filter`, { params: { groupName: group } });
export const addChain = (data) => axios.post(BASE_URL, data);
export const updateChain = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteChain = (id) => axios.delete(`${BASE_URL}/${id}`);
