import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // important for session
});


export const register = (userData) => API.post('/auth/register', userData);

export const login = (userData) => API.post('/auth/login', userData);

export const logout = () => API.post('/auth/logout');

export const getSessionUser = () => API.get('/auth/session-user');
