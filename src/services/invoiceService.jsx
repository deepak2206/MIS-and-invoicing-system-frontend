import axios from 'axios';
const BASE = import.meta.env.VITE_API_BASE_URL;

export const getInvoices = () =>
  axios.get(`${BASE}/api/invoices`, { withCredentials: true });

export const getInvoiceById = (id) =>
  axios.get(`${BASE}/api/invoices/${id}`, { withCredentials: true });

export const addInvoice = (data) =>
  axios.post(`${BASE}/api/invoices`, data, { withCredentials: true });

export const updateInvoice = (id, data) =>
  axios.put(`${BASE}/api/invoices/${id}`, data, { withCredentials: true });

export const deleteInvoice = (id) =>
  axios.delete(`${BASE}/api/invoices/${id}`, { withCredentials: true });
