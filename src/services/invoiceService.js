import axios from './axios';
const BASE = import.meta.env.VITE_API_BASE_URL + '/api/invoices';

export const generateInvoice = (estimateId, emailId) =>
  axios.post(`${BASE}/generate/${estimateId}`, { emailId }, { withCredentials: true });

export const getAllInvoices = () =>
  axios.get(BASE, { withCredentials: true });

export const updateInvoiceEmail = (id, emailId) =>
  axios.put(`${BASE}/${id}/update-email`, { emailId }, { withCredentials: true });

export const deleteInvoice = (id) =>
  axios.delete(`${BASE}/${id}`, { withCredentials: true });
