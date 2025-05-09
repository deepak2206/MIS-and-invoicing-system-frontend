import axios from 'axios';

const BASE = import.meta.env.VITE_API_BASE_URL;

// Ensure all requests send cookies
const axiosInstance = axios.create({
  baseURL: BASE,
  withCredentials: true, // 🔑 this is critical for session-based login
});

export const getInvoices = () => axiosInstance.get('/api/invoices');

export const getInvoiceById = (id) => axiosInstance.get(`/api/invoices/${id}`);

export const addInvoice = (data) => axiosInstance.post('/api/invoices', data);

export const updateInvoice = (id, data) => axiosInstance.put(`/api/invoices/${id}`, data);

export const deleteInvoice = (id) => axiosInstance.delete(`/api/invoices/${id}`);
