import axios from './axios';

export const register = (userData) => axios.post('/api/auth/register', userData);

export const login = (userData) => axios.post('/api/auth/login', userData);

