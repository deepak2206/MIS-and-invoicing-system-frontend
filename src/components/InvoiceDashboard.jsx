import { useEffect, useState } from 'react';
import { getAllInvoices, updateInvoiceEmail, deleteInvoice } from '../services/invoiceService';
import { toast } from 'react-toastify';

const InvoiceDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');

  const fetchInvoices = () => {
    getAllInvoices().then((res) => setInvoices(res.data));
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleEmailUpdate = async (id) => {
    const email = prompt('Enter new email:');
    if (email) {
      await updateInvoiceEmail(id, email);
      toast.success('Email updated');
      fetchInvoices();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this invoice?')) {
      await deleteInvoice(id);
      toast.success('Invoice deleted');
      fetchInvoices();
    }
  };

  const filtered = invoices.filter((inv) =>
    [inv.invoiceNo, inv.estimate?.estimateId, inv.chain?.chainName]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3>Manage Invoices</h3>
      <input
        className="form-control mb-3"
        placeholder="Search by invoice no, estimate ID, or chain"
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Estimate ID</th>
            <th>Chain</th>
            <th>Service</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.invoiceNo}</td>
              <td>{inv.estimate?.estimateId}</td>
              <td>{inv.chain?.chainName}</td>
              <td>{inv.serviceDetails}</td>
              <td>{inv.qty}</td>
              <td>{inv.amountPayable}</td>
              <td>{inv.emailId}</td>
              <td>
                <button className="btn btn-sm btn-info me-2" onClick={() => handleEmailUpdate(inv.id)}>
                  Edit Email
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(inv.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDashboard;
