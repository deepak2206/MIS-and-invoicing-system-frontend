
import axios from './axios';

const API_URL = "/api/auth"; 

export const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const login = (userData) => {
  return axios.post('/api/auth/login', userData);
};


export const forgotPassword = (email) => {
  return axios.post(`${API_URL}/forgot-password`, { email });  
};


export const resetPassword = (token, newPassword) => {
  return axios.post(`${API_URL}/reset-password/${token}`, { newPassword }); 
};